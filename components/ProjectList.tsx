import classNames from 'classnames';
import { useRouter } from 'next/router';
import humanizeDate from '../lib/humanizeDate';
import type { GetAllProjectsQuery } from '../types/graphql';
import ProjectCard from './ProjectCard';

export interface ProjectListProps {
	projects: NonNullable<GetAllProjectsQuery['allProject']>;
}

export default function ProjectList({ projects }: ProjectListProps) {
	const router = useRouter();

	let prevDate = '';
	return (
		<ul className='w-full flex flex-col gap-3'>
			{projects.filter(Boolean).map((project, index) => {
				const ProjectItem = (
					<li
						className='w-full'
						key={project?.id}
						onClick={() => router.push(`/project/${project?.id}`)}
					>
						<ProjectCard {...project!} />
					</li>
				);

				const currentDate = humanizeDate(new Date(project?.postedAt));
				if (prevDate === currentDate) return ProjectItem;

				prevDate = currentDate;
				return [
					<h2
						className={classNames('text-xl', { 'mt-8': index !== 0 })}
						key={currentDate}
					>
						{currentDate}
					</h2>,
					<hr key={`${currentDate}-hr`} className='mb-3 border-gray-400' />,
					ProjectItem,
				];
			})}
		</ul>
	);
}
