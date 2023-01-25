import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { OrderResponseBody } from '@paypal/paypal-js';

import { ImSpinner9 } from 'react-icons/im';

import { clienteAxios } from '../../axios';
import { IOrder } from '../../interfaces';

import { CardSummary } from './CardSummary';
import { Chip } from '../ui';

interface Props {
	order: IOrder;
}

export const OrderSummary: FC<Props> = ({ order }) => {
	const router = useRouter();
	const [isPaying, setIsPaying] = useState(false);

	const onOrderCompleted = async (details: OrderResponseBody) => {
		// Con esta validación evitamos hace la peticion al backend
		if (details.status !== 'COMPLETED') {
			return alert('No hay pago en Paypal');
		}

		setIsPaying(true);

		try {
			// Pagamos la orden enviamos el transactionId de Paypal y el orderId de la DB
			const { data } = await clienteAxios.post(`/orders/pay`, {
				transactionId: details.id,
				orderId: order._id
			});

			// Si todo OK
			router.reload();
		} catch (error) {
			console.log(error);
			setIsPaying(false);
			alert('Error');
		}
	};

	return (
		<div className='border shadow-md rounded-md p-4'>
			<CardSummary orderValues={order} />

			{isPaying ? (
				<div className='flex justify-center animate-fadeIn'>
					<ImSpinner9 className='text-2xl animate-spin text-center' />
				</div>
			) : (
				<>
					{order.isPaid ? (
						<Chip pagado={order.isPaid} className='w-full' />
					) : (
						<PayPalButtons
							createOrder={(data, actions) => {
								return actions.order.create({
									purchase_units: [
										{
											amount: {
												value: `${order.total}` // debe ser string
											}
										}
									]
								});
							}}
							onApprove={(data, actions) => {
								return actions.order!.capture().then((details) => {
									// console.log({ details });
									onOrderCompleted(details);
								});
							}}
						/>
					)}
				</>
			)}
		</div>
	);
};
