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
import {
	getProjectsByUser,
	getUserProfile,
} from '../../lib/graphql/requests/query';
import styles from '../../styles/authForm.module.css';
import type { TProject } from '../home';

const Profile: NextPage = () => {
	const { user, isLoggedIn, logout } = useAuthUser();

	const router = useRouter();
	const { userId: userIdParamArr } = router.query;
	const userIdFromParam = userIdParamArr?.[0];
	console.log(userIdFromParam);

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

	const { data: userFromParam, isLoading: isUserFromParamLoading } = useQuery(
		['/profile/', userIdFromParam],
		() => getUserProfile(userIdFromParam),
		{
			enabled: !!userIdFromParam,
			onSuccess(data) {
				if (!data) toast.error('This profile might not exists');
			},
			onError(err) {
				toast.error('Something went wrong. Could not fetch the profile');
				console.error(err);
			},
		},
	);
	useLoadingToast({
		isLoading: isUserFromParamLoading,
		toastMsg: "Fetching the user's profile",
	});

	const {
		data: projects,
		isLoading: isProjectsLoading,
		isFetched: isProjectFetched,
	} = useQuery(
		['getProjectsByUser', userIdFromParam ?? user.id],
		() => getProjectsByUser(userIdFromParam),
		{
			enabled: userIdFromParam ? !!userFromParam : isLoggedIn,
			onSuccess(data) {
				if (!data) toast.error("Could not fetch the user's projects");
			},
			onError(err) {
				toast.error("Could not fetch the user's projects");
				console.error(err);
			},
			select(projects) {
				if (!projects) return projects;

				return (
					projects
						.filter((p): p is TProject => Boolean(p))
						// convert postedAt from string to date
						.map(project => ({
							...project,
							postedAt: new Date(project?.postedAt),
						}))
						// sort by date
						.sort((p1, p2) => (p1.postedAt > p2.postedAt ? -1 : 1))
				);
			},
		},
	);
	useLoadingToast({
		isLoading: isProjectsLoading,
		toastMsg: "Fetching the user's projects",
	});

	if (!isLoggedIn && !userIdFromParam)
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
				<LoadingOrComponent
					isLoading={isUserFromParamLoading}
					shouldShowSpinner={false}
				>
					<div className='p-5 shadow-md flex flex-col gap-5 w-full'>
						<div>
							<UserAvatar
								avatar={userFromParam?.avatar ?? user.avatar}
								username={userFromParam?.username ?? user.username}
								size='5rem'
							/>
						</div>

						<div className='flex justify-start items-center gap-7'>
							<BsPersonCircle size='1.5em' opacity={0.7} />
							<div>
								<strong className='block'>Username</strong>
								{userFromParam?.username ?? user.username}
							</div>
						</div>

						<div className='flex justify-start items-center gap-7'>
							<BsEnvelope size='1.5em' opacity={0.7} />
							<div>
								<strong className='block'>Email ID</strong>
								{userFromParam?.email ?? user.email}
							</div>
						</div>

						{userFromParam ? null : (
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
						)}
					</div>
				</LoadingOrComponent>

				<LoadingOrComponent isLoading={isProjectsLoading || !isProjectFetched}>
					<div className='p-5 shadow-md w-full mt-3'>
						<h2 className='text-xl font-bold mb-5'>
							Projects by{' '}
							<span className='text-gray-700 text-lg font-normal italic'>
								{' '}
								- @{userFromParam?.username ?? user.username}
							</span>
						</h2>
						{projects?.length ? (
							<ProjectList projects={projects || []} />
						) : (
							'No projects yet'
						)}
					</div>
				</LoadingOrComponent>
			</div>
		</div>
	);
};

export default Profile;
