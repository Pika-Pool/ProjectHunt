import timeAgo from '../lib/timeAgo';
import type { ProjectByIdCommentsQuery } from '../types/graphql';
import Tag from './Tag';
import UserAvatar from './UserAvatar';

export type CommentProps = NonNullable<
	ProjectByIdCommentsQuery['projectById']
>['comments'][number] & {
	projectOwnerId: string;
};

export default function Comment({
	projectOwnerId,
	owner: commentOwner,
	comment: commentText,
	date,
}: CommentProps) {
	return (
		<div className='text-[0.9rem] flex gap-3'>
			<div className='grid grid-rows-[auto_1fr] gap-2 place-items-center'>
				<UserAvatar
					avatar={commentOwner.avatar}
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
					<strong className='text-gray-800'>@{commentOwner.username}</strong>
					{commentOwner.id === projectOwnerId ? (
						<Tag tagName='Maker' className='rounded bg-accent text-white' />
					) : null}
					<em className='text-gray-500'>
						{timeAgo.format(new Date(date), 'twitter-minute-now')}
					</em>
				</header>

				<p className='text-gray-600 mt-1'>{commentText}</p>
			</div>
		</div>
	);
}
