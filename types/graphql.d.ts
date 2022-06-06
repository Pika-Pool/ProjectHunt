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
};

export type CommentCreateMutation = {
	__typename?: 'CommentCreateMutation';
	commentInstance?: Maybe<CommentType>;
	message?: Maybe<Scalars['String']>;
	response?: Maybe<Scalars['Boolean']>;
};

export type CommentDeleteMutation = {
	__typename?: 'CommentDeleteMutation';
	message?: Maybe<Scalars['String']>;
	response?: Maybe<Scalars['Boolean']>;
};

export type CommentType = {
	__typename?: 'CommentType';
	comment: Scalars['String'];
	date: Scalars['DateTime'];
	id: Scalars['ID'];
	ownerId: ProfileType;
	projectId: ProjectType;
	replies: Array<ReplyType>;
};

export type CommentUpdateMutation = {
	__typename?: 'CommentUpdateMutation';
	commentInstance?: Maybe<CommentType>;
	message?: Maybe<Scalars['String']>;
	response?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
	__typename?: 'Mutation';
	createComment?: Maybe<CommentCreateMutation>;
	createProject?: Maybe<ProjectCreateMutation>;
	createReply?: Maybe<ReplyCreateMutation>;
	deleteComment?: Maybe<CommentDeleteMutation>;
	deleteProject?: Maybe<ProjectDeleteMutation>;
	deleteReply?: Maybe<ReplyDeleteMutation>;
	deleteScreenshot?: Maybe<ScreenshotDeleteMutation>;
	updateComment?: Maybe<CommentUpdateMutation>;
	updateProfile?: Maybe<UpdateProfile>;
	updateProject?: Maybe<ProjectUpdateMutation>;
	updateReply?: Maybe<ReplyUpdateMutation>;
};

export type MutationCreateCommentArgs = {
	comment: Scalars['String'];
	id?: InputMaybe<Scalars['ID']>;
};

