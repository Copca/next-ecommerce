import { FC, PropsWithChildren, useReducer } from 'react';

import { UiContext, uiReducer } from './';

export interface UiState {
	isOpenMenu: boolean;
}

const UI_INITIAL_STATE: UiState = {
	isOpenMenu: false
};

export const UiProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

	const openMenu = () => {
		dispatch({ type: '[Ui] - Open Menu' });
	};

	const closeMenu = () => {
		dispatch({ type: '[Ui] - Close Menu' });
	};

	return (
		<UiContext.Provider
			value={{
				// State
				...state,

				// Metodos
				openMenu,
				closeMenu
			}}
		>
			{children}
		</UiContext.Provider>
	);
};
