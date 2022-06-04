import type {
	CreateNewProjectMutation,
	CreateNewProjectMutationVariables,
} from '../../../types/graphql';
import graphqlClient from '../../graphqlClient';
import { createNewProjectGQL } from '../documents/mutation';

export async function createNewProjectReq(
	data: CreateNewProjectMutationVariables,
) {
	const { createProject } = await graphqlClient.request<
		CreateNewProjectMutation,
		CreateNewProjectMutationVariables
	>(createNewProjectGQL, data);

	return { ...createProject, projectId: createProject?.projectInstance?.id };
}
