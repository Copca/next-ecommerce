/**
 * Restringimos la entrada a la página con SSR (getServerSideProps), si esta logeado
 */

import { SyntheticEvent, useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { unstable_getServerSession } from 'next-auth';
import { signIn, getProviders } from 'next-auth/react';
import { authOptions } from '../api/auth/[...nextauth]';

import { AiFillGithub } from 'react-icons/ai';

import { validation } from '../../utils';

import { AuthLayout } from '../../components/layouts';

type FormData = {
	email: string;
	password: string;
};

const LoginPage: NextPage = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>();
	const [isShowError, setIsShowError] = useState(false);
	const [providers, setProviders] = useState<any>({});

	useEffect(() => {
		const obtnerProvider = async () => {
			const prov = await getProviders();
			// console.log(prov);
			setProviders(prov);
		};

		obtnerProvider();
	}, []);

	const onLoginUser = async ({ email, password }: FormData) => {
		setIsShowError(false);

		//  Se crea la session y redirecciona en el SSR a '/' o a la última página visitada '?/category/men'
		await signIn('credentials', { email, password });
	};

	return (
		<AuthLayout title={'Ingresar'}>
			<div className='container'>
				<div className='max-w-lg mx-auto bg-white border shadow rounded-md p-8'>
					<h1 className='text-2xl font-bold mb-8'>Iniciar Sesión</h1>

					{isShowError && (
						<div className='bg-red-500 text-white text-center text-sm rounded-full py-1.5 mb-8 w-4/5 mx-auto'>
							No encontramos ese usuario/contraseña
						</div>
					)}

					<form onSubmit={handleSubmit(onLoginUser)} noValidate>
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
							Ingresar
						</button>

						<div className='flex justify-end'>
							<Link
								href={`${
									router.query.p
										? `/auth/register?p=${router.query.p}`
										: '/auth/register'
								}`}
								className='underline text-slate-500 hover:text-slate-700 transition-colors'
							>
								¿No tienes cuenta?
							</Link>
						</div>

						<hr className='my-4' />

						<div className='flex flex-col'>
							{Object.values(providers).map((provider: any) => {
								if (provider.id === 'credentials') return null;

								return (
									<button
										type='button'
										key={provider.id}
										className='btn text-gray-800 hover:bg-gray-100 border border-gray-500 gap-2 w-full mt-8'
										data-mdb-ripple='true'
										data-mdb-ripple-color='dark'
										onClick={() => signIn(provider.id)}
									>
										{provider.id === 'github' && (
											<AiFillGithub className='text-lg' />
										)}
										{provider.name}
									</button>
								);
							})}
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

export default LoginPage;
