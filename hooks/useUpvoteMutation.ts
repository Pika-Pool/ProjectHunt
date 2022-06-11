import router from 'next/router';
import type { MouseEventHandler } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient, useMutation } from 'react-query';
import { useAuthUser } from '../contexts/AuthUser';
import { voteOnProject } from '../lib/graphql/requests/mutation';
import useLoadingToast from './useLoadingToast';

interface useUpvoteMutationParams {
	projectId: string;
	projectVotedByMe?: boolean;
}
export default function useUpvoteMutation({
	projectId,
	projectVotedByMe,
}: useUpvoteMutationParams) {
	const { isLoggedIn: isUserLoggedIn } = useAuthUser();

	const queryClient = useQueryClient();
	const {
		mutate,
		isLoading: isUpvoteLoading,
		...mutationReturns
	} = useMutation(voteOnProject, {
		onSuccess(data) {
			if (!data || data.error) {
				toast.error('Something went wrong. Could not upvote the project');
				console.error(data);
				return;
			}
			queryClient.invalidateQueries(['getProjectById', projectId]);
			queryClient.invalidateQueries('allProjects');
			queryClient.invalidateQueries([
				'getProjectsByUser',
				data.projectInstance?.owner.id,
			]);
		},
		onError(err) {
			toast.error('Something went wrong. Could not upvote the project');
			console.error(err);
		},
	});

	useLoadingToast({
		isLoading: isUpvoteLoading,
		toastMsg: 'Changing your vote on the project...',
	});

	const onUpvote: MouseEventHandler<HTMLButtonElement> = e => {
		e.stopPropagation();
		if (!isUserLoggedIn) {
			router.push({
				pathname: '/auth/login',
				query: { from: `/project/${projectId}` },
			});
			return;
		}

		mutate({
			projectId: projectId?.toString() ?? '',
			shouldRemoveVote: !!projectVotedByMe,
		});
	};

	return {
		onUpvote,
		upvoteMutate: mutate,
		isUpvoteLoading,
		...mutationReturns,
	};
}
