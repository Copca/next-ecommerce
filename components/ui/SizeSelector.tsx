import { ISize } from '../../interfaces/product';
import { FC } from 'react';

interface Props {
	selectedSize?: ISize;
	sizes: ISize[];
	// Métodos
	onSelectedSize: (size: ISize) => void;
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes, onSelectedSize }) => {
	return (
		<div className='flex justify-start space-x-4'>
			{sizes.map((size) => (
				<button
					key={size}
					className={`hover:bg-slate-200 p-1 rounded w-16
						${selectedSize === size ? 'bg-slate-800 text-white px-2 py-0.5 rounded' : 'font-bold'}`}
					onClick={() => onSelectedSize(size)}
				>
					{size}
				</button>
			))}
		</div>
	);
};
