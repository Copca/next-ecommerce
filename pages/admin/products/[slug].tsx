import { GetServerSideProps, NextPage } from 'next';

import { TiEdit } from 'react-icons/ti';

import { dbProducts } from '../../../database';
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces';

import { AdminLayout } from '../../../components/layouts';
import { FormProduct } from '../../../components/admin';

interface Props {
	product: IProduct;
}

const ProductSlugPage: NextPage<Props> = ({ product }) => {
	return (
		<AdminLayout
			title='Producto'
			subTitle={product._id ? `Editando: ${product.title}` : 'Producto Nuevo'}
			icon={<TiEdit className='mr-2' />}
		>
			<div className='container'>
				<FormProduct product={product} />
			</div>
		</AdminLayout>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { slug } = params as { slug: string };

	let product: IProduct | null;

	// Crear nuevo producto
	if (slug === 'new') {
		const tempProduct = JSON.parse(JSON.stringify(new Product()));

		delete tempProduct._id;
		product = tempProduct;

		// Editar producto
	} else {
		product = await dbProducts.getProductBySlug(slug);
	}

	if (!product) {
		return {
			redirect: {
				destination: '/admin/products',
				permanent: false
			}
		};
	}

	return {
		props: {
			product
		}
	};
};

export default ProductSlugPage;