export type MutationCreateProjectArgs = {
	description: Scalars['String'];
	name: Scalars['String'];
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

export type MutationDeleteScreenshotArgs = {
	id?: InputMaybe<Scalars['ID']>;
};

export type MutationUpdateCommentArgs = {
	comment: Scalars['String'];
	id?: InputMaybe<Scalars['ID']>;
};

export type MutationUpdateProfileArgs = {
	email?: InputMaybe<Scalars['String']>;
	firstName?: InputMaybe<Scalars['String']>;
	id: Scalars['ID'];
	lastName?: InputMaybe<Scalars['String']>;
	username?: InputMaybe<Scalars['String']>;
};

export type MutationUpdateProjectArgs = {
	description?: InputMaybe<Scalars['String']>;
	id?: InputMaybe<Scalars['ID']>;
	name?: InputMaybe<Scalars['String']>;
	subtitle?: InputMaybe<Scalars['String']>;
};

export type MutationUpdateReplyArgs = {
	id?: InputMaybe<Scalars['ID']>;
	reply: Scalars['String'];
};

export type ProfileType = {
	__typename?: 'ProfileType';
	avatar: Scalars['String'];
	email: Scalars['String'];
	firstName: Scalars['String'];
	id: Scalars['ID'];
	lastName: Scalars['String'];
	/** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
	username: Scalars['String'];
};

export type ProjectCreateMutation = {
	__typename?: 'ProjectCreateMutation';
	message?: Maybe<Scalars['String']>;
	projectInstance?: Maybe<ProjectType>;
	response?: Maybe<Scalars['Boolean']>;
};

export type ProjectDeleteMutation = {
	__typename?: 'ProjectDeleteMutation';
	message?: Maybe<Scalars['String']>;
	response?: Maybe<Scalars['Boolean']>;
};

export type ProjectType = {
	__typename?: 'ProjectType';
	comments: Array<CommentType>;
	description: Scalars['String'];
	id: Scalars['ID'];
	logo: Scalars['String'];
	name: Scalars['String'];
	ownerId: ProfileType;
	postedAt: Scalars['DateTime'];
	screenshots: Array<ScreenshotType>;
	subtitle: Scalars['String'];
	tag: Array<TagType>;
	upvote: Scalars['Int'];
};

export type ProjectUpdateMutation = {
	__typename?: 'ProjectUpdateMutation';
	message?: Maybe<Scalars['String']>;
	projectInstance?: Maybe<ProjectType>;
	response?: Maybe<Scalars['Boolean']>;
};

export type Query = {
	__typename?: 'Query';
	allProject?: Maybe<Array<Maybe<ProjectType>>>;
	allTag?: Maybe<Array<Maybe<TagType>>>;
	filterProject?: Maybe<Array<Maybe<ProjectType>>>;
	filterTag?: Maybe<Array<Maybe<TagType>>>;
	message?: Maybe<Scalars['String']>;
	profile?: Maybe<ProfileType>;
	projectById?: Maybe<ProjectType>;
	projectByTagid?: Maybe<TagType>;
	status?: Maybe<Scalars['Int']>;
};

export type QueryFilterProjectArgs = {
	textToSearch?: InputMaybe<Scalars['String']>;
};

export type QueryFilterTagArgs = {
	tagName?: InputMaybe<Scalars['String']>;
};

export type QueryProfileArgs = {
	id: Scalars['ID'];
};

export type QueryProjectByIdArgs = {
	id?: InputMaybe<Scalars['ID']>;
};

export type QueryProjectByTagidArgs = {
	id?: InputMaybe<Scalars['ID']>;
};

export type ReplyCreateMutation = {
	__typename?: 'ReplyCreateMutation';
	message?: Maybe<Scalars['String']>;
	replyInstance?: Maybe<ReplyType>;
	response?: Maybe<Scalars['Boolean']>;
};

export type ReplyDeleteMutation = {
	__typename?: 'ReplyDeleteMutation';
	message?: Maybe<Scalars['String']>;
	response?: Maybe<Scalars['Boolean']>;
};

export type ReplyType = {
	__typename?: 'ReplyType';
	commentId: CommentType;
	date: Scalars['DateTime'];
	id: Scalars['ID'];
	ownerId: ProfileType;
	reply: Scalars['String'];
};

export type ReplyUpdateMutation = {
	__typename?: 'ReplyUpdateMutation';
	message?: Maybe<Scalars['String']>;
	replyInstance?: Maybe<ReplyType>;
	response?: Maybe<Scalars['Boolean']>;
};

export type ScreenshotDeleteMutation = {
	__typename?: 'ScreenshotDeleteMutation';
	message?: Maybe<Scalars['String']>;
	response?: Maybe<Scalars['Boolean']>;
};

export type ScreenshotType = {
	__typename?: 'ScreenshotType';
	id: Scalars['ID'];
	image: Scalars['String'];
	projectId: ProjectType;
};

export type TagType = {
	__typename?: 'TagType';
	id: Scalars['ID'];
	projects: Array<ProjectType>;
	tagName: Scalars['String'];
};

export type UpdateProfile = {
	__typename?: 'UpdateProfile';
	msg?: Maybe<Scalars['String']>;
	profile?: Maybe<ProfileType>;
	status?: Maybe<Scalars['Int']>;
};

export type CreateNewProjectMutationVariables = Exact<{
	description: Scalars['String'];
	name: Scalars['String'];
	subtitle: Scalars['String'];
	tags: Array<Scalars['String']> | Scalars['String'];
}>;

export type CreateNewProjectMutation = {
	__typename?: 'Mutation';
	createProject?: {
		__typename?: 'ProjectCreateMutation';
		response?: boolean | null;
		message?: string | null;
		projectInstance?: { __typename?: 'ProjectType'; id: string } | null;
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
		logo: string;
		name: string;
		subtitle: string;
		postedAt: any;
		upvote: number;
		tag: Array<{ __typename?: 'TagType'; tagName: string }>;
		comments: Array<{ __typename?: 'CommentType'; id: string }>;
	} | null> | null;
};
