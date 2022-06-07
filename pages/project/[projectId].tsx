import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { FaCaretUp } from 'react-icons/fa';
import { useQueries } from 'react-query';
import Comment from '../../components/Comment';
import CTAButton from '../../components/CTAButton';
import LoadingOrComponent from '../../components/LoadingOrComponent';
import ProjectComment from '../../components/ProjectComment';
import ProjectLogo from '../../components/Projectlogo';
import Tag from '../../components/Tag';
import useLoadingToast from '../../hooks/useLoadingToast';
import {
	getProjectById,
	getProjectByIdComments,
} from '../../lib/graphql/requests/query';

const Project: NextPage = () => {
	const router = useRouter();
	const { projectId } = router.query;

	const projectQueryKey = ['getProjectById', projectId];
	const projectCommentsQueryKey = ['getProjectByIdComments', projectId];
	const [
		{ data: project, isLoading: isProjectLoading },
		{ data: comments, isLoading: isCommentsLoading },
	] = useQueries([
		{
			queryKey: projectQueryKey,
			queryFn: () => getProjectById(projectId?.toString() ?? ''),
			enabled: Boolean(projectId && typeof projectId === 'string'),
			onError(err: unknown) {
				console.log(err);
				toast.error('Could not fetch the requested project.');
			},
		},
		{
			queryKey: projectCommentsQueryKey,
			queryFn: () => getProjectByIdComments(projectId?.toString() ?? ''),
			enabled: Boolean(projectId && typeof projectId === 'string'),
		},
	]);
	useLoadingToast({
		isLoading: isProjectLoading,
		toastMsg: 'Fetching Project...',
	});

	const {
		id,
		logo,
		name,
		subtitle,
		description,
		tag: tags,
		postedAt,
		upvote,
		owner: projectOwner,
	} = project || {};

	if (!isProjectLoading && !project)
		return <h3>This project does not exist</h3>;

	return (
		<LoadingOrComponent isLoading={isProjectLoading}>
			<div className='flex flex-col items-center mx-3'>
				<div className='w-full max-w-4xl'>
					<ProjectLogo
						src={`https://ph-files.imgix.net/405a0dc6-7d86-4566-941f-6d12cfe1bc73.jpeg?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=60&h=60&fit=crop&bg=0fff`}
					/>

					<div className='flex flex-wrap gap-4 items-baseline'>
						<h1 className='text-xl font-bold mt-2'>{name}</h1>
						<p className='text-slate-500'>by @{projectOwner?.username}</p>
					</div>

					<div className='sm:flex items-start justify-between gap-5 sm:mb-6 sm:my-2'>
						<p className='text-2xl text-gray-700'>{subtitle}</p>

						<div className='flex gap-3 my-7 sm:my-0'>
							<button className='border border-gray-400 hover:border-primary p-4 px-5 rounded'>
								<Link href='/'>
									<a>Visit</a>
								</Link>
							</button>

							<CTAButton className='flex justify-center items-center gap-2 rounded lg:px-8 lg:py-3'>
								<FaCaretUp className='text-3xl md:text-4xl' />
								<span>Upvote</span>
								<span>{upvote}</span>
							</CTAButton>
						</div>
					</div>

					<div className='flex flex-wrap gap-2'>
						{tags?.map(({ tagName }) => (
							<Tag tagName={tagName} key={tagName} />
						))}
					</div>

					<hr className='my-5 border-gray-300' />

					<p>{description}</p>

					<ProjectComment projectId={id!} />

					<LoadingOrComponent isLoading={isCommentsLoading}>
						<div className='flex flex-col gap-8 mt-7'>
							<h3 className='text-2xl font-bold'>
								{comments?.length ? 'Comments' : 'No Comments'}
							</h3>
							{comments?.map(comment => (
								<Comment
									key={comment.id}
									{...comment}
									projectOwnerId={projectOwner?.id || ''}
								/>
							))}
						</div>
					</LoadingOrComponent>
				</div>
			</div>
		</LoadingOrComponent>
	);
};

export default Project;
