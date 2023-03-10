/**
 * Componente usado en:
 *
 * "/checkout/summary" '<CheckoutSummary/>' -> <CardSummary editable shippingAddress={shippingAddress} />
 * "/orders/[id]" '<OrderSummary' -> <CardSummary orderValues={order} />
 * "/admin/orders/[id]" '<AdminOrderSummary order={order} />' -> <CardSummary orderValues={order} />
 *
 */

import { FC, useContext } from 'react';
import Link from 'next/link';

import { countries, divisa } from '../../utils';
import { IOrder, IShippingAddress } from '../../interfaces';

import { CartContext } from '../../context/cart/CartContext';

interface Props {
	editable?: boolean;
	shippingAddress?: IShippingAddress; // información del state.cart
	orderValues?: IOrder;
}

export const CardSummary: FC<Props> = ({
	editable = false,
	orderValues,
	shippingAddress
}) => {
	const { numberOfItems, subTotal, tax, total } = useContext(CartContext);

	/**
	 * Seleccionamos el origen de la información dependiendo donde usamos el componente
	 * "/checkout/summary"(carrito) ó "/orders/[id]" (orden desde DB)
	 */
	const shippingAddressValues = orderValues?.shippingAddress
		? orderValues.shippingAddress
		: shippingAddress;

	const summaryValues = orderValues
		? orderValues
		: { numberOfItems, subTotal, tax, total };

	if (!shippingAddressValues) return <></>;

	return (
		<>
			<h2 className='text-xl'>
				Resumen: ({summaryValues.numberOfItems}){' '}
				{summaryValues.numberOfItems === 1 ? 'Producto' : 'Productos'}
			</h2>
			<hr className='mb-8' />

			<div className='flex justify-between mb-2'>
				<h6 className='text-lg font-bold'>Dirección de entrega</h6>

				{editable && (
					<Link href={'#'} className='underline'>
						Editar
					</Link>
				)}
			</div>

			<p>
				{shippingAddressValues?.firstName} {shippingAddressValues?.lastName}
			</p>
			<p>
				{shippingAddressValues.address}{' '}
				{shippingAddressValues.address2
					? `, ${shippingAddressValues.address2}`
					: ''}
			</p>
			<p>{shippingAddressValues.city}</p>
			<p>{shippingAddressValues.zip}</p>
			<p>{countries.find((c) => c.code === shippingAddressValues.country)?.name}</p>
			<p>{shippingAddressValues.phone}</p>

			<hr />

			{editable && (
				<div className='flex justify-end mt-8'>
					<Link href={'#'} className='underline'>
						Editar
					</Link>
				</div>
			)}

			<div className='flex justify-between mt-2'>
				<p>No. Productos</p>
				<p>
					{summaryValues.numberOfItems}{' '}
					{summaryValues.numberOfItems === 1 ? 'Producto' : 'Productos'}{' '}
				</p>
			</div>

			<div className='flex justify-between'>
				<p>Subtotal</p>
				<p>{divisa.formatearDinero(summaryValues.subTotal)}</p>
			</div>

			<div className='flex justify-between'>
				<p>Impuestos {Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%</p>
				<p>{divisa.formatearDinero(summaryValues.tax)}</p>
			</div>

			<div className='flex justify-between text-lg font-bold mt-3 mb-8'>
				<p>Total:</p>
				<p>{divisa.formatearDinero(summaryValues.total)}</p>
			</div>
		</>
	);
};
