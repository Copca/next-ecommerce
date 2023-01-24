export interface IProduct {
	_id: string;
	description: string;
	gender: 'men' | 'women' | 'kid' | 'unisex';
	images: string[];
	inStock: number;
	price: number;
	sizes: ISize[];
	slug: string;
	tags: string[];
	title: string;
	type: ITypes;

	// Campos creados por MongoDB
	createdAt: string;
	updatedAt: string;
}

export type ISize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type ITypes = 'shirts' | 'pants' | 'hoodies' | 'hats';
