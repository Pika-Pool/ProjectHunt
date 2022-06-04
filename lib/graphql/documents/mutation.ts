import { gql } from 'graphql-request';

export const createNewProjectGQL = gql`
	mutation createNewProject(
		$description: String!
		$name: String!
		$subtitle: String!
		$tags: [String!]!
	) {
		createProject(
			description: $description
			name: $name
			subtitle: $subtitle
			tags: $tags
		) {
			projectInstance {
				id
			}
			response
			message
		}
	}
`;
