import { useRouter } from 'next/router';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { useAuthUser } from '../contexts/AuthUser';
import {
	deleteCommentReq,
	editCommentReq,
} from '../lib/graphql/requests/mutation';
import timeAgo from '../lib/timeAgo';
import type { ProjectByIdCommentsQuery } from '../types/graphql';
import CommentBox from './CommentBox';
import CTAButton from './CTAButton';
import Tag from './Tag';
import UserAvatar from './UserAvatar';
import UsernameLink from './UsernameLink';

export type CommentProps = NonNullable<
	ProjectByIdCommentsQuery['projectById']
>['comments'][number] & {
	projectId: string;
	projectOwnerId: string;
};

export default function Comment({
	projectId,
	projectOwnerId,
	owner: commentOwner,
	comment: commentText,
	id: commentId,
	date,
}: CommentProps) {
	const { user } = useAuthUser();
	const [isInEditMode, setIsInEditMode] = useState(false);
	const [comment, setComment] = useState(commentText);

	const router = useRouter();

	const queryClient = useQueryClient();
	const { isLoading, mutate } = useMutation(editCommentReq, {
		onSuccess(data) {
			if (!data || data.error) {
				toast.error('Something went wrong. Could not update the comment.');
			} else {
				toast.success('Updated the comment.');
				queryClient.invalidateQueries(['getProjectByIdComments', projectId]);
				setComment(prev => data.commentInstance?.comment ?? prev);
				setIsInEditMode(false);
			}
		},
	});

	const { isLoading: isDeleteLoading, mutateAsync: deleteCommentAsync } =
		useMutation(deleteCommentReq, {
			onSuccess(data) {
				if (!data || data.error) {
					toast.error('Something went wrong. Could not update the comment.');
				} else {
					toast.success('Updated the comment.');
					queryClient.invalidateQueries(['getProjectByIdComments', projectId]);
					setComment('');
					router.reload();
				}
			},
		});

	const onCommentSubmit: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault();
		if (comment === commentText) {
			setIsInEditMode(false);
			return;
		}

		mutate({ comment, commentId });
	};

	return (
		<div className='text-[0.9rem] flex gap-3'>
			<div className='grid grid-rows-[auto_1fr] gap-2 place-items-center'>
				<UserAvatar
					avatar={commentOwner.avatar ?? undefined}
					username={commentOwner.username}
				/>
				<div
					className='w-1 h-full'
					style={{
						backgroundImage: 'linear-gradient(to bottom, hsl(0 0% 85%), white)',
					}}
				></div>
			</div>

			<div className='w-full'>
				<header className='flex gap-2 items-baseline'>
					<UsernameLink
						userId={commentOwner.id}
						username={commentOwner.username}
						className='font-bold'
					/>

					{commentOwner.id === projectOwnerId ? (
						<Tag tagName='Maker' className='rounded bg-accent text-white' />
					) : null}
					<em className='text-gray-500'>
						{timeAgo.format(new Date(date), 'twitter-minute-now')}
					</em>
				</header>

				{!isInEditMode ? (
					comment.split(/[\n\r]/).map((str, i) => (
						<p key={str + i} className='text-gray-600 mt-1 w-full'>
							{str}
						</p>
					))
				) : (
					<form onSubmit={onCommentSubmit} className='flex flex-col gap-2'>
						<CommentBox
							value={comment}
							onChange={e => setComment(e.target.value)}
							id={`comment-${commentId}`}
						/>

						<div className='flex gap-2 self-end'>
							<CTAButton
								text='Cancel'
								className='bg-gray-300 text-gray-900 rounded w-max'
								onClick={() => !isLoading && setIsInEditMode(false)}
								style={{ fontSize: '0.875rem', padding: '0.25rem 1rem' }}
							/>
							<CTAButton
								text='Update'
								type='submit'
								isLoading={isLoading}
								disabled={comment === commentText}
								className='self-end w-max capitalize rounded disabled:opacity-70 disabled:cursor-not-allowed'
								style={{ fontSize: '0.875rem', padding: '0.25rem 1rem' }}
							/>
						</div>
					</form>
				)}

				{user.id === commentOwner.id && !isInEditMode ? (
					<div className='text-sm font-bold opacity-80 flex gap-3 mt-2'>
						<button
							onClick={() => {
								console.log('edit');
								setIsInEditMode(true);
							}}
							disabled={isLoading || isDeleteLoading}
						>
							Edit
						</button>

						<button
							className='text-red-500'
							onClick={async () => {
								const toastId = toast.loading('Deleting your comment');
								await deleteCommentAsync({ commentId });
								toast.remove(toastId);
							}}
							disabled={isLoading || isDeleteLoading}
						>
							Delete
						</button>
					</div>
				) : null}
			</div>
		</div>
	);
}
