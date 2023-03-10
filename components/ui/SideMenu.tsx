import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { BiExit, BiUserCircle } from 'react-icons/bi';
import { FiX } from 'react-icons/fi';
import { TiTicket } from 'react-icons/ti';
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai';
import { BiLogIn } from 'react-icons/bi';
import { FaChild, FaUsers } from 'react-icons/fa';
import { MdOutlineDashboard } from 'react-icons/md';
import { GiClothes } from 'react-icons/gi';

import { AuthContext, UiContext } from '../../context';

import { InputSearch } from './InputSearch';

export const SideMenu = () => {
	const router = useRouter();
	const { isLoggedIn, user, logout } = useContext(AuthContext);
	const { isOpenMenu, closeMenu } = useContext(UiContext);

	const navigateTo = (url: string) => {
		closeMenu();
		router.push(url);
	};

	return (
		<div>
			<div
				className={`${
					isOpenMenu
						? 'bg-slate-300/20 backdrop-blur-sm fixed top-0 left-0 right-0 min-h-screen w-full z-20'
						: 'hidden'
				}`}
				onClick={closeMenu}
			></div>

			<aside
				className={`bg-slate-600 min-h-screen fixed top-0 right-0 z-20 shadow-[-4px_-0px_8px_0px_rgba(0,0,0,0.9)] transition-all duration-300 ${
					isOpenMenu ? 'w-80' : 'w-0'
				}`}
			>
				<div className='text-white p-4'>
					<FiX className='cursor-pointer' onClick={closeMenu} />
				</div>

				<div className='mt-4 p-8'>
					<InputSearch icon='search' color='light' />
				</div>

				<nav className='text-white p-8'>
					<ul className='space-y-6'>
						{isLoggedIn && (
							<>
								<li className='flex items-center gap-2 hover:text-slate-300 transition-colors'>
									<BiUserCircle className='text-2xl' />
									Perfil
								</li>

								<li
									className='flex items-center gap-2 hover:text-slate-300 transition-colors cursor-pointer'
									onClick={() => navigateTo('/orders/history')}
								>
									<TiTicket className='text-2xl' />
									Mis ordenes
								</li>
							</>
						)}

						{/* Solo visible en pantallas chicas */}
						<ul className='space-y-6 lg:hidden'>
							<li
								className='flex items-center gap-2 hover:text-slate-300 transition-colors cursor-pointer'
								onClick={() => navigateTo('/category/men')}
							>
								<AiOutlineMan className='text-2xl' />
								Hombres
							</li>

							<li
								className='flex items-center gap-2 hover:text-slate-300 transition-colors cursor-pointer'
								onClick={() => navigateTo('/category/women')}
							>
								<AiOutlineWoman className='text-2xl' />
								Mujeres
							</li>

							<li
								className='flex items-center gap-2 hover:text-slate-300 transition-colors cursor-pointer'
								onClick={() => navigateTo('/category/kids')}
							>
								<FaChild className='text-2xl' />
								Ni??os
							</li>
						</ul>

						{isLoggedIn ? (
							<button
								className='flex items-center gap-2 hover:text-slate-300 transition-colors'
								onClick={logout}
							>
								<BiExit className='text-2xl' />
								Salir
							</button>
						) : (
							<button
								className='flex items-center gap-2 hover:text-slate-300 transition-colors'
								onClick={() =>
									navigateTo(`/auth/login?p=${router.asPath}`)
								}
							>
								<BiLogIn className='text-2xl' />
								Login
							</button>
						)}
					</ul>

					{/* Admin Panel */}
					{user?.role === 'admin' && (
						<ul className='space-y-4 border-t border-t-slate-400 mt-8'>
							<h6 className='text-xl mt-4'>Admin Panel</h6>

							<li
								className='flex items-center gap-2 hover:text-slate-300 transition-colors cursor-pointer'
								onClick={() => navigateTo('/admin')}
							>
								<MdOutlineDashboard className='text-2xl' />
								Dashboard
							</li>

							<li
								// href='/admin/products'
								className='flex items-center gap-2 hover:text-slate-300 transition-colors cursor-pointer'
								onClick={() => navigateTo('/admin/products')}
							>
								<GiClothes className='text-2xl' />
								Productos
							</li>

							<li
								className='flex items-center gap-2 hover:text-slate-300 transition-colors cursor-pointer'
								onClick={() => navigateTo('/admin/orders')}
							>
								<TiTicket className='text-2xl' />
								Ordenes
							</li>

							<li
								className='flex items-center gap-2 hover:text-slate-300 transition-colors cursor-pointer'
								onClick={() => navigateTo('/admin/users')}
							>
								<FaUsers className='text-2xl' />
								Usuarios
							</li>
						</ul>
					)}
				</nav>
			</aside>
		</div>
	);
};
