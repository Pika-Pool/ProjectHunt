import { useMemo } from 'react';
import isValidURL from '../lib/isValidURL';

export default function useImageFromServer(url?: string) {
	const urlToUse = useMemo(() => {
		let urlToUse = url;

		if (urlToUse && !isValidURL(urlToUse)) {
			urlToUse = process.env.NEXT_PUBLIC_BACKEND_URL + `/media/${urlToUse}`;
		}
		return urlToUse;
	}, [url]);

	return urlToUse;
}
