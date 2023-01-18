import { UiState } from './';

type UiActionType =
	| { type: '[Ui] - Open Menu' }
	| { type: '[Ui] - Close Menu' }
	| { type: '[Ui] - Open InputSearch' }
	| { type: '[Ui] - Close InputSearch' };

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
	switch (action.type) {
		case '[Ui] - Open Menu':
			return {
				...state,
				isOpenMenu: true
			};

		case '[Ui] - Close Menu':
			return {
				...state,
				isOpenMenu: false
			};

		case '[Ui] - Open InputSearch':
			return {
				...state,
				isInputSearchOpen: true
			};

		case '[Ui] - Close InputSearch':
			return {
				...state,
				isInputSearchOpen: false
			};

		default:
			return state;
	}
};
