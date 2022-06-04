import { GraphQLClient } from 'graphql-request';
import { getAuthKeyFromStorage } from '../contexts/AuthUser';

const graphqlBackendURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql/`;

const graphqlClient = new GraphQLClient(graphqlBackendURL, {
	headers() {
		const headers: HeadersInit = {};
		const userAuthKey = getAuthKeyFromStorage();

		if (userAuthKey) headers['Authorization'] = `Token ${userAuthKey}`;
		return headers;
	},
	mode: 'cors',
});

export default graphqlClient;
