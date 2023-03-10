import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

import { countries } from '../../utils/countries';

import { CartContext } from '../../context/cart/CartContext';

import { ContInputAnim, ContSelect } from '../ui';

type FormData = {
	firstName: string;
	lastName: string;
	address: string;
	address2: string;
	zip: string;
	city: string;
	country: string;
	phone: string;
};

const getAddresFromCookies = (): FormData => {
	return {
		firstName: Cookies.get('firstName') ?? '',
		lastName: Cookies.get('lastName') ?? '',
		address: Cookies.get('address') ?? '',
		address2: Cookies.get('address2') ?? '',
		zip: Cookies.get('zip') ?? '',
		city: Cookies.get('city') ?? '',
		country: Cookies.get('country') ?? '',
		phone: Cookies.get('phone') ?? ''
	};
};

export const FormAddress = () => {
	const router = useRouter();
	const { updateShippingAddress } = useContext(CartContext);
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>({
		defaultValues: getAddresFromCookies()
	});

	const onSubmitAddress = async (data: FormData) => {
		updateShippingAddress(data);
		router.push('/checkout/summary');
	};

	return (
		<form onSubmit={handleSubmit(onSubmitAddress)}>
			<div className='max-w-5xl grid md:grid-cols-2 gap-3 mx-auto'>
				<ContInputAnim label='Nombre' message={errors.firstName?.message}>
					<input
						type='text'
						placeholder=' '
						className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
						{...register('firstName', {
							required: 'Este campo es obligatorio'
						})}
					/>
				</ContInputAnim>

				<ContInputAnim label='Apellido' message={errors.lastName?.message}>
					<input
						type='text'
						placeholder=' '
						className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
						{...register('lastName', {
							required: 'Este campo es obligatorio'
						})}
					/>
				</ContInputAnim>

				<ContInputAnim label='Direcci??n' message={errors.address?.message}>
					<input
						type='text'
						placeholder=' '
						className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
						{...register('address', {
							required: 'Este campo es obligatorio'
						})}
					/>
				</ContInputAnim>

				<ContInputAnim label='Direcci??n 2'>
					<input
						type='text'
						placeholder=' '
						className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
						{...register('address2')}
					/>
				</ContInputAnim>

				<ContInputAnim label='C??digo Postal' message={errors.zip?.message}>
					<input
						type='text'
						placeholder=' '
						className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
						{...register('zip', {
							required: 'Este campo es obligatorio'
						})}
					/>
				</ContInputAnim>

				<ContInputAnim label='Ciudad' message={errors.city?.message}>
					<input
						type='text'
						placeholder=' '
						className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
						{...register('city', {
							required: 'Este campo es obligatorio'
						})}
					/>
				</ContInputAnim>

				<ContSelect message={errors.country?.message}>
					<select
						className='outline-none bg-transparent w-full mt-4 py-2 mb-1 mx-8 peer'
						{...register('country', {
							required: 'Este campo es obligatorio'
						})}
					>
						<option value=''> - Selecciona un Pais - </option>
						{countries.map((country) => (
							<option key={country.code} value={country.code}>
								{country.name}
							</option>
						))}
					</select>
				</ContSelect>

				<ContInputAnim label='T??lefono'>
					<input
						type='text'
						placeholder=' '
						className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
						{...register('phone')}
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
