import Link from 'next/link';
import AuthLayout from '../../components/AuthLayout';
import { emailRegex } from '../../lib/constants';
import styles from '../../styles/authForm.module.css';
import type { NextPageWithLayout } from '../_app';

const Login: NextPageWithLayout = () => {
	return (
		<form className={styles.authForm}>
			<div className='mb-4 text-sm'>
				<h2 className={styles.authForm__heading} style={{ marginBottom: 0 }}>
					Login
				</h2>

				<div>
					Don&lsquo;t have an account?{' '}
					<Link href='register'>
						<a className='text-blue-500'>Create account</a>
					</Link>
				</div>
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
					autoComplete='current-password'
					placeholder='Password'
					minLength={8}
				/>
			</div>

			<div>
				<button type='submit'>Login</button>

				<div className='text-center'>
					<Link href='forgot-password'>
						<a className='text-blue-500'>Forgot Password?</a>
					</Link>
				</div>
			</div>
		</form>
	);
};

Login.getLayout = page => <AuthLayout headerTitle='Login'>{page}</AuthLayout>;

export default Login;
