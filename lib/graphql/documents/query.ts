import { gql } from 'graphql-request';

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
	query getAllProjects {
		allProject {
			id
			logo
			name
			subtitle
			postedAt
			upvote
			tag {
				tagName
			}
			comments {
				id
			}
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
