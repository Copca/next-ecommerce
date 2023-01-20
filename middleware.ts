/**
 * Si no tiene sesion se usuario(token), redirecciona al login
 * El código del middleware sólo se ejecutan en las rutas declaradas en el matcher
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
	const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	if (!session) {
		const requestedPage = req.nextUrl.pathname;
		const url = req.nextUrl.clone();

		url.pathname = '/auth/login';
		url.search = `p=${requestedPage}`;

		return NextResponse.redirect(url);
	}

	// return NextResponse.redirect(new URL('/about-2', req.url));
	return NextResponse.next();
}

export const config = {
	matcher: ['/checkout/address', '/checkout/summary']
};

/**
 * See "Matching Paths"
 * 
 * 1. * is zero or more.
 * 2. ? is zero or one.
 * 3. + one or more.
 * 
matcher: [
	'/api/entries/:path*', // SI /api/entries, SI /api/entries/6357fcf9dc98064a1b0709ee
	'/api/entries/:path?', // SI /api/entries, SI /api/entries/6357fcf9dc98064a1b0709ee
	'/api/entries/:path+' // NO /api/entries, SI /api/entries/6357fcf9dc98064a1b0709ee
];
 */
