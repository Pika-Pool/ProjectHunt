import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthUser } from '../contexts/AuthUser';

export default function useRedirectOnLoggedIn() {
	const { isLoggedIn } = useAuthUser();

	const router = useRouter();
	const { from, passAction, action } = router.query;

	useEffect(() => {
		if (isLoggedIn)
			router.replace({
				pathname: from?.toString() || '/home',
				query: passAction ? { action: passAction } : '',
			});
	}, [passAction, from, isLoggedIn, router]);

	return { from, passAction, action };
}
