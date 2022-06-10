import { gql } from 'graphql-request';
import { projectsListGQLFrag } from './fragments';

export const getUserProfileGQL = gql`
	query getUserProfile($userId: Int) {
		getProfile(id: $userId) {
			id
			username
			avatar: avatarUrl
			email
		}
	}
`;

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
			id
			logo: logoUrl
			name
			subtitle
			postedAt
			url
			votedByMe
			upvote: voteCount
			tag {
				tagName
			}

			description
			screenshots {
				id
				src: screenshotUrl
			}
			owner: ownerId {
				id
				username
				avatar: avatarUrl
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
				date: lastModify
				owner: ownerId {
					id
					username
					avatar: avatarUrl
				}
				replies {
					id
					reply
					date: lastModify
					owner: ownerId {
						id
						username
						avatar: avatarUrl
					}
				}
			}
		}
	}
`;

export const getProjectsByUserGQL = gql`
	${projectsListGQLFrag}
	query getProjectByUser($userId: ID) {
		projectByUserid(id: $userId) {
			...projectsListGQLFrag
		}
	}
`;
