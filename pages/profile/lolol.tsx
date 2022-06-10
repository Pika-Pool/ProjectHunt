import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsEnvelope, BsPersonCircle } from 'react-icons/bs';
import { useQuery } from 'react-query';
import CTAButton from '../../components/CTAButton';
import LoadingOrComponent from '../../components/LoadingOrComponent';
import ProjectList from '../../components/ProjectList';
import UserAvatar from '../../components/UserAvatar';
import { useAuthUser } from '../../contexts/AuthUser';
import useLoadingToast from '../../hooks/useLoadingToast';
import { getProjectsByUser } from '../../lib/graphql/requests/query';
import styles from '../../styles/authForm.module.css';

const Profile: NextPage = () => {
	const { user, isLoggedIn, logout } = useAuthUser();
	const router = useRouter();
	const { userId: userIdFromQuery } = router.query;

	const [isLoggingOutLoading, setIsLoggingOutLoading] = useState(false);
	const onLogout = () => {
		setIsLoggingOutLoading(true);
		logout().catch(() =>
			toast.error(
				'Something went wrong. Could not logout user. Try again later',
			),
		);
	};
	useLoadingToast({ isLoading: isLoggingOutLoading, toastMsg: 'Logging out' });

	const { data: projects, isLoading: isProjectsLoading } = useQuery(
		'getProjectsByUser',
		() => getProjectsByUser(userIdFromQuery?.toString()),
		{
			enabled: !!userIdFromQuery,
			onSuccess(data) {
				if (!data) toast.error("Could not fetch the user's projects");
			},
			onError(err) {
				toast.error("Could not fetch the user's projects");
				console.error(err);
			},
		},
	);
	useLoadingToast({
		isLoading: isProjectsLoading,
		toastMsg: "Fetching the user's projects",
	});

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

					<CTAButton
						onClick={() => router.push('/auth/login')}
						className='rounded-md'
						text='Login'
						role='link'
					/>
					<CTAButton
						onClick={() =>
							router.push({
								pathname: '/auth/register',
								query: { from: '/profile' },
							})
						}
						className='rounded-md'
						text='Register'
						role='link'
					/>
				</div>
			</div>
		);

	return (
		<div className='flex flex-col justify-center items-center px-5'>
			<div className='w-full max-w-3xl'>
				<div className='p-5 shadow-md flex flex-col gap-5 w-full'>
					<div>
						<UserAvatar
							avatar={user.avatar}
							username={user.username}
							size='5rem'
						/>
					</div>

					<div className='flex justify-start items-center gap-7'>
						<BsPersonCircle size='1.5em' opacity={0.7} />
						<div>
							<strong className='block'>Username</strong>
							{user.username}
						</div>
					</div>

					<div className='flex justify-start items-center gap-7'>
						<BsEnvelope size='1.5em' opacity={0.7} />
						<div>
							<strong className='block'>Email ID</strong>
							{user.email}
						</div>
					</div>

					<div className='mt-5 flex flex-col gap-2'>
						<button
							onClick={() =>
								router.push({
									pathname: '/profile/edit',
								})
							}
							className='uppercase rounded border-2 border-primary text-primary w-full py-1 disabled:opacity-75'
							role='link'
							disabled={isLoggingOutLoading}
						>
							Edit Profile
						</button>

						<button
							onClick={onLogout}
							className='uppercase rounded border-2 border-primary bg-primary text-white w-full py-1 disabled:opacity-75'
							disabled={isLoggingOutLoading}
						>
							Log Out
						</button>
					</div>
				</div>

				<LoadingOrComponent isLoading={isProjectsLoading}>
					<div className='p-5 shadow-md w-full mt-3'>
						<ProjectList projects={projects || []} />
					</div>
				</LoadingOrComponent>
			</div>
		</div>
	);
};

export default Profile;
