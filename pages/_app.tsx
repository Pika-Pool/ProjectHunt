import type { AppProps } from 'next/app';
import GlobalLayout from '../components/GlobalLayout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<GlobalLayout>
			<Component {...pageProps} />
		</GlobalLayout>
	);
}

export default MyApp;
