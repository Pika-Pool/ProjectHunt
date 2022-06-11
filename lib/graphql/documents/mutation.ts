import { gql } from 'graphql-request';

export const createNewProjectGQL = gql`
	mutation createNewProject(
		$description: String!
		$name: String!
		$subtitle: String!
		$tags: [String!]!
		$logo: [Upload!]!
	) {
		createProject(
			description: $description
			name: $name
			subtitle: $subtitle
			tags: $tags
			logos: $logo
		) {
			projectInstance {
				id
			}
			error
			message
		}
	}
`;

export const editProjectGQL = gql`
	mutation editProject(
		$deleteScreenshot: [String!]
		$description: String
		$id: ID!
		$logo: [Upload!]
		$name: String
		$screenshots: [Upload!]
		$subtitle: String
		$tags: [String]!
	) {
		updateProject(
			deleteScreenshot: $deleteScreenshot
			description: $description
			id: $id
			logos: $logo
			name: $name
			screenshots: $screenshots
			subtitle: $subtitle
			tags: $tags
		) {
			projectInstance {
				id
			}
			error
			message
		}
	}
`;

export const createNewCommentGQL = gql`
	mutation createNewComment($projectId: ID!, $comment: String!) {
		createComment(comment: $comment, id: $projectId) {
			error
			message
		}
	}
`;

export const editCommentGQL = gql`
	mutation editComment($comment: String!, $commentId: ID!) {
		updateComment(comment: $comment, id: $commentId) {
			message
			error
			commentInstance {
				comment
			}
		}
	}
`;

export const updateProfileGQL = gql`
	mutation updateProfile(
		$avatars: [Upload]
		$email: String!
		$username: String!
	) {
		updateProfile(avatars: $avatars, email: $email, username: $username) {
			error
			message
			profile {
				id
				username
				email
				avatar
			}
		}
	}
`;

export const deleteCommentGQL = gql`
	mutation deleteComment($commentId: ID!) {
		deleteComment(id: $commentId) {
			error
			message
		}
	}
`;

export const voteOnProjectGQL = gql`
	mutation voteOnProject($projectId: ID!, $shouldRemoveVote: Boolean) {
		upvoteProject(id: $projectId, shouldRemoveVote: $shouldRemoveVote) {
			projectInstance {
				upvote: voteCount
				id
				votedByMe
				owner: ownerId {
					id
				}
			}
			error
			message
		}
	}
`;
