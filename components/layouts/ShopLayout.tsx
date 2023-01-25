import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';

import { Navbar, SideMenu } from '../ui';

interface Props {
	title: string;
	pageDescription: string;
	imageFullUrl?: string;
}

export const ShopLayout: FC<PropsWithChildren<Props>> = ({
	children,
	title,
	pageDescription,
	imageFullUrl
}) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='description' content={pageDescription} />

				<meta name='og:tittle' content={title} />
				<meta name='og:description' content={pageDescription} />
				{imageFullUrl && <meta name='og:image' content={imageFullUrl} />}
			</Head>

			<div className='flex flex-col min-h-screen'>
				<Navbar />

				<SideMenu />

				<main className='flex-1 flex flex-col'>{children}</main>

				{/* <footer className='bg-red-400'>footer aqui</footer> */}
			</div>
		</>
	);
};
