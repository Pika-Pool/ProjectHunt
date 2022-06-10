import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import CTAButton from '../../components/CTAButton';
import UserAvatar from '../../components/UserAvatar';
import { useAuthUser } from '../../contexts/AuthUser';
import fileListToObjectURL from '../../lib/fileListToObjectUrl';
import { editProfileReq } from '../../lib/graphql/requests/mutation';
import styles from '../../styles/authForm.module.css';

interface ProfileEditFormValues {
	avatars: FileList;
	username: string;
	email: string;
}

const ProfileEdit: NextPage = () => {
	const { user, setUser } = useAuthUser();
	const { handleSubmit, register, watch } = useForm<ProfileEditFormValues>({
		shouldUseNativeValidation: true,
		defaultValues: { ...user, avatars: undefined },
	});

	const router = useRouter();

	const { mutate, isLoading } = useMutation(editProfileReq, {
		onSuccess(data) {
			if (!data || data.error) {
				toast.error('Something went wrong. Could not update your profile');
				console.error(data);
				return;
			}

			setUser(prevUserData => ({ ...prevUserData, ...data.profile }));
			router.push('/profile');
		},
		onError(err) {
			toast.error('Something went wrong. Could not update your profile');
			console.error(err);
		},
	});

	return (
		<fieldset
			className='flex justify-center items-center w-full'
			disabled={isLoading}
		>
			<form
				className='w-full max-w-xl mt-10 mx-5 p-5 flex flex-col gap-4 border-2 border-primary rounded'
				onSubmit={handleSubmit(data => mutate(data))}
			>
				<h2 className={styles.authForm__heading}>Edit your profile</h2>

				<div>
					<div className='mb-2'>
						<UserAvatar
							size='5rem'
							avatar={
								fileListToObjectURL(watch('avatars')) || user.avatar || ''
							}
						/>
					</div>
					<label htmlFor='avatars' className={styles.authForm__label}>
						Avatar
					</label>
					<input
						className={styles.authForm__input}
						type='file'
						multiple={false}
						accept='image/*'
						id='avatars'
						{...register('avatars', {
							validate: {
								fileMustBeImage: v =>
									v.length < 1 ||
									/image\/.*/.test(v.item(0)!.type) ||
									'Please upload an image file only',
							},
						})}
					/>
				</div>

				<div>
					<label htmlFor='username' className={styles.authForm__label}>
						Username
					</label>
					<input
						className={styles.authForm__input}
						type='text'
						{...register('username', {
							required: true,
							minLength: 3,
							maxLength: 20,
						})}
					/>
				</div>

				<div>
					<label htmlFor='username' className={styles.authForm__label}>
						Email
					</label>
					<input
						className={styles.authForm__input}
						type='email'
						{...register('email', { required: true })}
					/>
				</div>

				<div>
					<CTAButton text='Update Profile' isLoading={isLoading} />
				</div>
			</form>
		</fieldset>
	);
};

export default ProfileEdit;
