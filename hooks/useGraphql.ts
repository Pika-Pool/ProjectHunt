import { GraphQLClient } from 'graphql-request';
import { useState } from 'react';
import { getAuthKeyFromStorage } from '../contexts/AuthUser';

const graphqlBackendURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`;

export default function useGraphqlClient() {
	const [graphqlClient, setGraphqlClient] = useState(
		new GraphQLClient(graphqlBackendURL, {
			headers() {
				const headers: HeadersInit = {};
				const userAuthKey = getAuthKeyFromStorage();

				if (userAuthKey) headers['Authorization'] = `Token ${userAuthKey}`;
				return headers;
			},
			mode: 'cors',
		}),
	);

	return [graphqlClient, setGraphqlClient];
}
