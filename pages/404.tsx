import { NextPage } from 'next';
import { ShopLayout } from '../components/layouts';

const Error404: NextPage = () => {
	return (
		<ShopLayout
			title={'Page not Found'}
			pageDescription={'No hay nada que mostrar aquí'}
		>
			<div className='container flex-1 flex justify-center items-center'>
				<h1 className='text-5xl'>
					404 |
					<span className='ml-2 text-xl align-middle'>
						Página no encontrada
					</span>
				</h1>
			</div>
		</ShopLayout>
	);
};

export default Error404;
