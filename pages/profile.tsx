import type { NextPage } from 'next';
import Link from 'next/link';
import { BsEnvelope, BsPersonCircle } from 'react-icons/bs';
import CTAButton from '../components/CTAButton';
import { useAuthUser } from '../contexts/AuthUser';
import styles from '../styles/authForm.module.css';

const Profile: NextPage = () => {
	const { user, isLoggedIn } = useAuthUser();

	if (!isLoggedIn)
		return (
			<div className='flex justify-center items-center'>
				<div
					className={styles.authForm}
					style={{ width: '100%', maxWidth: '42rem' }}
				>
					<h2 className={styles.authForm__heading}>
						Login to see your Profile
					</h2>

					<Link href='/auth/login'>
						<CTAButton className='rounded-md' text='Login' />
					</Link>
					<Link href='/auth/register'>
						<CTAButton className='rounded-md' text='Register' />
					</Link>
				</div>
			</div>
		);

	return (
		<div className='flex flex-col justify-center items-center px-5'>
			<div className='w-full max-w-3xl'>
				<div className='p-5 shadow-md flex flex-col gap-5 w-full'>
					<div className='flex justify-start items-center gap-7'>
						<BsPersonCircle size='1.5em' opacity={0.7} />
						<div>
							<strong className='block'>{user.username}</strong>
							Username
						</div>
					</div>

					<div className='flex justify-start items-center gap-7'>
						<BsEnvelope size='1.5em' opacity={0.7} />
						<div>
							<strong className='block'>{user.email}</strong>
							Email
						</div>
					</div>
				</div>

				<div className='mt-5 flex flex-col gap-2'>
					<Link href='/profile/edit'>
						<button className='uppercase rounded border-2 border-primary text-primary w-full py-1'>
							Edit Profile
						</button>
					</Link>

					<Link href='/profile/edit'>
						<button className='uppercase rounded border-2 border-primary bg-primary text-white w-full py-1'>
							Log out
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Profile;
