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
