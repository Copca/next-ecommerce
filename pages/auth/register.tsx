/**
 * Restringimos la entrada a la página con SSR (getServerSideProps), si esta logeado
 */
import { useContext } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { unstable_getServerSession } from 'next-auth/next';
import { signIn } from 'next-auth/react';
import { authOptions } from '../api/auth/[...nextauth]';

import { AiFillGithub } from 'react-icons/ai';

import { validation } from '../../utils';
import { AuthContext } from '../../context';

import { AuthLayout } from '../../components/layouts';

interface FormData {
	name: string;
	email: string;
	password: string;
}

const RegisterPage: NextPage = () => {
	const router = useRouter();
	const { responseMessage } = useContext(AuthContext);
	const { registerUser } = useContext(AuthContext);
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>();

	const onRegisterUser = async ({ name, email, password }: FormData) => {
		await registerUser(name, email, password);

		setTimeout(async () => {
			await signIn('credentials', { email, password });
		}, 2500);
	};

	return (
		<AuthLayout title={'Crear cuenta'}>
			<div className='container'>
				<div className='max-w-lg mx-auto bg-white border shadow rounded-md p-8'>
					<h1 className='text-2xl font-bold mb-8'>Crear cuenta</h1>

					{responseMessage.isShowMessage && (
						<div
							className={` text-white text-center text-sm rounded-full py-1.5 mb-8 w-4/5 mx-auto animate-fadeIn ${
								responseMessage.hasError ? 'bg-red-500' : 'bg-emerald-500'
							}`}
						>
							{responseMessage.message}
						</div>
					)}

					<form onSubmit={handleSubmit(onRegisterUser)} noValidate>
						<div className={`relative mb-4`}>
							<input
								type='text'
								placeholder=' '
								className='w-full border focus:border-sky-500 rounded-md outline-none py-2 px-3 peer'
								{...register('name', {
									required: 'Este campo es obligatorio'
								})}
							/>
							<label className='label-float'>Nombre</label>
							<p className='mt-1 ml-2 peer-invalid:visible text-pink-600 text-xs'>
								{errors.name && errors.name?.message}
							</p>
						</div>

						<div className={`relative mb-4`}>
							<input
								type='email'
								placeholder=' '
								className='w-full border focus:border-sky-500 rounded-md outline-none py-2 px-3 peer'
								{...register('email', {
									required: 'Este campo es obligatorio',
									validate: validation.isEmail
								})}
							/>
							<label className='label-float'>Email</label>
							<p className='mt-1 ml-2 peer-invalid:visible text-pink-600 text-xs'>
								{errors.email && errors.email?.message}
							</p>
						</div>

						<div className={`relative mb-4`}>
							<input
								type='password'
								placeholder=' '
								className='w-full border focus:border-sky-500 rounded-md outline-none py-2 px-3 peer'
								{...register('password', {
									required: 'Este campo es obligatorio',
									minLength: {
										value: 6,
										message: 'Mínimo 6 caracteres'
									}
								})}
							/>
							<label className='label-float'>Password</label>
							<p className='mt-1 ml-2 peer-invalid:visible text-pink-600 text-xs'>
								{errors.password && errors.password?.message}
							</p>
						</div>

						<button
							type='submit'
							className=' btn bg-sky-500 hover:bg-sky-600 w-full my-8'
							data-mdb-ripple='true'
							data-mdb-ripple-color='light'
						>
							Crear Cuenta
						</button>

						<div className='flex justify-end'>
							<Link
								href={`${
									router.query.p
										? `/auth/login?p=${router.query.p}`
										: '/auth/login'
								}`}
								className='underline text-slate-500 hover:text-slate-700 transition-colors'
							>
								Ya tengo una cuenta, iniciar sesión
							</Link>
						</div>

						<hr className='my-4' />

						<div className='flex justify-center'>
							<button
								type='button'
								className='btn text-gray-800 hover:bg-gray-100 border border-gray-500 gap-2 w-full mt-8'
								data-mdb-ripple='true'
								data-mdb-ripple-color='dark'
							>
								<AiFillGithub className='text-lg' /> GitHub
							</button>
						</div>
					</form>
				</div>
			</div>
		</AuthLayout>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
	const session = await unstable_getServerSession(req, res, authOptions);
	const { p = '/' } = query;

	// Si tenemos session redireccionamos a '/' o a la última página visitada '?/category/men'
	if (session) {
		return {
			redirect: {
				destination: `${p}`,
				permanent: false
			}
		};
	}

	return {
		props: {}
	};
};

export default RegisterPage;
