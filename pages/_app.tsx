import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { UiProvider } from '../context/ui';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UiProvider>
			<Component {...pageProps} />
		</UiProvider>
	);
}
