import { AuthState } from './';
import { IUser } from '../../interfaces';

type AuthActionType =
	| { type: '[Auth] - Login'; payload: IUser }
	| { type: '[Auth] - Logout' }
	| {
			type: '[Auth] - Response';
			payload: { isShowMessage: boolean; hasError: boolean; message: string };
	  }
	| { type: '[Auth] - Reset Response Message' };

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
	switch (action.type) {
		case '[Auth] - Login':
			return {
				...state,
				isLoggedIn: true,
				user: action.payload
			};

		case '[Auth] - Logout':
			return {
				...state,
				isLoggedIn: false,
				user: undefined
			};

		case '[Auth] - Response':
			return {
				...state,
				responseMessage: action.payload
			};

		case '[Auth] - Reset Response Message':
			return {
				...state,
				responseMessage: { isShowMessage: false, hasError: false, message: '' }
			};

		default:
			return state;
	}
};
