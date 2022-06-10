import type { PropsWithChildren, ReactNode } from 'react';
import FooterNav from './FooterNav';
import Header from './Header';

export interface AuthLayoutProps {
	headerTitle?: string;
}

export default function AuthLayout({
	children,
	headerTitle,
}: PropsWithChildren<AuthLayoutProps>) {
	return (
		<>
			<Header withBackBtn title={headerTitle} />
			<main className='flex flex-col items-center px-3'>{children}</main>
			<FooterNav />
		</>
	);
}

export function withAuthLayout(children?: ReactNode) {
	return <AuthLayout>{children}</AuthLayout>;
}
