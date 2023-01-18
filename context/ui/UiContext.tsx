import { createContext } from 'react';

interface ContextProps {
	// State
	isOpenMenu: boolean;
	isInputSearchOpen: boolean;

	// Metodos
	openMenu: () => void;
	closeMenu: () => void;
	openInputSearch: () => void;
	closeInputSearch: () => void;
}

export const UiContext = createContext({} as ContextProps);
