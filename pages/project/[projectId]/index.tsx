import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import {
	FaCaretUp,
	FaEdit,
	// FaTrashAlt
} from 'react-icons/fa';
import { useQueries } from 'react-query';
import Comment from '../../../components/Comment';
import CTAButton from '../../../components/CTAButton';
import LoadingOrComponent from '../../../components/LoadingOrComponent';
import ProjectComment from '../../../components/ProjectComment';
import ProjectLogo from '../../../components/ProjectLogo';
import ScreenShotCarousel from '../../../components/ScreenShotCarousel';
import Tag from '../../../components/Tag';
import UsernameLink from '../../../components/UsernameLink';
import { useAuthUser } from '../../../contexts/AuthUser';
import useLoadingToast from '../../../hooks/useLoadingToast';
import useUpvoteMutation from '../../../hooks/useUpvoteMutation';
import {
	getProjectById,
	getProjectByIdComments,
} from '../../../lib/graphql/requests/query';

const Project: NextPage = () => {
	const { user } = useAuthUser();

	const router = useRouter();
	const { projectId } = router.query;

	const projectQueryKey = ['getProjectById', projectId];
	const projectCommentsQueryKey = ['getProjectByIdComments', projectId];
	const [
		{ data: project, isLoading: isProjectLoading, isFetched: isProjectFetched },
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
	useLoadingToast({
		isLoading: isCommentsLoading,
		toastMsg: 'Fetching the project comments...',
	});

	const {
		id,
		logo,
		name,
		subtitle,
		description,
		tag: tags,
		url,
		upvote,
		votedByMe,
		owner: projectOwner,
		screenshots,
	} = project || {};

	const { onUpvote, isUpvoteLoading } = useUpvoteMutation({
		projectId: projectId?.toString() ?? '',
		projectVotedByMe: votedByMe ?? false,
	});

	// const onProjectDelete = () => {
	// 	const isSure = confirm(
	// 		'Are you sure you want to delete this project? This is irreversible',
	// 	);
	// 	if (!isSure) return;
	// };

	if (!isProjectLoading && !project)
		return <h3>This project does not exist</h3>;

	return (
		<LoadingOrComponent isLoading={isProjectLoading || !isProjectFetched}>
			<div className='flex flex-col items-center mx-3'>
				<div className='w-full max-w-4xl'>
					<div className='flex justify-between items-start'>
						<ProjectLogo src={logo || ''} />

						{user.id?.toString() === projectOwner?.id ? (
							<div className='flex gap-2 justify-between items-baseline'>
								<Link href={`/project/${projectId}/edit`}>
									<a title='edit project'>
										<FaEdit size='2em' className='text-gray-700 md:text-2xl' />
									</a>
								</Link>

								{/* <button title='delete project' onClick={onProjectDelete}>
									<FaTrashAlt size='2em' className='text-red-500 md:text-2xl' />
								</button> */}
							</div>
						) : null}
					</div>

					<div className='flex flex-wrap gap-4 items-baseline'>
						<h1 className='text-xl font-bold mt-2'>{name}</h1>
						<p className='text-slate-500 italic'>
							- by{' '}
							<UsernameLink
								userId={projectOwner?.id || ''}
								username={projectOwner?.username || ''}
							/>
						</p>
					</div>

					<div className='sm:flex items-start justify-between gap-5 sm:mb-6 sm:my-2'>
						<p className='text-2xl text-gray-700'>{subtitle}</p>

						<div className='flex gap-3 my-7 sm:my-0'>
							<button className='border border-gray-400 hover:border-primary p-4 px-5 rounded'>
								<Link href={url!}>
									<a>Visit</a>
								</Link>
							</button>

							<CTAButton
								className='flex justify-center items-center gap-2 rounded lg:px-8 lg:py-3 border-4 border-primary'
								isLoading={isUpvoteLoading}
								iconProps={{ display: 'none' }}
								style={
									votedByMe
										? { backgroundColor: 'transparent', color: 'currentcolor' }
										: {}
								}
								onClick={onUpvote}
							>
								<FaCaretUp
									className='text-3xl md:text-4xl'
									style={{
										color: votedByMe ? 'hsl(var(--color-primary))' : '',
									}}
								/>
								<span>{votedByMe ? 'Upvoted' : 'Upvote'}</span>
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

					{description?.split(/[\n\r]/).map((str, i) => (
						<p key={str + i}>{str}</p>
					))}

					<div className='mt-2'>
						<ScreenShotCarousel
							images={
								screenshots
									?.filter(Boolean)
									.map(({ id, src }) => ({ imageId: id, src: src ?? '' })) ?? []
							}
						/>
					</div>

					<ProjectComment projectId={id!} />

					<LoadingOrComponent isLoading={isCommentsLoading}>
						<div className='flex flex-col gap-8 mt-7'>
							<h3 className='text-2xl font-bold'>
								{comments?.length ? 'Comments' : 'No Comments'}
							</h3>
							{comments?.map(comment => (
								<Comment
									projectId={id ?? ''}
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
