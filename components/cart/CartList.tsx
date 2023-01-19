import { FC, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ICartProduct, IOrderItem } from '../../interfaces';
import { CartContext } from '../../context/cart/CartContext';

import { Counter } from '../ui';

interface Props {
	editable?: boolean;
	products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {
	const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

	const onUpdatedQuantity = (newQuantity: number, product: ICartProduct) => {
		product.quantity = newQuantity;

		updateCartQuantity(product);
	};

	return (
		<>
			{cart.map((product) => (
				<div
					key={product.slug + product.size}
					className='flex flex-col items-center md:flex-row md:items-start gap-4 mb-4'
				>
					<div>
						{/* TODO: Llevar a la página del prouducto */}
						<Link href={`/product/${product.slug}`}>
							<Image
								src={product.image}
								alt={product.title}
								width={200}
								height={200}
								priority
								className='inline-block shadow'
							/>
						</Link>
					</div>

					<div className='flex-1 flex justify-center md:justify-start  py-4'>
						<div>
							<h4 className='text-slate-800 text-lg font-bold mb-2'>
								{product.title}
							</h4>

							<p>
								Talla:
								<span className='font-bold ml-3'>{product.size}</span>
							</p>

							{editable ? (
								<Counter
									currentValue={product.quantity}
									maxValue={10}
									updatedQuantity={(value) =>
										onUpdatedQuantity(value, product)
									}
								/>
							) : (
								<p className='text-xl mt-4'>
									{product.quantity}{' '}
									{product.quantity > 1 ? 'Productos' : 'Producto'}
								</p>
							)}
						</div>
					</div>

					<div className='text-center py-4'>
						<p className='text-lg font-bold'>$ {product.price}</p>

						{editable && (
							<button
								className='text-blue-500 hover:text-blue-600 font-bold text-sm transition-colors'
								onClick={() => removeCartProduct(product as ICartProduct)}
							>
								Remover
							</button>
						)}
					</div>
				</div>
			))}
		</>
	);
};
