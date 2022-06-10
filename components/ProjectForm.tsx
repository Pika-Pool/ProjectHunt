import React, {
	type ChangeEventHandler,
	type InputHTMLAttributes,
} from 'react';
import {
	useController,
	useFormContext,
	type SubmitHandler,
} from 'react-hook-form';
import fileListToObjectURL from '../lib/fileListToObjectUrl';
import styles from '../styles/authForm.module.css';
import type { ProjectByIdQuery } from '../types/graphql';
import CTAButton from './CTAButton';
import ProjectLogo from './ProjectLogo';
import ScreenShotCarousel from './ScreenShotCarousel';
import TagsSelect from './TagsSelect';

export interface ProjectFormValues {
	name: string;
	subtitle: string;
	description: string;
	tags: string[];
	logo: FileList;
	url: string;
	screenshots: (string | File)[];
}

export interface ProjectFormProps {
	onFormSubmit: SubmitHandler<ProjectFormValues>;
	isFormLoading: boolean;
	isAddingNewProject?: boolean;
	currentProject?: ProjectByIdQuery['projectById'];
}

export default function ProjectForm({
	onFormSubmit,
	isFormLoading,
	isAddingNewProject = true,
	currentProject,
}: ProjectFormProps) {
	const { control, handleSubmit, register, reset, watch } =
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
						Project Logo
					</label>
					<ProjectLogo
						src={
							fileListToObjectURL(watch('logo')) || currentProject?.logo || ''
						}
						alt='your logo'
					/>
					<SubmitPageInput
						type='file'
						multiple={false}
						accept='image/*'
						id='logo'
						className='mt-2'
						{...register('logo', {
							required: isAddingNewProject,
							validate: {
								atLeastOneFile: v =>
									!isAddingNewProject ||
									v.length >= 1 ||
									'Upload at least 1 image file',
								fileMustBeImage: v =>
									v.length < 1 ||
									/image\/.*/.test(v.item(0)!.type) ||
									'Please upload an image file only',
							},
						})}
					/>
				</div>

				<div>
					<label htmlFor='name' className={styles.authForm__label}>
						Project Title
					</label>
					<SubmitPageInput
						type='text'
						id='name'
						placeholder='Project Title'
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
						placeholder='Describe your project in brief(<50 characters)'
						{...register('subtitle', {
							required: true,
							minLength: 3,
							maxLength: 50,
						})}
					/>
				</div>

				<div>
					<label htmlFor='url' className={styles.authForm__label}>
						URL for your project
					</label>
					<SubmitPageInput
						type='url'
						id='url'
						placeholder='URL for your project'
						{...register('url', { required: true })}
					/>
				</div>

				<div>
					<label htmlFor='description' className={styles.authForm__label}>
						Description
					</label>
					<textarea
						id='description'
						rows={7}
						placeholder='Description of your project'
						className='block w-full border-2 rounded px-3 py-1'
						{...register('description', {
							required: true,
							minLength: 3,
						})}
					></textarea>
				</div>

				<ScreenShotCarouselFieldArray />

				<div>
					<TagsSelect control={control} />
				</div>

				<div>
					<CTAButton
						text='cancel'
						type='reset'
						className='bg-gray-300 text-gray-800'
						onClick={() => reset()}
					/>
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

function ScreenShotCarouselFieldArray() {
	const { control } = useFormContext<ProjectFormValues>();

	const {
		field: { onChange: onScreenshotsChange, value: screenshots },
	} = useController({ control, name: 'screenshots', defaultValue: [] });

	const onFileInput: ChangeEventHandler<HTMLInputElement> = e => {
		const files = Array.from(e.target.files ?? []);
		onScreenshotsChange([...screenshots, ...files]);
	};

	const onImgDelete = (img: string | File) => {
		const newFiles = screenshots.filter(screenshot => screenshot !== img);
		onScreenshotsChange(newFiles);
	};

	return (
		<div className='flex flex-col gap-2'>
			<p className={styles.authForm__label}>Screenshots</p>

			<label
				htmlFor='screenshots'
				className='cursor-pointer py-1 px-3 bg-accent text-white rounded-md w-max'
			>
				Add Screenshots
				<input
					type='file'
					name='screenshots'
					id='screenshots'
					className='hidden'
					multiple
					onChange={onFileInput}
				/>
			</label>

			<ScreenShotCarousel
				images={screenshots.map(img => ({
					src: img,
					alt: typeof img === 'string' ? '' : img.name,
				}))}
				lazyLoad={undefined}
				onImgDelete={onImgDelete}
			/>
		</div>
	);
}
