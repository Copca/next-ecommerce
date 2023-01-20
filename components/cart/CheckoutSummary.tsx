import { useContext } from 'react';

import { CartContext } from '../../context/cart/CartContext';

import { CardSummary } from './CardSummary';

export const CheckoutSummary = () => {
	const { shippingAddress } = useContext(CartContext);

	if (!shippingAddress) return <></>;
	return (
		<div className='border shadow-md rounded-md p-4'>
			<CardSummary editable shippingAddress={shippingAddress} />

			<div>
				<button className='btn bg-blue-500 hover:bg-blue-600 rounded-full w-full mt-4 disabled:opacity-40'>
					Confirmar Orden
				</button>
			</div>
		</div>
	);
};
