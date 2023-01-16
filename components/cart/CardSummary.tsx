import Link from 'next/link';

export const CardSummary = () => {
	return (
		<>
			<h2 className='text-xl'>3 Productos</h2>
			<hr className='mb-8' />

			<div className='flex justify-between mb-2'>
				<h6 className='text-lg font-bold'>Dirección de entrega</h6>

				<Link href={'#'} className='underline'>
					Editar
				</Link>
			</div>

			<p>Ernesto Copca</p>
			<p>Cerrada 27 No.39</p>
			<p>CDMX</p>
			<p>01430</p>
			<p>México</p>
			<p>5539394870</p>

			<hr />

			<div className='flex justify-end mt-8'>
				<Link href={'#'} className='underline'>
					Editar
				</Link>
			</div>

			<div className='flex justify-between mt-2'>
				<p>No. Productos</p>
				<p>2 Productos</p>
			</div>

			<div className='flex justify-between'>
				<p>Subtotal</p>
				<p>$ 100</p>
			</div>

			<div className='flex justify-between'>
				<p>Impuestos 15%</p>
				<p>$15</p>
			</div>

			<div className='flex justify-between text-lg font-bold mt-3 mb-8'>
				<p>Total:</p>
				<p>$ 115</p>
			</div>
		</>
	);
};
