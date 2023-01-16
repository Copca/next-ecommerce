import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { IOrderItem } from '../../interfaces';
import { initialData } from '../../database/products';

import { Counter } from '../ui';

const productsInCart = [
	initialData.products[0],
	initialData.products[1],
	initialData.products[2]
];

interface Props {
	editable?: boolean;
	products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {
	const onUpdatedQuantity = () => {};

	return (
		<>
			{productsInCart.map((product) => (
				<div
					key={product.slug + product.sizes}
					className='flex flex-col items-center md:flex-row md:items-start gap-4 mb-4'
				>
					<div>
						{/* TODO: Llevar a la página del prouducto */}
						<Link href={`/product/${product.slug}`}>
							<Image
								src={`/products/${product.images[0]}`}
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
								<span className='font-bold ml-3'>{product.sizes[0]}</span>
							</p>

							{editable ? (
								<Counter
									currentValue={0}
									maxValue={10}
									// updatedQuantity={(value) =>
									// 	onUpdatedQuantity(product as ICartProduct, value)
									// }
									updatedQuantity={onUpdatedQuantity}
								/>
							) : (
								<p className='text-xl mt-4'>3 Productos</p>
							)}
						</div>
					</div>

					<div className='text-center py-4'>
						<p className='text-lg font-bold'>$ {product.price}</p>

						{editable && (
							<button
								className='text-blue-500 hover:text-blue-600 font-bold text-sm transition-colors'
								// onClick={() =>
								// 	removeCartProduct(product as ICartProduct)
								// }
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
