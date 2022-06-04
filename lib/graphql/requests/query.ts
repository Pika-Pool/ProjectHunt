import type {
	GetAllTagsQuery,
	GetAllTagsQueryVariables,
	GetFilteredTagsQuery,
	GetFilteredTagsQueryVariables,
} from '../../../types/graphql';
import graphqlClient from '../../graphqlClient';
import { getAllTagsGQL, getFilteredTagsGQL } from '../documents/query';

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
