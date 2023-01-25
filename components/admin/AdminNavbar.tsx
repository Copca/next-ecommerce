import { useContext } from 'react';
import Link from 'next/link';

import { UiContext } from '../../context/ui/UiContext';

export const AdminNavbar = () => {
	const { openMenu } = useContext(UiContext);

	return (
		<div className='shadow mb-8 bg-slate-200'>
			<nav className='container flex items-center justify-between py-5'>
				<Link href='/' className='flex items-center font-bold'>
					<h6>Teslo</h6>
					<p className='ml-1'>| Shop</p>
				</Link>

				<button type='button' className='ml-2' onClick={openMenu}>
					Menú
				</button>
			</nav>
		</div>
	);
};
