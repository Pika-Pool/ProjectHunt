import Link from 'next/link';
import { useState, type FormEvent } from 'react';
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

const Register: NextPageWithLayout = () => {
	const [password, setPassword] = useState('');
	const { setUser } = useAuthUser();

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		return defaultAuthRequest('/accounts/registration/', formData);
	};

	const { isLoading, mutate } = useMutation(handleFormSubmit, {
		onError(err) {
			toast.error('Invalid Username or Password. Try again');
			console.error(err);
		},
		onSuccess(data) {
			toast.success('Successfully registered and logged in');
			setUser({ key: data.key });
			console.log({ data });
		},
	});

	useLoadingToast({ isLoading });
	useRedirectOnLoggedIn();

	return (
		<form className={styles.authForm} onSubmit={mutate}>
			<div className='mb-4 text-sm'>
				<h2 className={styles.authForm__heading} style={{ marginBottom: 0 }}>
					Register
				</h2>

				<div>
					Already have an account?{' '}
					<Link href='/auth/login'>
						<a className='text-blue-500'>Login here.</a>
					</Link>
				</div>
			</div>

			<div>
				<label htmlFor='username'>Username</label>
				<input
					className={styles.authForm__input}
					type='username'
					name='username'
					id='username'
					placeholder='Username'
					required
					minLength={3}
					pattern={usernameRegex.source}
				/>
			</div>

			<div>
				<label className={styles.authForm__label} htmlFor='email'>
					Email
				</label>
				<input
					className={styles.authForm__input}
					type='email'
					name='email'
					id='email'
					placeholder='Email ID'
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
					autoComplete='new-password'
					placeholder='Password'
					required
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
			</div>

			<div>
				<label className={styles.authForm__label} htmlFor='password2'>
					Retype Password
				</label>
				<input
					className={styles.authForm__input}
					type='password2'
					name='password2'
					id='password2'
					autoComplete='new-password'
					placeholder='Retype Password'
					required
					pattern={password}
				/>
			</div>

			<div>
				<CTAButton text='Register' type='submit' isLoading={isLoading} />
			</div>
		</form>
	);
};

Register.getLayout = page => (
	<AuthLayout headerTitle='Register'>{page}</AuthLayout>
);

export default Register;
