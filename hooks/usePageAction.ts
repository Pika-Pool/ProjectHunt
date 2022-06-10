import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function usePageAction() {
	const router = useRouter();
	const { action } = router.query;

	useEffect(() => {
		if (!action) return;
	}, []);
}
