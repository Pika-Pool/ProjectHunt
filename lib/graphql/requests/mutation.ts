import type {
	CreateNewCommentMutation,
	CreateNewCommentMutationVariables,
	CreateNewProjectMutation,
	CreateNewProjectMutationVariables,
} from '../../../types/graphql';
import graphqlClient from '../../graphqlClient';
import {
	createNewCommentGQL,
	createNewProjectGQL,
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
