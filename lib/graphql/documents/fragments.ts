import { gql } from 'graphql-request';

export const projectsListGQLFrag = gql`
	fragment projectsListGQLFrag on ProjectType {
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
`;
