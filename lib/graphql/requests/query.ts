import type {
	FilterProjectsQuery,
	FilterProjectsQueryVariables,
	GetAllProjectsQuery,
	GetAllProjectsQueryVariables,
	GetAllTagsQuery,
	GetAllTagsQueryVariables,
	GetFilteredTagsQuery,
	GetFilteredTagsQueryVariables,
	ProjectByIdCommentsQuery,
	ProjectByIdCommentsQueryVariables,
	ProjectByIdQuery,
	ProjectByIdQueryVariables,
} from '../../../types/graphql';
import graphqlClient from '../../graphqlClient';
import {
	getAllProjectsGQL,
	getAllTagsGQL,
	getFilteredProjectsGQL,
	getFilteredTagsGQL,
	getProjectByIdCommentsGQL,
	getProjectByIdGQL,
} from '../documents/query';

export async function getAllTags() {
	const { allTag } = await graphqlClient.request<
		GetAllTagsQuery,
		GetAllTagsQueryVariables
	>(getAllTagsGQL);

	return allTag;
}

export async function getFilteredTags(inputString: string) {
	const { filterTag } = await graphqlClient.request<
		GetFilteredTagsQuery,
		GetFilteredTagsQueryVariables
	>(getFilteredTagsGQL, { inputString });

	return filterTag;
}

export async function getAllProjects() {
	const { allProject } = await graphqlClient.request<
		GetAllProjectsQuery,
		GetAllProjectsQueryVariables
	>(getAllProjectsGQL);

	return allProject;
}

export async function getFilteredProjects(searchTerm: string) {
	const { filterProject } = await graphqlClient.request<
		FilterProjectsQuery,
		FilterProjectsQueryVariables
	>(getFilteredProjectsGQL, { searchTerm });

	return filterProject;
}

export async function getProjectById(id: string | number) {
	const { projectById } = await graphqlClient.request<
		ProjectByIdQuery,
		ProjectByIdQueryVariables
	>(getProjectByIdGQL, {
		id: id.toString(),
	});

	return projectById;
}

export async function getProjectByIdComments(id: string | number) {
	const { projectById } = await graphqlClient.request<
		ProjectByIdCommentsQuery,
		ProjectByIdCommentsQueryVariables
	>(getProjectByIdCommentsGQL, {
		projectId: id.toString(),
	});

	return projectById?.comments ?? [];
}
