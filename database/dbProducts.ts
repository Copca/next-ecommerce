/**
 * consultas a la DB deste el backend para no utilizar la API, ya que sería más tardada la consulta
 */

import { db } from './';
import { Product } from '../models';
import { IProduct } from '../interfaces';

interface ProductSlug {
	slug: string;
}

export const getAllProductsSlugs = async (): Promise<ProductSlug[]> => {
	await db.connect();
	const slugs = await Product.find().select('slug -_id').lean();
	await db.disconnect();

	return slugs;
};

export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
	await db.connect();
	const product = await Product.findOne({ slug }).lean();
	await db.disconnect();

	if (!product) {
		return null;
	}

	// Retorna la imagen guardada en Cloudinary o la del FileSystem
	product.images = product.images.map((img) => {
		return img.includes('https') ? img : `${process.env.HOST_NAME}products/${img}`;
	});

	return JSON.parse(JSON.stringify(product));
};

export const getProductsByTerm = async (term: string): Promise<IProduct[]> => {
	term = term.toString().toLowerCase();

	await db.connect();
	const products = await Product.find({
		$text: { $search: term }
	})
		.select('title images price inStock slug -_id')
		.lean();
	await db.disconnect();

	// Retorna la imagen guardada en Cloudinary o la del FileSystem
	const updatedProducts = products.map((product) => {
		product.images = product.images.map((img) => {
			return img.includes('https')
				? img
				: `${process.env.HOST_NAME}products/${img}`;
		});

		return product;
	});

	return updatedProducts;
};

export const getAllProducts = async (): Promise<IProduct[]> => {
	await db.connect();
	const products = await Product.find().lean();
	await db.disconnect();

	// Retorna la imagen guardada en Cloudinary o la del FileSystem
	const updatedProducts = products.map((product) => {
		product.images = product.images.map((img) => {
			return img.includes('https')
				? img
				: `${process.env.HOST_NAME}products/${img}`;
		});

		return product;
	});

	return JSON.parse(JSON.stringify(updatedProducts));
};
