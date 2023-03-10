import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { BiCart, BiSearchAlt2 } from 'react-icons/bi';

import { UiContext } from '../../context';
import { InputSearch } from './InputSearch';
import { CartBtn } from './CartBtn';

export const Navbar = () => {
	const router = useRouter();
	const { isInputSearchOpen, openMenu, openInputSearch } = useContext(UiContext);

	return (
		<div className='shadow mb-8'>
			<nav className='container flex items-center justify-between py-5'>
				<Link href='/' className='flex items-center text-2xl font-bold'>
					<h6>Teslo</h6>
					<p className='ml-1'>| Shop</p>
				</Link>

				<div className='hidden lg:flex items-center gap-4 '>
					<Link
						href={`/category/men`}
						className={`btn hover:bg-slate-800 hover:text-white shadow ${
							router.asPath === `/category/men`
								? 'bg-slate-700 text-white'
								: 'text-slate-800'
						}`}
						data-mdb-ripple='true'
						data-mdb-ripple-color='light'
					>
						Hombres
					</Link>

					<Link
						href={`/category/women`}
						className={`btn hover:bg-slate-800 hover:text-white shadow ${
							router.asPath === `/category/women`
								? 'bg-slate-700 text-white'
								: 'text-slate-800'
						}`}
						data-mdb-ripple='true'
						data-mdb-ripple-color='light'
					>
						Mujeres
					</Link>

					<Link
						href={`/category/kids`}
						className={`btn hover:bg-slate-800 hover:text-white shadow ${
							router.asPath === `/category/kids`
								? 'bg-slate-700 text-white'
								: 'text-slate-800'
						}`}
						data-mdb-ripple='true'
						data-mdb-ripple-color='light'
					>
						Niños
					</Link>
				</div>

				<div className='flex items-center gap-4'>
					{/* Pantallas pequeñas */}
					<button
						type='button'
						className='sm:hidden hover:bg-slate-200 rounded-full p-1 transition-colors'
						data-mdb-ripple='true'
						data-mdb-ripple-color='dark'
						onClick={openMenu}
					>
						<BiSearchAlt2 className='text-2xl' />
					</button>

					{/* Pantallas grandes */}
					{isInputSearchOpen ? (
						<InputSearch icon='close' className='hidden sm:flex' />
					) : (
						<button
							type='button'
							className='hidden sm:flex hover:bg-slate-200 rounded-full p-1 transition-colors'
							data-mdb-ripple='true'
							data-mdb-ripple-color='dark'
							onClick={openInputSearch}
						>
							<BiSearchAlt2 className='text-2xl' />
						</button>
					)}

					<Link href={'/cart'}>
						<CartBtn />
					</Link>

					<button type='button' className='ml-2' onClick={openMenu}>
						Menú
					</button>
				</div>
			</nav>
		</div>
	);
};
