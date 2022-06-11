import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
	FormProvider,
	useForm,
	type SubmitHandler,
	type UseFormProps,
} from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import ProjectForm, { type ProjectFormValues } from '../components/ProjectForm';
import { useAuthUser } from '../contexts/AuthUser';
import useLoadingToast from '../hooks/useLoadingToast';
import useLocalStorage from '../hooks/useLocalStorage';
import { projectSubmitFormDraftStorageKey } from '../lib/constants';
import { createNewProjectReq } from '../lib/graphql/requests/mutation';

const Submit: NextPage = () => {
	const router = useRouter();
	const { isLoggedIn: isUserLoggedIn } = useAuthUser();

	const [formDraft, setFormDraft] = useLocalStorage<
		UseFormProps<ProjectFormValues>['defaultValues']
	>(projectSubmitFormDraftStorageKey, {});

	const useFormReturn = useForm<ProjectFormValues>({
		defaultValues: formDraft,
		shouldUseNativeValidation: true,
	});

	// save form data to localStorage
	useEffect(() => {
		const { unsubscribe } = useFormReturn.watch(formData =>
			setFormDraft(formData),
		);
		return () => unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setFormDraft, useFormReturn.watch]);

	// mutation query to create project
	const { mutate, isLoading } = useMutation(createNewProjectReq, {
		onSuccess(data) {
			if (!data || data.error) {
				toast.error('Something went wrong. Could not submit your project');
				console.log(data);
				return;
			}
			setFormDraft({});
			router.push(`/project/${data.projectId}`);
		},
		onError(err) {
			toast.error('Something went wrong. Could not submit your project');
			console.log(err);
		},
	});
	useLoadingToast({ isLoading, toastMsg: 'Registering your project...' });

	// redirect to /login if user is not logged in
	// form data is saved in localStorage
	const onFormSubmit: SubmitHandler<ProjectFormValues> = data => {
		if (!isUserLoggedIn)
			router.push({ pathname: '/auth/login', query: { from: '/submit' } });
		else {
			console.log({ data });
			mutate(data);
		}
	};

	return (
		<FormProvider {...useFormReturn}>
			<ProjectForm isFormLoading={isLoading} onFormSubmit={onFormSubmit} />
		</FormProvider>
	);
};

export default Submit;
