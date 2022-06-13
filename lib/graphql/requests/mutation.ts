import type {
	CreateNewCommentMutation,
	CreateNewCommentMutationVariables,
	CreateNewProjectMutation,
	CreateNewProjectMutationVariables,
	DeleteCommentMutation,
	DeleteCommentMutationVariables,
	EditCommentMutation,
	EditCommentMutationVariables,
	EditProjectMutation,
	EditProjectMutationVariables,
	UpdateProfileMutation,
	UpdateProfileMutationVariables,
	VoteOnProjectMutation,
	VoteOnProjectMutationVariables,
} from '../../../types/graphql';
import graphqlClient from '../../graphqlClient';
import {
	createNewCommentGQL,
	createNewProjectGQL,
	deleteCommentGQL,
	editCommentGQL,
	editProjectGQL,
	updateProfileGQL,
	voteOnProjectGQL,
} from '../documents/mutation';

export async function createNewProjectReq(
	data: CreateNewProjectMutationVariables,
) {
	const { createProject } = await graphqlClient.request<
		CreateNewProjectMutation,
		CreateNewProjectMutationVariables
	>(createNewProjectGQL, data);

	return { ...createProject, projectId: createProject?.projectInstance?.id };
}

export async function editProjectReq(data: EditProjectMutationVariables) {
	const { updateProject } = await graphqlClient.request<
		EditProjectMutation,
		EditProjectMutationVariables
	>(editProjectGQL, data);

	return { ...updateProject, projectId: updateProject?.projectInstance?.id };
}

export async function createNewCommentReq({
	projectId,
	comment,
}: CreateNewCommentMutationVariables) {
	const { createComment } = await graphqlClient.request<
		CreateNewCommentMutation,
		CreateNewCommentMutationVariables
	>(createNewCommentGQL, {
		projectId,
		comment,
	});

	return createComment;
}

export async function editCommentReq({
	comment,
	commentId,
}: EditCommentMutationVariables) {
	const { updateComment } = await graphqlClient.request<
		EditCommentMutation,
		EditCommentMutationVariables
	>(editCommentGQL, {
		comment,
		commentId,
	});

	return updateComment;
}

export async function editProfileReq({
	email,
	username,
	avatars,
}: UpdateProfileMutationVariables) {
	const { updateProfile } = await graphqlClient.request<
		UpdateProfileMutation,
		UpdateProfileMutationVariables
	>(updateProfileGQL, { email, avatars, username });

	return updateProfile;
}

export async function deleteCommentReq({
	commentId,
}: DeleteCommentMutationVariables) {
	const { deleteComment } = await graphqlClient.request<
		DeleteCommentMutation,
		DeleteCommentMutationVariables
	>(deleteCommentGQL, { commentId });

	return deleteComment;
}

export async function voteOnProject({
	projectId,
	shouldRemoveVote,
}: VoteOnProjectMutationVariables) {
	const { upvoteProject } = await graphqlClient.request<
		VoteOnProjectMutation,
		VoteOnProjectMutationVariables
	>(voteOnProjectGQL, { projectId, shouldRemoveVote });

	return upvoteProject;
}
