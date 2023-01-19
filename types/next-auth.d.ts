import NextAuth from 'next-auth';

// Extendemos la propiedad session.accessToken al callback session
declare module 'next-auth' {
	interface User {
		id?: string;
	}

	interface Session {
		accessToken?: string;
		user?: {
			_id: string;
		};
	}
}
