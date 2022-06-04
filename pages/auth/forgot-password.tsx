import type { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import AuthLayout from '../../components/AuthLayout';
import CTAButton from '../../components/CTAButton';
import useLoadingToast from '../../hooks/useLoadingToast';
import useRedirectOnLoggedIn from '../../hooks/useRedirectOnLoggedIn';
import { defaultAuthRequest } from '../../lib/authRequests';
import styles from '../../styles/authForm.module.css';
import type { NextPageWithLayout } from '../_app';

const ForgotPassword: NextPageWithLayout = () => {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		return defaultAuthRequest('/accounts/password/reset/', formData);
	};

	const { isLoading, mutate } = useMutation(handleSubmit, {
		onError(err) {
			toast.error('Something went wrong. Please try again later');
			console.error('err', err);
		},
		onSuccess(data) {
			toast.success('Check your email for reset password');
			console.log({ data });
		},
	});

	useLoadingToast({ isLoading });
	useRedirectOnLoggedIn();

	return (
		<form className={styles.authForm} onSubmit={mutate}>
			<h2 className={styles.authForm__heading}>Reset Password</h2>

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
				<CTAButton text='Get Reset Link' type='submit' isLoading={isLoading} />
			</div>
		</form>
	);
};

ForgotPassword.getLayout = page => (
	<AuthLayout headerTitle='Reset Password'>{page}</AuthLayout>
);

export default ForgotPassword;
