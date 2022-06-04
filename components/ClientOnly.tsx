/**
 * credit: https://www.joshwcomeau.com/react/the-perils-of-rehydration/
 */

import type { PropsWithChildren } from 'react';
import useHasMounted from '../hooks/useHasMounted';

export default function ClientOnly({
	children,
}: PropsWithChildren<Record<string, unknown>>) {
	const hasMounted = useHasMounted();

	if (!hasMounted) {
		return null;
	}
	return <>{children}</>;
}
