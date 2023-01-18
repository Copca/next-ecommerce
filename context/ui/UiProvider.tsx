import { FC, PropsWithChildren, useReducer } from 'react';

import { UiContext, uiReducer } from './';

export interface UiState {
	isOpenMenu: boolean;
	isInputSearchOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
	isOpenMenu: false,
	isInputSearchOpen: false
};

export const UiProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

	const openMenu = () => {
		dispatch({ type: '[Ui] - Open Menu' });
	};

	const closeMenu = () => {
		dispatch({ type: '[Ui] - Close Menu' });
	};

	const openInputSearch = () => {
		dispatch({ type: '[Ui] - Open InputSearch' });
	};

	const closeInputSearch = () => {
		dispatch({ type: '[Ui] - Close InputSearch' });
	};

	return (
		<UiContext.Provider
			value={{
				// State
				...state,

				// Metodos
				openMenu,
				closeMenu,
				openInputSearch,
				closeInputSearch
			}}
		>
			{children}
		</UiContext.Provider>
	);
};
