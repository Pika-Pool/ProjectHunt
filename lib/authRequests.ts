import { getAuthKeyFromStorage } from '../contexts/AuthUser';
import { FetchError } from './CustomErrors';

export const defaultAuthRequest = async (
	url: string,
	data: unknown,
	fetchOptions?: RequestInit,
) => {
	const headers: HeadersInit = { 'Content-Type': 'application/json' };
	let body: FormData | string;

	if (data instanceof FormData) {
		headers['Content-Type'] = 'application/x-www-form-urlencoded';
		body = data;
	} else {
		body = JSON.stringify(data);
	}

	// get user auth key from localstorage
	const userAuthKey = getAuthKeyFromStorage();
	if (userAuthKey) {
		headers['Authorization'] = `Token ${userAuthKey}`;
	}

	const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
		mode: 'cors',
		method: 'POST',
		headers,
		body,
		...fetchOptions,
	});
	const fetchResults = await res.json();

	if (!res.ok) {
		const error = new FetchError({
			fetchResults,
			...res,
		});
		throw error;
	}

	return fetchResults;
};

export const formDataToObject = (formData: FormData) =>
	Object.fromEntries(formData);
