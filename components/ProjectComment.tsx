import { useRouter } from 'next/router';
import type { FormEventHandler } from 'react';
import { useMutation } from 'react-query';
import { useAuthUser } from '../contexts/AuthUser';
import useLocalStorage from '../hooks/useLocalStorage';
import { projectCommentDraftStorageKey } from '../lib/constants';
import { createNewCommentReq } from '../lib/graphql/requests/mutation';
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
		if (!isUserLoggedIn) router.push('/auth/login');
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
						<textarea
							name='comment'
							id='comment'
							className='w-full max-h-36 md:max-h-96 h-16 resize-none p-2 border-b border-primary'
							placeholder="What's on your mind?"
							required={isUserLoggedIn}
							minLength={10}
							value={comment}
							onChange={e => {
								e.target.style.height = '4rem';
								e.target.style.height = e.target.scrollHeight + 'px';
								setComment(e.target.value);
							}}
						></textarea>

						<CTAButton
							text={isUserLoggedIn ? 'Comment' : 'Login to Comment'}
							type='submit'
							isLoading={isLoading}
							className='self-end w-max capitalize rounded text-base px-4'
						/>
					</form>
				</div>
			</div>
		</div>
	);
}
