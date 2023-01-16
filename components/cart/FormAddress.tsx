import { ContInputAnim, ContSelect } from '../ui';
import { countries } from '../../utils/countries';

export const FormAddress = () => {
	return (
		<form>
			<div className='max-w-5xl grid md:grid-cols-2 gap-3 mx-auto'>
				<ContInputAnim label='Nombre' message={''}>
					<input
						type='text'
						placeholder=' '
						className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
						// {...register('firstName', {
						// 	required: 'Este campo es obligatorio'
						// })}
					/>
				</ContInputAnim>

				<ContInputAnim label='Apellido'>
					<input
						type='text'
						placeholder=' '
						className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
						// {...register('lastName', {
						// 	required: 'Este campo es obligatorio'
						// })}
					/>
				</ContInputAnim>

				<ContInputAnim label='Dirección'>
					<input
						type='text'
						placeholder=' '
						className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
						// {...register('address', {
						// 	required: 'Este campo es obligatorio'
						// })}
					/>
				</ContInputAnim>

				<ContInputAnim label='Dirección 2'>
					<input
						type='text'
						placeholder=' '
						className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
						// {...register('address2')}
					/>
				</ContInputAnim>

				<ContInputAnim label='Código Postal'>
					<input
						type='text'
						placeholder=' '
						className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
						// {...register('zip', {
						// 	required: 'Este campo es obligatorio'
						// })}
					/>
				</ContInputAnim>

				<ContInputAnim label='Ciudad'>
					<input
						type='text'
						placeholder=' '
						className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
						// {...register('city', {
						// 	required: 'Este campo es obligatorio'
						// })}
					/>
				</ContInputAnim>

				<ContSelect>
					<select
						className='outline-none bg-transparent w-full mt-4 py-2 mb-1 mx-8 peer'
						// {...register('country', {
						// 	required: 'Este campo es obligatorio'
						// })}
					>
						<option value=''> - Selecciona un Pais - </option>
						{countries.map((country) => (
							<option key={country.code} value={country.code}>
								{country.name}
							</option>
						))}
					</select>
				</ContSelect>

				<ContInputAnim label='Télefono'>
					<input
						type='text'
						placeholder=' '
						className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
						// {...register('phone')}
					/>
				</ContInputAnim>
			</div>

			<div className='flex justify-center'>
				<button
					type='submit'
					className='btn bg-blue-500 hover:bg-blue-600 rounded-full mt-8'
				>
					Revisar Pedido
				</button>
			</div>
		</form>
	);
};
