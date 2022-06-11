export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/**
	 * The `DateTime` scalar type represents a DateTime
	 * value as specified by
	 * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
	 */
	DateTime: any;
	/**
	 * Create scalar that ignores normal serialization/deserialization, since
	 * that will be handled by the multipart request spec
	 */
	Upload: any;
};

export type CommentCreateMutation = {
	__typename?: 'CommentCreateMutation';
	commentInstance?: Maybe<CommentType>;
	error?: Maybe<Scalars['Boolean']>;
	message?: Maybe<Scalars['String']>;
};

export type CommentDeleteMutation = {
	__typename?: 'CommentDeleteMutation';
	error?: Maybe<Scalars['Boolean']>;
	message?: Maybe<Scalars['String']>;
};

export type CommentType = {
	__typename?: 'CommentType';
	comment: Scalars['String'];
	id: Scalars['ID'];
	lastModify: Scalars['DateTime'];
	ownerId: ProfileType;
	projectId: ProjectType;
	replies: Array<ReplyType>;
};

export type CommentUpdateMutation = {
	__typename?: 'CommentUpdateMutation';
	commentInstance?: Maybe<CommentType>;
	error?: Maybe<Scalars['Boolean']>;
	message?: Maybe<Scalars['String']>;
};

export type Mutation = {
	__typename?: 'Mutation';
	createComment?: Maybe<CommentCreateMutation>;
	createProject?: Maybe<ProjectCreateMutation>;
	createReply?: Maybe<ReplyCreateMutation>;
	deleteComment?: Maybe<CommentDeleteMutation>;
	deleteProject?: Maybe<ProjectDeleteMutation>;
	deleteReply?: Maybe<ReplyDeleteMutation>;
	updateComment?: Maybe<CommentUpdateMutation>;
	updateProfile?: Maybe<UpdateProfile>;
	updateProject?: Maybe<ProjectUpdateMutation>;
	updateReply?: Maybe<ReplyUpdateMutation>;
	upvoteProject?: Maybe<UpvoteProject>;
};

export type MutationCreateCommentArgs = {
	comment: Scalars['String'];
	id?: InputMaybe<Scalars['ID']>;
};

export type MutationCreateProjectArgs = {
	description: Scalars['String'];
	logos?: InputMaybe<Array<InputMaybe<Scalars['Upload']>>>;
	name: Scalars['String'];
	screenshots?: InputMaybe<Array<InputMaybe<Scalars['Upload']>>>;
	subtitle: Scalars['String'];
	tags: Array<InputMaybe<Scalars['String']>>;
};

export type MutationCreateReplyArgs = {
	id?: InputMaybe<Scalars['ID']>;
	reply: Scalars['String'];
};

export type MutationDeleteCommentArgs = {
	id?: InputMaybe<Scalars['ID']>;
};

export type MutationDeleteProjectArgs = {
	id?: InputMaybe<Scalars['ID']>;
};

export type MutationDeleteReplyArgs = {
	id?: InputMaybe<Scalars['ID']>;
};

export type MutationUpdateCommentArgs = {
	comment: Scalars['String'];
	id?: InputMaybe<Scalars['ID']>;
};

export type MutationUpdateProfileArgs = {
	avatars?: InputMaybe<Array<InputMaybe<Scalars['Upload']>>>;
	email: Scalars['String'];
	username: Scalars['String'];
};

export type MutationUpdateProjectArgs = {
	deleteScreenshot?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
	description?: InputMaybe<Scalars['String']>;
	id: Scalars['ID'];
	logos?: InputMaybe<Array<InputMaybe<Scalars['Upload']>>>;
	name?: InputMaybe<Scalars['String']>;
	screenshots?: InputMaybe<Array<InputMaybe<Scalars['Upload']>>>;
	subtitle?: InputMaybe<Scalars['String']>;
	tags: Array<InputMaybe<Scalars['String']>>;
};

export type MutationUpdateReplyArgs = {
	id?: InputMaybe<Scalars['ID']>;
	reply: Scalars['String'];
};

export type MutationUpvoteProjectArgs = {
	id: Scalars['ID'];
	shouldRemoveVote?: InputMaybe<Scalars['Boolean']>;
};

