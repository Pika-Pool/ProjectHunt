import Link from 'next/link';
import AuthLayout from '../../components/AuthLayout';
import { emailRegex } from '../../lib/constants';
import styles from '../../styles/authForm.module.css';
import type { NextPageWithLayout } from '../_app';

const Register: NextPageWithLayout = () => {
	return (
		<form className={styles.authForm}>
			<div className='mb-4 text-sm'>
				<h2 className={styles.authForm__heading} style={{ marginBottom: 0 }}>
					Register
				</h2>

				<div>
					Already have an account?{' '}
					<Link href='login'>
						<a className='text-blue-500'>Login here.</a>
					</Link>
				</div>
			</div>

			<div>
				<label htmlFor='username'>Username</label>
				<input
					type='username'
					name='username'
					id='username'
					placeholder='Username'
					required
					minLength={3}
					pattern={/^\S$/.source}
				/>
			</div>

			<div>
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					name='email'
					id='email'
					placeholder='Email ID'
					required
					pattern={emailRegex.source}
				/>
			</div>

			<div>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					name='password'
					id='password'
					autoComplete='new-password'
					placeholder='Password'
					required
				/>
			</div>

			<div>
				<label htmlFor='password2'>Retype Password</label>
				<input
					type='password2'
					name='password2'
					id='password2'
					autoComplete='new-password'
					placeholder='Retype Password'
					required
				/>
			</div>

			<div>
				<button type='submit'>Register</button>
			</div>
		</form>
	);
};

Register.getLayout = page => (
	<AuthLayout headerTitle='Register'>{page}</AuthLayout>
);

export default Register;
