import AuthLayout from '../../components/AuthLayout';
import { emailRegex } from '../../lib/constants';
import styles from '../../styles/authForm.module.css';
import type { NextPageWithLayout } from '../_app';

const ForgotPassword: NextPageWithLayout = () => {
	return (
		<form className={styles.authForm}>
			<h2 className={styles.authForm__heading}>Reset Password</h2>

			<div>
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					name='email'
					id='email'
					placeholder='Email ID'
					pattern={emailRegex.source}
				/>
			</div>

			<div>
				<button type='submit'>Get reset link</button>
			</div>
		</form>
	);
};

ForgotPassword.getLayout = page => (
	<AuthLayout headerTitle='Reset Password'>{page}</AuthLayout>
);

export default ForgotPassword;
