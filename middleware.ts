/**
 * Si no tiene sesion se usuario(token), redirecciona al login
 * El código del middleware sólo se ejecutan en las rutas declaradas en el matcher
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
	const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	// Proteccion de los endpoints de la /api/admin
	if (req.nextUrl.pathname.startsWith('/api/admin') && !session) {
		return new NextResponse(
			JSON.stringify({ success: false, message: 'No autorizado' }),
			{ status: 401, headers: { 'content-type': 'application/json' } }
		);
	}

	if (!session) {
		const requestedPage = req.nextUrl.pathname;
		const url = req.nextUrl.clone();

		url.pathname = '/auth/login';
		url.search = `p=${requestedPage}`;

		return NextResponse.redirect(url);
	}

	const validRoles = ['admin', 'super-user', 'seo'];

	if (!validRoles.includes(session.user.role)) {
		return NextResponse.redirect(new URL('/', req.nextUrl.origin));
	}

	// return NextResponse.redirect(new URL('/about-2', req.url));
	return NextResponse.next();
}

export const config = {
	matcher: ['/checkout/:path*', '/admin:path*', '/api/admin/:function*']
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
