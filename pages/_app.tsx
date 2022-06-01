import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import GlobalLayout from '../components/GlobalLayout';
import '../styles/globals.css';

export type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

interface AppPropsWithLayout extends AppProps {
	Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout;

	if (getLayout) return getLayout(<Component {...pageProps} />);
	return (
		<GlobalLayout>
			<Component {...pageProps} />
		</GlobalLayout>
	);
}

export default MyApp;
