import { useRouter } from 'next/router';
import type { FormEventHandler } from 'react';
import { useMutation } from 'react-query';
import { useAuthUser } from '../contexts/AuthUser';
import useLocalStorage from '../hooks/useLocalStorage';
import { projectCommentDraftStorageKey } from '../lib/constants';
import { createNewCommentReq } from '../lib/graphql/requests/mutation';
import CommentBox from './CommentBox';
import CTAButton from './CTAButton';
import UserAvatar from './UserAvatar';

export interface ProjectCommentProps {
	projectId: string;
}

export default function ProjectComment({ projectId }: ProjectCommentProps) {
	const { isLoggedIn: isUserLoggedIn, user } = useAuthUser();
	const router = useRouter();

	const [comment, setComment] = useLocalStorage<string>(
		`${projectCommentDraftStorageKey}-${projectId}`,
		'',
	);

	const { mutate, isLoading } = useMutation(createNewCommentReq, {
		onSuccess(_data) {
			setComment('');
		},
	});

	const onCommentSubmit: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault();
		if (!isUserLoggedIn)
			router.push({
				pathname: '/auth/login',
				query: { from: `/project/${projectId}` },
			});
		else mutate({ comment, projectId });
	};

	return (
		<div className='mt-5' id='project-comment'>
			<div className='border-y-2 border-gray-400'>
				<div className='my-2 flex gap-2'>
					<UserAvatar avatar={user.avatar} username={user.username} />

					<form
						className='flex flex-col justify-between gap-2 w-full'
						onSubmit={onCommentSubmit}
					>
						<CommentBox
							value={comment}
							onChange={e => setComment(e.target.value)}
							required={isUserLoggedIn}
						/>

						<CTAButton
							text={isUserLoggedIn ? 'Comment' : 'Login to Comment'}
							type='submit'
							isLoading={isLoading}
							className='self-end w-max capitalize rounded text-base px-4'
							style={{ fontSize: '1rem', lineHeight: '1.5rem' }}
						/>
					</form>
				</div>
			</div>
		</div>
	);
}
