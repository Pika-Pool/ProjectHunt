import type { NextPage } from 'next';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import LoadingOrComponent from '../components/LoadingOrComponent';
import ProjectList from '../components/ProjectList';
import useLoadingToast from '../hooks/useLoadingToast';
import { getAllProjects } from '../lib/graphql/requests/query';
import type { GetAllProjectsQuery } from '../types/graphql';

// a project object
export type TProject = NonNullable<
	NonNullable<GetAllProjectsQuery['allProject']>[number]
>;

const HomePage: NextPage = () => {
	const { data: projects, isLoading } = useQuery(
		'allProjects',
		getAllProjects,
		{
			onError(err) {
				toast.error("Couldn't Fetch the projects. Try again later");
				console.error(err);
			},
			onSuccess(data) {
				if (!data || data.length === 0) {
					toast.error('Something went wrong. Try again later');
				}
				console.log({ data });
			},
			select(projects): TProject[] {
				if (!projects) return [];

				return (
					projects
						.filter((p): p is TProject => Boolean(p))
						// convert postedAt from string to date
						.map(project => ({
							...project,
							postedAt: new Date(project?.postedAt),
						}))
						// sort by date
						.sort((p1, p2) => (p1.postedAt > p2.postedAt ? -1 : 1))
				);
			},
		},
	);
	useLoadingToast({ isLoading, toastMsg: 'Fetching Projects...' });

	return (
		<div className='flex justify-center'>
			<div className='flex justify-center max-w-6xl mx-2 md:mx-5 w-full'>
				<LoadingOrComponent isLoading={isLoading}>
					<ProjectList projects={projects ?? []} />
				</LoadingOrComponent>
			</div>
		</div>
	);
};

export default HomePage;
