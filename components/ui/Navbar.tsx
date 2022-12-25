import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { BiCart, BiSearchAlt2 } from 'react-icons/bi';

import { UiContext } from '../../context/ui';

export const Navbar = () => {
	const router = useRouter();
	const { openMenu } = useContext(UiContext);

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
					>
						Niños
					</Link>
				</div>

				<div className='flex items-center gap-4 offcanvas'>
					<button
						type='button'
						className='flex hover:bg-slate-200 rounded-full p-1 transition-colors'
					>
						<BiSearchAlt2 className='text-2xl' />
					</button>

					<Link href={'/cart'}>
						<div className='relative w-fit'>
							<div className='absolute inline-block translate-x-1/2 -translate-y-1/2 text-xs text-center font-bold bg-blue-500 text-white rounded-full p-1.5 z-auto min-w-full'>
								+9
							</div>

							<BiCart className='text-2xl' />
						</div>
					</Link>

					<button type='button' className='ml-2' onClick={openMenu}>
						Menú
					</button>
				</div>
			</nav>
		</div>
	);
};
