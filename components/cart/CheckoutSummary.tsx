import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { CartContext } from '../../context/cart/CartContext';

import { CardSummary } from './CardSummary';

export const CheckoutSummary = () => {
	const router = useRouter();
	const { shippingAddress, createOrder } = useContext(CartContext);

	const [isPosting, setIsPosting] = useState(false);
	const [apiResponse, setApiResponse] = useState<{
		hasError: boolean;
		message: string;
	}>({ hasError: false, message: '' });

	const onCreateOrder = async () => {
		setIsPosting(true);

		const { hasError, message, idOrder } = await createOrder();

		setApiResponse({ message, hasError });

		if (idOrder) {
			router.push(`/orders/${idOrder}`);
			// setIsPosting(false);
		}
	};

	if (!shippingAddress) return <></>;

	return (
		<div className='border shadow-md rounded-md p-4'>
			<CardSummary editable shippingAddress={shippingAddress} />

			<div>
				<button
					className='btn bg-blue-500 hover:bg-blue-600 rounded-full w-full mt-4 disabled:opacity-40'
					disabled={isPosting}
					onClick={onCreateOrder}
				>
					Confirmar Orden
				</button>

				{apiResponse.message.length > 0 && (
					<div
						className={` text-white rounded-full text-center text-xs py-2 mt-4 ${
							apiResponse.hasError ? 'bg-red-500' : 'bg-emerald-500'
						}`}
					>
						{apiResponse.message}
					</div>
				)}
			</div>
		</div>
	);
};
