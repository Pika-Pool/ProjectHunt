import type { PropsWithChildren } from 'react';
import FooterNav from './FooterNav';
import Header from './Header';

export default function GlobalLayout({
	children,
}: PropsWithChildren<Record<string, unknown>>) {
	return (
		<>
			<Header />
			<main className='mt-3'>{children}</main>
			<FooterNav />
		</>
	);
}
