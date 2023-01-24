import { FC } from 'react';
import { useRouter } from 'next/router';

import { IOrder } from '../../interfaces';

import { CardSummary } from './CardSummary';
import { Chip } from '../ui';

interface Props {
	order: IOrder;
}

export const OrderSummary: FC<Props> = ({ order }) => {
	const router = useRouter();

	return (
		<div className='border shadow-md rounded-md p-4'>
			<CardSummary orderValues={order} />

			{order.isPaid ? (
				<Chip pagado={order.isPaid} className='w-full' />
			) : (
				<h4 className='text-3xl font-bold'>Pagar</h4>
			)}
		</div>
	);
};
