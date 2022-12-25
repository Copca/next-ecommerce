import { UiState } from './';

type UiActionType = { type: '[Ui] - Open Menu' } | { type: '[Ui] - Close Menu' };

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

		default:
			return state;
	}
};
