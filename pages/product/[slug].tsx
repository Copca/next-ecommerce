import { useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { initialData } from '../../database/products';
import { dbProducts } from '../../database';
import { IProduct, ISize } from '../../interfaces';

import { ShopLayout } from '../../components/layout';
import { ProductSlide, SizeSelector } from '../../components/products';
import { Counter } from '../../components/ui';

const product = initialData.products[0];

interface Props {
	product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
	const [quantity, setQuantity] = useState(0);

	const onUpdatedQuantity = (quantity: number) => {
		setQuantity(quantity);
	};

	const onSelectedSize = (size: ISize) => {
		// setTempCartProduct({
		// 	...tempCartProduct,
		// 	size
		// });
	};

	return (
		<ShopLayout title={product.title} pageDescription={product.description}>
			<div className='container flex gap-8 text-slate-800'>
				<div className='w-3/5'>
					<ProductSlide images={product.images} />
				</div>

				<div className='w-2/5'>
					<h1 className='text-2xl font-bold'>{product.title}</h1>
					<p className='text-xl mb-8'>$ {product.price}</p>

					<Counter
						// currentValue={tempCartProduct.quantity}
						currentValue={quantity}
						updatedQuantity={onUpdatedQuantity}
						maxValue={product.inStock > 10 ? 10 : product.inStock}
					/>

					<SizeSelector
						sizes={product.sizes}
						// selectedSize={tempCartProduct.size}
						selectedSize={product.sizes[0]}
						onSelectedSize={onSelectedSize}
					/>

					{product.inStock ? (
						<button
							className='btn bg-blue-500 hover:bg-blue-600 w-full my-4 rounded-full'
							data-mdb-ripple='true'
							// onClick={onAddProduct}
						>
							{product.sizes
								? 'Agregar al carrito'
								: 'Seleccione una talla'}
						</button>
					) : (
						<div className='text-red-500 font-bold border uppercase text-xs border-red-500 rounded-full text-center py-2 my-4'>
							No hay disponibles
						</div>
					)}

					<div>
						<h6 className='font-bold'>Descripción</h6>
						<p>{product.description}</p>
					</div>
				</div>
			</div>
		</ShopLayout>
	);
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const productsSlugs = await dbProducts.getAllProductsSlugs();

	return {
		paths: productsSlugs.map(({ slug }) => ({
			params: { slug }
		})),
		fallback: 'blocking'
	};
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug = '' } = params as { slug: string };

	const product = await dbProducts.getProductBySlug(slug);

	if (!product) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		};
	}

	return {
		props: {
			product
		},
		revalidate: 86400 // 24hrs, tiempo en que genera autamaticamente las páginas estaticas
	};
};

export default ProductPage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
// 	const { slug = '' } = params as { slug: string };

// 	const product = await dbProducts.getProductBySlug(slug);

// 	if (!product) {
// 		return {
// 			redirect: {
// 				destination: '/',
// 				permanent: false
// 			}
// 		};
// 	}

// 	return {
// 		props: {
// 			product
// 		}
// 	};
// };
