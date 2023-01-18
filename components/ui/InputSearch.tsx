import { useState, KeyboardEvent, FC, useContext } from 'react';
import { useRouter } from 'next/router';

import { BiSearch, BiX } from 'react-icons/bi';

import { UiContext } from '../../context/ui/';

interface Props {
	className?: string;
	icon?: 'search' | 'close';
	color?: 'light' | 'dark';
}

export const InputSearch: FC<Props> = ({ className, icon = 'close', color = 'dark' }) => {
	const router = useRouter();
	const { closeInputSearch, closeMenu } = useContext(UiContext);
	const [searchTerm, setSearchTerm] = useState('');

	// Redireciona con el término de búsqueda
	const navigate = () => {
		if (searchTerm.length !== 0) {
			// Reseteamos el searchTerm
			setSearchTerm('');
			closeInputSearch();
			closeMenu();

			router.push(`/search/${searchTerm}`);
		}
	};

	// Redireccionamiento con la tecla enter
	const onKeyDownEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			navigate();
		}
	};

	// Redireccionamiento con click en el icono search
	const onClickSearch = () => {
		navigate();
	};

	return (
		<div
			className={`flex justify-center border-b relative animate-fadeIn ${
				color === 'light' ? 'border-white' : 'border-slate-200'
			} ${className}`}
		>
			<input
				type='text'
				placeholder='Buscar...'
				autoFocus
				className={`w-full bg-transparent outline-none px-3 peer ${
					color === 'light'
						? 'text-white placeholder:text-slate-200'
						: 'text-slate-800 placeholder:text-slate-400'
				}`}
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				onKeyDown={onKeyDownEnter}
			/>

			{/* Seleccionar icono "lupa" ó "X"  */}
			{icon === 'search' ? (
				// Visible en SideMenu
				<BiSearch
					className={`text-2xl cursor-pointer ${
						color === 'light' ? 'text-white' : 'text-slate-800'
					}`}
					onClick={onClickSearch}
				/>
			) : (
				// Visible en Navbar
				<BiX
					className={`text-2xl cursor-pointer ${
						color === 'light' ? 'text-white' : 'text-slate-800'
					}`}
					onClick={closeInputSearch}
				/>
			)}

			{/* Animación del borde en el input */}
			<div
				className={`absolute top-full transition-all duration-300  w-0 h-0.5 peer-focus:w-full ${
					color === 'light' ? 'bg-slate-400' : 'bg-black'
				}`}
			></div>
		</div>
	);
};
