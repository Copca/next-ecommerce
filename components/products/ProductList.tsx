import { FC } from 'react';
import { IProduct } from '../../interfaces';

import { ProductCard } from './ProductCard';

interface Props {
	products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {
	return (
		<div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-8 mt-8 text-slate-700 font-bold animate-fadeIn'>
			{products.map((product) => (
				<div key={product.slug}>
					<ProductCard product={product} />
				</div>
			))}
		</div>
	);
};
