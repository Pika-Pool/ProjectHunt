import { gql } from 'graphql-request';

export const projectsListGQLFrag = gql`
	fragment projectsListGQLFrag on ProjectType {
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
		comments {
			id
		}
	}
`;
