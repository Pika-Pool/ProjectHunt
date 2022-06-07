import React, { type InputHTMLAttributes } from 'react';
import { useFormContext, type SubmitHandler } from 'react-hook-form';
import styles from '../styles/authForm.module.css';
import CTAButton from './CTAButton';
import ScreenShotCarousel from './ScreenShotCarousel';
import TagsSelect from './TagsSelect';

export interface ProjectFormValues {
	name: string;
	subtitle: string;
	description: string;
	tags: string[];
}

export interface ProjectFormProps {
	onFormSubmit: SubmitHandler<ProjectFormValues>;
	isFormLoading: boolean;
	isAddingNewProject?: boolean;
}

export default function ProjectForm({
	onFormSubmit,
	isFormLoading,
	isAddingNewProject = true,
}: ProjectFormProps) {
	const { register, control, handleSubmit } =
		useFormContext<ProjectFormValues>();

	return (
		<fieldset
			disabled={isFormLoading}
			className='flex justify-center items-center w-full'
		>
			<form
				className='w-full max-w-4xl mt-10 mx-5 p-5 flex flex-col gap-4 border-2 border-primary rounded'
				onSubmit={handleSubmit(onFormSubmit)}
			>
				<h2 className={styles.authForm__heading}>
					{isAddingNewProject ? 'Submit a' : 'Edit'} Project
				</h2>

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

				<div className='bg-pink-500 p-5'>
					<ScreenShotCarousel images={[]} />
				</div>

				<div>
					<TagsSelect control={control} />
				</div>

				<div>
					<CTAButton text='Submit' type='submit' isLoading={isFormLoading} />
				</div>
			</form>
		</fieldset>
	);
}

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
