import { createContext } from 'react';

import { IUser } from '../../interfaces';

interface ContextProps {
	// State
	isLoggedIn: boolean;
	user?: IUser;
	responseMessage: {
		isShowMessage: boolean;
		hasError: boolean;
		message: string;
	};

	// Metodos
	registerUser: (name: string, email: string, password: string) => Promise<void>;
	logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);
