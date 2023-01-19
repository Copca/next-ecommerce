import { FC } from 'react';

import { ISize } from '../../interfaces';

interface Props {
	sizes: ISize[];
	selectedSize?: ISize;
	// Métodos
	selectSize: (size: ISize) => void;
}

export const SizeSelector: FC<Props> = ({ sizes, selectedSize, selectSize }) => {
	return (
		<div className='flex justify-start space-x-4'>
			{sizes.map((size) => (
				<button
					key={size}
					className={`hover:bg-slate-200 p-1 rounded w-16
						${size === selectedSize ? 'bg-slate-800 text-white px-2 py-0.5 rounded' : 'font-bold'}`}
					onClick={() => selectSize(size)}
				>
					{size}
				</button>
			))}
		</div>
	);
};
