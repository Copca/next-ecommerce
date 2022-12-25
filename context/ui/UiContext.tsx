import { createContext } from 'react';

interface ContextProps {
	// State
	isOpenMenu: boolean;

	// Metodos
	openMenu: () => void;
	closeMenu: () => void;
}

export const UiContext = createContext({} as ContextProps);
