import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { useSession, signOut } from 'next-auth/react';

import Cookies from 'js-cookie';
import axios from 'axios';

import clienteAxios from '../../axios/axios';
import { IUser } from '../../interfaces';

import { AuthContext, authReducer } from './';

export interface AuthState {
	isLoggedIn: boolean;
	user?: IUser;
	responseMessage: {
		isShowMessage: boolean;
		hasError: boolean;
		message: string;
	};
}

const AUTH_INITIAL_STATE: AuthState = {
	isLoggedIn: false,
	user: undefined,
	responseMessage: {
		isShowMessage: false,
		hasError: false,
		message: ''
	}
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
	const { data, status } = useSession();

	// Autenticación con NextAuth
	useEffect(() => {
		if (status === 'authenticated') {
			// console.log({ user: data.user });
			// Guardamos en Context la información de usuario almacenada en session
			dispatch({ type: '[Auth] - Login', payload: data.user as IUser });
		}
	}, [status, data]);

	// Registrar nuevo usuario en DB
	const registerUser = async (name: string, email: string, password: string) => {
		try {
			const { data } = await clienteAxios.post('/user/register', {
				name,
				email,
				password
			});

			dispatch({
				type: '[Auth] - Response',
				payload: { isShowMessage: true, hasError: false, message: data.message }
			});
		} catch (error) {
			// console.log(error);
			if (axios.isAxiosError(error)) {
				dispatch({
					type: '[Auth] - Response',
					payload: {
						isShowMessage: true,
						hasError: true,
						message: error.response?.data.message
					}
				});
			}
		} finally {
			setTimeout(() => {
				dispatch({ type: '[Auth] - Reset Response Message' });
			}, 3000);
		}
	};

	// Cerrar Sesión
	const logout = () => {
		Cookies.remove('cart');
		Cookies.remove('firstName');
		Cookies.remove('lastName');
		Cookies.remove('address');
		Cookies.remove('address2');
		Cookies.remove('zip');
		Cookies.remove('city');
		Cookies.remove('country');
		Cookies.remove('phone');

		// Función de NextAuth para cerrar Sesión
		signOut();
	};

	return (
		<AuthContext.Provider
			value={{
				// State
				...state,

				// Metodos
				registerUser,
				logout
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
