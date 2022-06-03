import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthUser } from '../contexts/AuthUser';

export default function useRedirectOnLoggedIn() {
	const { isLoggedIn } = useAuthUser();

	const router = useRouter();
	useEffect(() => {
		if (isLoggedIn) router.replace('/home');
	}, [isLoggedIn, router]);
}
