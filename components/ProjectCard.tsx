import humanFormat from 'human-format';
import { FaCaretUp, FaComment } from 'react-icons/fa';
import timeAgo from '../lib/timeAgo';
import type { GetAllProjectsQuery } from '../types/graphql';
import ProjectLogo from './Projectlogo';
import Tag from './Tag';

export type ProjectCardProps = NonNullable<
	NonNullable<GetAllProjectsQuery['allProject']>[number]
>;

export default function ProjectCard({
	tag: tags,
	comments,
	name,
	logo: logoURL,
	postedAt,
	upvote,
	subtitle,
}: ProjectCardProps) {
	return (
		<div className='grid grid-cols-[auto_1fr_auto] justify-between items-center gap-x-4 w-full text-sm sm:text-base rounded hover:cursor-pointer project_card'>
			<ProjectLogo
				src={`https://ph-files.imgix.net/405a0dc6-7d86-4566-941f-6d12cfe1bc73.jpeg?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=60&h=60&fit=crop&bg=0fff`}
			/>

			<div className='flex flex-col justify-between w-full py-1 self-stretch'>
				<div>
					<strong className='hover:underline'>{name}</strong>
					<small className='ml-3'>
						<time>
							{timeAgo.format(new Date(postedAt), 'twitter-minute-now')}
						</time>
					</small>
					<p>{subtitle}</p>
				</div>

				<div className='hidden md:flex items-center gap-2 text-xs'>
					<FaComment />
					{humanFormat(comments.length, { maxDecimals: 2, separator: '' })}

					<div className='ml-3 flex gap-2'>
						{tags.slice(0, 5).map(({ tagName }) => (
							<Tag tagName={tagName} key={tagName} />
						))}
					</div>
				</div>
			</div>

			<div className='m-2 border border-current hover:border-primary rounded flex flex-col justify-around items-center p-2 h-max'>
				<FaCaretUp className='text-lg md:text-3xl' />
				<span className='text-xs sm:text-sm'>
					{humanFormat(upvote, { maxDecimals: 1, separator: '' })}
				</span>
			</div>

			<style jsx>{`
				.project_card:hover {
					background-image: linear-gradient(
						12deg,
						#fff 50%,
						hsla(var(--color-primary) / 0.15)
					);
				}
			`}</style>
		</div>
	);
}