export type ProfileType = {
	__typename?: 'ProfileType';
	avatar: Scalars['String'];
	avatarUrl?: Maybe<Scalars['String']>;
	email: Scalars['String'];
	firstName: Scalars['String'];
	id: Scalars['ID'];
	lastName: Scalars['String'];
	/** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
	username: Scalars['String'];
};

export type ProjectCreateMutation = {
	__typename?: 'ProjectCreateMutation';
	error?: Maybe<Scalars['Boolean']>;
	message?: Maybe<Scalars['String']>;
	projectInstance?: Maybe<ProjectType>;
	screenshotInstances?: Maybe<Array<Maybe<ScreenshotType>>>;
};

export type ProjectDeleteMutation = {
	__typename?: 'ProjectDeleteMutation';
	error?: Maybe<Scalars['Boolean']>;
	message?: Maybe<Scalars['String']>;
};

export type ProjectType = {
	__typename?: 'ProjectType';
	comments: Array<CommentType>;
	description: Scalars['String'];
	id: Scalars['ID'];
	lastModify: Scalars['DateTime'];
	logo: Scalars['String'];
	logoUrl?: Maybe<Scalars['String']>;
	name: Scalars['String'];
	ownerId: ProfileType;
	postedAt: Scalars['DateTime'];
	screenshots: Array<ScreenshotType>;
	subtitle: Scalars['String'];
	tag: Array<TagType>;
	url: Scalars['String'];
	voteCount?: Maybe<Scalars['Int']>;
	votedBy: Array<ProfileType>;
	votedByMe?: Maybe<Scalars['Boolean']>;
};

export type ProjectUpdateMutation = {
	__typename?: 'ProjectUpdateMutation';
	error?: Maybe<Scalars['Boolean']>;
	message?: Maybe<Scalars['String']>;
	projectInstance?: Maybe<ProjectType>;
	screenshotInstances?: Maybe<Array<Maybe<ScreenshotType>>>;
};

export type Query = {
	__typename?: 'Query';
	allProject?: Maybe<Array<Maybe<ProjectType>>>;
	allTag?: Maybe<Array<Maybe<TagType>>>;
	filterProject?: Maybe<Array<Maybe<ProjectType>>>;
	filterTag?: Maybe<Array<Maybe<TagType>>>;
	getProfile?: Maybe<ProfileType>;
	projectById?: Maybe<ProjectType>;
	projectByTagid?: Maybe<TagType>;
	projectByUserid?: Maybe<Array<Maybe<ProjectType>>>;
};

export type QueryFilterProjectArgs = {
	textToSearch: Scalars['String'];
};

export type QueryFilterTagArgs = {
	tagName: Scalars['String'];
};

export type QueryGetProfileArgs = {
	id?: InputMaybe<Scalars['Int']>;
};

export type QueryProjectByIdArgs = {
	id: Scalars['ID'];
};

export type QueryProjectByTagidArgs = {
	id: Scalars['ID'];
};

export type QueryProjectByUseridArgs = {
	id?: InputMaybe<Scalars['ID']>;
};

export type ReplyCreateMutation = {
	__typename?: 'ReplyCreateMutation';
	error?: Maybe<Scalars['Boolean']>;
	message?: Maybe<Scalars['String']>;
	replyInstance?: Maybe<ReplyType>;
};

export type ReplyDeleteMutation = {
	__typename?: 'ReplyDeleteMutation';
	error?: Maybe<Scalars['Boolean']>;
	message?: Maybe<Scalars['String']>;
};

export type ReplyType = {
	__typename?: 'ReplyType';
	commentId: CommentType;
	id: Scalars['ID'];
	lastModify: Scalars['DateTime'];
	ownerId: ProfileType;
	reply: Scalars['String'];
};

export type ReplyUpdateMutation = {
	__typename?: 'ReplyUpdateMutation';
	error?: Maybe<Scalars['Boolean']>;
	message?: Maybe<Scalars['String']>;
	replyInstance?: Maybe<ReplyType>;
};

export type ScreenshotType = {
	__typename?: 'ScreenshotType';
	id: Scalars['ID'];
	image: Scalars['String'];
	projectId: ProjectType;
	screenshotUrl?: Maybe<Scalars['String']>;
};

export type TagType = {
	__typename?: 'TagType';
	id: Scalars['ID'];
	projects: Array<ProjectType>;
	tagName: Scalars['String'];
};

export type UpdateProfile = {
	__typename?: 'UpdateProfile';
	error?: Maybe<Scalars['Boolean']>;
	message?: Maybe<Scalars['String']>;
	profile?: Maybe<ProfileType>;
};

export type UpvoteProject = {
	__typename?: 'UpvoteProject';
	error?: Maybe<Scalars['Boolean']>;
	message?: Maybe<Scalars['String']>;
	projectInstance?: Maybe<ProjectType>;
	votedByMe?: Maybe<Scalars['Boolean']>;
};

export type ProjectsListGqlFragFragment = {
	__typename?: 'ProjectType';
	id: string;
	name: string;
	subtitle: string;
	postedAt: any;
	url: string;
	votedByMe?: boolean | null;
	logo?: string | null;
	upvote?: number | null;
	tag: Array<{ __typename?: 'TagType'; tagName: string }>;
	comments: Array<{ __typename?: 'CommentType'; id: string }>;
};

export type CreateNewProjectMutationVariables = Exact<{
	description: Scalars['String'];
	name: Scalars['String'];
	subtitle: Scalars['String'];
	tags: Array<Scalars['String']> | Scalars['String'];
	logo: Array<Scalars['Upload']> | Scalars['Upload'];
}>;

export type CreateNewProjectMutation = {
	__typename?: 'Mutation';
	createProject?: {
		__typename?: 'ProjectCreateMutation';
		error?: boolean | null;
		message?: string | null;
		projectInstance?: { __typename?: 'ProjectType'; id: string } | null;
	} | null;
};

export type EditProjectMutationVariables = Exact<{
	deleteScreenshot?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
	description?: InputMaybe<Scalars['String']>;
	id: Scalars['ID'];
	logo?: InputMaybe<Array<Scalars['Upload']> | Scalars['Upload']>;
	name?: InputMaybe<Scalars['String']>;
	screenshots?: InputMaybe<Array<Scalars['Upload']> | Scalars['Upload']>;
	subtitle?: InputMaybe<Scalars['String']>;
	tags: Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>;
}>;

export type EditProjectMutation = {
	__typename?: 'Mutation';
	updateProject?: {
		__typename?: 'ProjectUpdateMutation';
		error?: boolean | null;
		message?: string | null;
		projectInstance?: { __typename?: 'ProjectType'; id: string } | null;
	} | null;
};

export type CreateNewCommentMutationVariables = Exact<{
	projectId: Scalars['ID'];
	comment: Scalars['String'];
}>;

export type CreateNewCommentMutation = {
	__typename?: 'Mutation';
	createComment?: {
		__typename?: 'CommentCreateMutation';
		error?: boolean | null;
		message?: string | null;
	} | null;
};

export type EditCommentMutationVariables = Exact<{
	comment: Scalars['String'];
	commentId: Scalars['ID'];
}>;

export type EditCommentMutation = {
	__typename?: 'Mutation';
	updateComment?: {
		__typename?: 'CommentUpdateMutation';
		message?: string | null;
		error?: boolean | null;
		commentInstance?: { __typename?: 'CommentType'; comment: string } | null;
	} | null;
};

export type UpdateProfileMutationVariables = Exact<{
	avatars?: InputMaybe<
		Array<InputMaybe<Scalars['Upload']>> | InputMaybe<Scalars['Upload']>
	>;
	email: Scalars['String'];
	username: Scalars['String'];
}>;

export type UpdateProfileMutation = {
	__typename?: 'Mutation';
	updateProfile?: {
		__typename?: 'UpdateProfile';
		error?: boolean | null;
		message?: string | null;
		profile?: {
			__typename?: 'ProfileType';
			id: string;
			username: string;
			email: string;
			avatar: string;
		} | null;
	} | null;
};

export type DeleteCommentMutationVariables = Exact<{
	commentId: Scalars['ID'];
}>;

export type DeleteCommentMutation = {
	__typename?: 'Mutation';
	deleteComment?: {
		__typename?: 'CommentDeleteMutation';
		error?: boolean | null;
		message?: string | null;
	} | null;
};

export type VoteOnProjectMutationVariables = Exact<{
	projectId: Scalars['ID'];
	shouldRemoveVote?: InputMaybe<Scalars['Boolean']>;
}>;

export type VoteOnProjectMutation = {
	__typename?: 'Mutation';
	upvoteProject?: {
		__typename?: 'UpvoteProject';
		error?: boolean | null;
		message?: string | null;
		projectInstance?: {
			__typename?: 'ProjectType';
			id: string;
			votedByMe?: boolean | null;
			upvote?: number | null;
			owner: { __typename?: 'ProfileType'; id: string };
		} | null;
	} | null;
};

export type GetUserProfileQueryVariables = Exact<{
	userId?: InputMaybe<Scalars['Int']>;
}>;

export type GetUserProfileQuery = {
	__typename?: 'Query';
	getProfile?: {
		__typename?: 'ProfileType';
		id: string;
		username: string;
		email: string;
		avatar?: string | null;
	} | null;
};

export type GetAllTagsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllTagsQuery = {
	__typename?: 'Query';
	allTag?: Array<{
		__typename?: 'TagType';
		id: string;
		tagName: string;
	} | null> | null;
};

export type GetFilteredTagsQueryVariables = Exact<{
	inputString: Scalars['String'];
}>;

export type GetFilteredTagsQuery = {
	__typename?: 'Query';
	filterTag?: Array<{
		__typename?: 'TagType';
		id: string;
		tagName: string;
	} | null> | null;
};

export type GetAllProjectsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllProjectsQuery = {
	__typename?: 'Query';
	allProject?: Array<{
		__typename?: 'ProjectType';
		id: string;
		name: string;
		subtitle: string;
		postedAt: any;
		url: string;
		votedByMe?: boolean | null;
		logo?: string | null;
		upvote?: number | null;
		tag: Array<{ __typename?: 'TagType'; tagName: string }>;
		comments: Array<{ __typename?: 'CommentType'; id: string }>;
	} | null> | null;
};

export type FilterProjectsQueryVariables = Exact<{
	searchTerm: Scalars['String'];
}>;

export type FilterProjectsQuery = {
	__typename?: 'Query';
	filterProject?: Array<{
		__typename?: 'ProjectType';
		id: string;
		name: string;
		subtitle: string;
		postedAt: any;
		url: string;
		votedByMe?: boolean | null;
		logo?: string | null;
		upvote?: number | null;
		tag: Array<{ __typename?: 'TagType'; tagName: string }>;
		comments: Array<{ __typename?: 'CommentType'; id: string }>;
	} | null> | null;
};

export type ProjectByIdQueryVariables = Exact<{
	id: Scalars['ID'];
}>;

export type ProjectByIdQuery = {
	__typename?: 'Query';
	projectById?: {
		__typename?: 'ProjectType';
		id: string;
		name: string;
		subtitle: string;
		postedAt: any;
		url: string;
		votedByMe?: boolean | null;
		description: string;
		logo?: string | null;
		upvote?: number | null;
		tag: Array<{ __typename?: 'TagType'; tagName: string }>;
		screenshots: Array<{
			__typename?: 'ScreenshotType';
			id: string;
			src?: string | null;
		}>;
		owner: {
			__typename?: 'ProfileType';
			id: string;
			username: string;
			avatar?: string | null;
		};
	} | null;
};

export type ProjectByIdCommentsQueryVariables = Exact<{
	projectId: Scalars['ID'];
}>;

export type ProjectByIdCommentsQuery = {
	__typename?: 'Query';
	projectById?: {
		__typename?: 'ProjectType';
		comments: Array<{
			__typename?: 'CommentType';
			id: string;
			comment: string;
			date: any;
			owner: {
				__typename?: 'ProfileType';
				id: string;
				username: string;
				avatar?: string | null;
			};
			replies: Array<{
				__typename?: 'ReplyType';
				id: string;
				reply: string;
				date: any;
				owner: {
					__typename?: 'ProfileType';
					id: string;
					username: string;
					avatar?: string | null;
				};
			}>;
		}>;
	} | null;
};

export type GetProjectByUserQueryVariables = Exact<{
	userId?: InputMaybe<Scalars['ID']>;
}>;

export type GetProjectByUserQuery = {
	__typename?: 'Query';
	projectByUserid?: Array<{
		__typename?: 'ProjectType';
		id: string;
		name: string;
		subtitle: string;
		postedAt: any;
		url: string;
		votedByMe?: boolean | null;
		logo?: string | null;
		upvote?: number | null;
		tag: Array<{ __typename?: 'TagType'; tagName: string }>;
		comments: Array<{ __typename?: 'CommentType'; id: string }>;
	} | null> | null;
};
