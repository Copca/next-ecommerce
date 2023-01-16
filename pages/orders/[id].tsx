import { ShopLayout } from '../../components/layout';
import { Chip } from '../../components/ui';
import { CartList, OrderSummary } from '../../components/cart';

const OrderPage = () => {
	return (
		<ShopLayout title={'Resumen de orden'} pageDescription={'Resumen de la orden'}>
			<div className='container animate-fadeIn'>
				<h1 className='text-2xl mb-8'>Orden: ABC123 </h1>

				<Chip pagado={false} className='mb-4' />

				<div className='flex flex-col md:flex-row items-start gap-8'>
					<div className='w-full md:w-3/5'>
						<CartList />
					</div>

					<div className='w-full md:w-2/5'>
						<OrderSummary />
					</div>
				</div>
			</div>
		</ShopLayout>
	);
};

export default OrderPage;
