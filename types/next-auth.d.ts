import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

// Extendemos la propiedad session.accessToken al callback session
declare module 'next-auth' {
	interface User {
		id?: string;
		_id: string;
		email: string;
		role: string;
		name: string;
	}

	interface Session {
		accessToken: string;
	}
}

declare module 'next-auth/jwt' {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		/** OpenID ID Token */
		accessToken: string;
		user: {
			_id: string;
			email: string;
			role: string;
			name: string;
		};
	}
}
