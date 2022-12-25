import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IProduct } from '../../interfaces';

interface Props {
	product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
	return (
		<Image
			src={`/products/${product.images[0]}`}
			width={300}
			height={300}
			alt={`imagen ${product.title}`}
			priority
		/>
	);
};
