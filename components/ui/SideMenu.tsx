import { useContext, useState } from 'react';

import { FiX } from 'react-icons/fi';
import { UiContext } from '../../context/ui/';

export const SideMenu = () => {
	const { isOpenMenu, closeMenu } = useContext(UiContext);

	return (
		<div>
			<div
				className={`${
					!isOpenMenu && 'hidden'
				} bg-slate-300/20 backdrop-blur-sm fixed top-0 left-0 right-0 min-h-screen w-full z-10`}
				onClick={closeMenu}
			></div>

			<aside
				className={`${
					isOpenMenu ? 'w-80' : 'w-0'
				} bg-slate-600 min-h-screen fixed top-0 right-0 w-80 z-20 shadow-[-4px_-0px_8px_0px_rgba(0,0,0,0.9)] transition-all duration-300`}
			>
				<div className='text-white p-4'>
					<FiX className='cursor-pointer' onClick={closeMenu} />
				</div>
			</aside>
		</div>
	);
};
