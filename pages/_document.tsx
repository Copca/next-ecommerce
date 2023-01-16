import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
	return (
		<Html lang='es'>
			<Head />
			<body>
				<Main />
				<NextScript />
				<Script
					src='https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js'
					strategy='afterInteractive'
				/>
			</body>
		</Html>
	);
}
