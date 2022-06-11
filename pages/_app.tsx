import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useState, type ReactElement, type ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import GlobalLayout from '../components/GlobalLayout';
import AuthUserProvider from '../contexts/AuthUser';
import '../styles/globals.css';

export type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

interface AppPropsWithLayout extends AppProps {
	Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout;
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						// staleTime: 10 * 60 * 1000, // 10min
					},
				},
			}),
	);

	return (
		// Provide the client to your App
		<QueryClientProvider client={queryClient}>
			<AuthUserProvider>
				<Toaster />

				{getLayout ? (
					getLayout(<Component {...pageProps} />)
				) : (
					<GlobalLayout>
						<Component {...pageProps} />
					</GlobalLayout>
				)}
			</AuthUserProvider>
		</QueryClientProvider>
	);
}

export default MyApp;
