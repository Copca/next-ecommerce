import { NextPage } from 'next';

import { initialData } from '../database/products';

import { ShopLayout } from '../components/layout';
import { ProductList } from '../components/products';
import { IProduct } from '../interfaces';

const HomePage: NextPage = () => {
	return (
		<ShopLayout
			title={'Teslo-Shop - Home'}
			pageDescription={'Encuentra los mejores productos de Teslo'}
		>
			<div className='container'>
				<h1 className='text-2xl font-bold'>Tienda</h1>
				<h2>Todos los productos</h2>

				<ProductList products={initialData.products as IProduct[]} />
			</div>
		</ShopLayout>
	);
};

export default HomePage;
