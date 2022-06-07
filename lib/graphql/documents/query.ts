import { gql } from 'graphql-request';
import { projectsListGQLFrag } from './fragments';

export const getAllTagsGQL = gql`
	query getAllTags {
		allTag {
			id
			tagName
		}
	}
`;

export const getFilteredTagsGQL = gql`
	query getFilteredTags($inputString: String!) {
		filterTag(tagName: $inputString) {
			id
			tagName
		}
	}
`;

export const getAllProjectsGQL = gql`
	${projectsListGQLFrag}
	query getAllProjects {
		allProject {
			...projectsListGQLFrag
		}
	}
`;

export const getFilteredProjectsGQL = gql`
	${projectsListGQLFrag}
	query filterProjects($searchTerm: String!) {
		filterProject(textToSearch: $searchTerm) {
			...projectsListGQLFrag
		}
	}
`;

export const getProjectByIdGQL = gql`
	query projectById($id: ID!) {
		projectById(id: $id) {
			logo
			id
			logo
			name
			subtitle
			postedAt
			description
			owner: ownerId {
				id
				username
				avatar
			}
			upvote
			tag {
				tagName
			}
		}
	}
`;

export const getProjectByIdCommentsGQL = gql`
	query projectByIdComments($projectId: ID!) {
		projectById(id: $projectId) {
			comments {
				id
				comment
				date
				owner: ownerId {
					id
					username
					avatar
				}
				replies {
					id
					reply
					date
					owner: ownerId {
						id
						username
						avatar
					}
				}
			}
		}
	}
`;
