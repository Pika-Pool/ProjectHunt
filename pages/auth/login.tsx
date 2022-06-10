import Link from 'next/link';
import type { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import AuthLayout from '../../components/AuthLayout';
import CTAButton from '../../components/CTAButton';
import { useAuthUser } from '../../contexts/AuthUser';
import useLoadingToast from '../../hooks/useLoadingToast';
import useRedirectOnLoggedIn from '../../hooks/useRedirectOnLoggedIn';
import { defaultAuthRequest } from '../../lib/authRequests';
import { usernameRegex } from '../../lib/constants';
import styles from '../../styles/authForm.module.css';
import type { NextPageWithLayout } from '../_app';

const Login: NextPageWithLayout = () => {
	const { setUser } = useAuthUser();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);

		const data: any = {};
		formData.forEach((value, key) => (data[key] = value));
		return defaultAuthRequest('/accounts/login/', data);
	};

	const { isLoading, mutate } = useMutation(handleSubmit, {
		onError(err) {
			toast.error('Invalid Username or Password. Try again');
			console.error(err);
		},
		onSuccess(data) {
			toast.success('Successfully logged in');
			setUser({ key: data.key });
			console.log({ data });
		},
	});

	useLoadingToast({ isLoading });
	const { from } = useRedirectOnLoggedIn();

	return (
		<form className={styles.authForm} onSubmit={mutate}>
			<div className='mb-4 text-sm'>
				<h2 className={styles.authForm__heading} style={{ marginBottom: 0 }}>
					Login
				</h2>

				<div>
					Don&lsquo;t have an account?{' '}
					<Link href={{ pathname: '/auth/register', query: { from } }}>
						<a className='text-blue-500'>Create account</a>
					</Link>
				</div>
			</div>

			<div>
				<label className={styles.authForm__label} htmlFor='username'>
					Username
				</label>
				<input
					className={styles.authForm__input}
					type='username'
					name='username'
					id='username'
					placeholder='Username'
					pattern={usernameRegex.source}
					required
				/>
			</div>

			<div>
				<label className={styles.authForm__label} htmlFor='password'>
					Password
				</label>
				<input
					className={styles.authForm__input}
					type='password'
					name='password'
					id='password'
					autoComplete='current-password'
					placeholder='Password'
					minLength={8}
					required
				/>
			</div>

			<div>
				<CTAButton text='Login' type='submit' isLoading={isLoading} />

				<div className='text-center'>
					<Link href='/auth/forgot-password'>
						<a className='text-blue-500'>Forgot Password?</a>
					</Link>
				</div>
			</div>
		</form>
	);
};

Login.getLayout = page => <AuthLayout headerTitle='Login'>{page}</AuthLayout>;

export default Login;
