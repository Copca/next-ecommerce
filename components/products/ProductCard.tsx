import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IProduct } from '../../interfaces';

interface Props {
	product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link
			// href={`/product/${product.slug}`}
			href={'/product'}
			prefetch={false} // evita cargar todas las tarjetas en memoria
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className='relative'>
				{!product.inStock && (
					<div className='absolute top-2 right-2 bg-slate-900 text-white text-sm text-center rounded-full py-1 px-2 z-10'>
						No hay disponibles
					</div>
				)}

				<button data-mdb-ripple='true' className='flex justify-center'>
					<Image
						src={
							isHovered
								? `/products/${product.images[0]}`
								: `/products/${product.images[1]}`
						}
						width={350}
						height={350}
						alt={`imagen ${product.title}`}
						priority
						className={`rounded-md shadow ${
							isHovered && 'animate-[fadeIn_1.5s_ease-in-out_1]'
						}`}
					/>
				</button>

				<div className='mt-2 px-4'>
					<h6>{product.title}</h6>
					<p>$ {product.price}</p>
				</div>
			</div>
		</Link>
	);
};
