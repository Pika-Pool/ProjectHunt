import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import type { InputHTMLAttributes } from 'react';
import React, { useEffect } from 'react';
import {
	useForm,
	type SubmitHandler,
	type UseFormProps,
} from 'react-hook-form';
import { useMutation } from 'react-query';
import CTAButton from '../components/CTAButton';
import TagsSelect from '../components/TagsSelect';
import { useAuthUser } from '../contexts/AuthUser';
import useLoadingToast from '../hooks/useLoadingToast';
import useLocalStorage from '../hooks/useLocalStorage';
import { projectSubmitFormDraftStorageKey } from '../lib/constants';
import { createNewProjectReq } from '../lib/graphql/requests/mutation';
import styles from '../styles/authForm.module.css';

interface FormValues {
	name: string;
	subtitle: string;
	description: string;
	tags: string[];
}

const Submit: NextPage = () => {
	const router = useRouter();
	const { isLoggedIn: isUserLoggedIn } = useAuthUser();

	const [formDraft, setFormDraft] = useLocalStorage<
		UseFormProps<FormValues>['defaultValues']
	>(projectSubmitFormDraftStorageKey, {});

	const { register, handleSubmit, control, watch } = useForm<FormValues>({
		defaultValues: formDraft,
		shouldUseNativeValidation: true,
	});

	// save form data to localStorage
	useEffect(() => {
		const { unsubscribe } = watch(formData => setFormDraft(formData));
		return () => unsubscribe();
	}, [setFormDraft, watch]);

	// mutation query to create project
	const { mutate, isLoading } = useMutation(createNewProjectReq, {
		onSuccess(data) {
			setFormDraft({});
			router.push(`/project/${data.projectId}`);
		},
	});
	useLoadingToast({ isLoading, toastMsg: 'Registering your project...' });

	// redirect to /login if user is not logged in
	// form data is saved in localStorage
	const onFormSubmit: SubmitHandler<FormValues> = data => {
		if (!isUserLoggedIn) router.push('/auth/login');
		else mutate(data);
	};

	return (
		<fieldset
			disabled={isLoading}
			className='flex justify-center items-center w-full'
		>
			<form
				className='w-full max-w-4xl mt-10 mx-5 p-5 flex flex-col gap-4 border-2 border-primary rounded'
				onSubmit={handleSubmit(onFormSubmit)}
			>
				<h2 className={styles.authForm__heading}>Submit a Project</h2>

				<div>
					<label htmlFor='name' className={styles.authForm__label}>
						Project Title
					</label>
					<SubmitPageInput
						type='text'
						id='name'
						{...register('name', {
							required: true,
							minLength: 3,
							maxLength: 50,
						})}
					/>
				</div>

				<div>
					<label htmlFor='subtitle' className={styles.authForm__label}>
						Short Description
					</label>
					<SubmitPageInput
						type='text'
						id='subtitle'
						{...register('subtitle', {
							required: true,
							minLength: 3,
							maxLength: 50,
						})}
					/>
				</div>

				<div>
					<label htmlFor='description' className={styles.authForm__label}>
						Description
					</label>
					<textarea
						id='description'
						rows={7}
						className='block w-full border-2 rounded px-3 py-1'
						{...register('description', {
							required: true,
							minLength: 3,
						})}
					></textarea>
				</div>

				<div>
					<TagsSelect control={control} />
				</div>

				<div>
					<CTAButton text='Submit' type='submit' isLoading={isLoading} />
				</div>
			</form>
		</fieldset>
	);
};

export default Submit;

const SubmitPageInput = React.forwardRef<
	HTMLInputElement,
	InputHTMLAttributes<HTMLInputElement>
>(function SubmitPageInput(inputProps, ref) {
	return (
		<input
			{...inputProps}
			ref={ref}
			className={`block w-full border-2 rounded px-3 py-1 ${inputProps.className}`}
		/>
	);
});
