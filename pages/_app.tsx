import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { UiProvider } from '../context/ui';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig
			value={{
				fetcher: (resource, init) =>
					fetch(resource, init).then((res) => res.json())
			}}
		>
			<UiProvider>
				<Component {...pageProps} />
			</UiProvider>
		</SWRConfig>
	);
}
