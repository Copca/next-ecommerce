/**
 * Esta página dinámica podriamos hidratarla con Client-Side-Renderig usando SWR o una peticion Fetch con useEffect 	pero perderiamos información para el SEO.
 * Por lo tanto sería mejor el Server Side Rendering - SSR el inconveniente es que se genera la página en cada petición
 * La mejor opción es generarla (estaticamente) con SSG Static Site Generation con ISR (reavalidate) usando GetStaticPaths y GetStaticProps
 *
 * Esta página se genera estaticamente en buid time si es reqierida en produccion se gera con ISR(revalidate) cada 24hrs, evitando que se genere dinamicamente con cada request(petición)
 *
 */

import { useState, useContext } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { dbProducts } from '../../database';
import { ICartProduct, IProduct, ISize } from '../../interfaces';

import { ShopLayout } from '../../components/layouts';
import { ProductSlide, SizeSelector } from '../../components/products';
import { Counter } from '../../components/ui';
import { CartContext } from '../../context';

interface Props {
	product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
	const router = useRouter();
	const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
		_id: product._id,
		image: product.images[0],
		price: product.price,
		size: undefined,
		slug: product.slug,
		title: product.title,
		gender: product.gender,
		quantity: 1
	});
	const { addProduct } = useContext(CartContext);

	const onUpdatedQuantity = (newQuantity: number) => {
		setTempCartProduct({
			...tempCartProduct,
			quantity: newQuantity
		});
	};

	const onSelectSize = (selectedSize: ISize) => {
		setTempCartProduct({
			...tempCartProduct,
			size: selectedSize
		});
	};

	const onAddProduct = () => {
		if (!tempCartProduct.size) return;

		addProduct(tempCartProduct);
		router.push('/cart');
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
						currentValue={tempCartProduct.quantity}
						maxValue={product.inStock > 10 ? 10 : product.inStock}
						updatedQuantity={onUpdatedQuantity}
					/>

					<SizeSelector
						sizes={product.sizes}
						selectedSize={tempCartProduct.size}
						selectSize={onSelectSize}
					/>

					{product.inStock ? (
						<button
							className='btn bg-blue-500 hover:bg-blue-600 w-full my-4 rounded-full'
							data-mdb-ripple='true'
							onClick={onAddProduct}
						>
							{tempCartProduct.size
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
