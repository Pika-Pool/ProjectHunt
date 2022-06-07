import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import ClientOnly from '../../../components/ClientOnly';
import LoadingOrComponent from '../../../components/LoadingOrComponent';
import ProjectForm, {
	type ProjectFormValues,
} from '../../../components/ProjectForm';
import { useAuthUser } from '../../../contexts/AuthUser';
import useLoadingToast from '../../../hooks/useLoadingToast';
import { createNewProjectReq } from '../../../lib/graphql/requests/mutation';
import { getProjectById } from '../../../lib/graphql/requests/query';

const EditProject: NextPage = () => {
	const { isLoggedIn: isUserLoggedIn, user } = useAuthUser();

	const router = useRouter();
	const { projectId } = router.query;

	const useFormReturn = useForm<ProjectFormValues>({
		shouldUseNativeValidation: true,
	});

	const {
		data: project,
		isLoading: isLoadingProject,
		isFetched: isProjectFetched,
	} = useQuery(
		['getProjectById', projectId],
		() => getProjectById(projectId?.toString() ?? ''),
		{
			enabled: Boolean(projectId && typeof projectId === 'string'),
			onError(err) {
				console.error(err);
				toast.error('Unable to fetch the project. Try again later');
			},
			onSuccess(data) {
				if (data) useFormReturn.reset(data);
				else toast.error('Could not fetch the project data. Try again later');
			},
		},
	);

	// mutation query to create project
	const { mutate, isLoading: isLoadingFormSubmit } = useMutation(
		createNewProjectReq,
		{ onSuccess: data => router.push(`/project/${data.projectId}`) },
	);
	useLoadingToast({
		isLoading: isLoadingFormSubmit,
		toastMsg: 'Registering your project...',
	});

	const onFormSubmit: SubmitHandler<ProjectFormValues> = data => mutate(data);

	// user needs to be signed in to be authorised to edit projects
	useEffect(() => {
		if (!isUserLoggedIn) router.push('/auth/login');
	}, [isUserLoggedIn, router]);

	if (isUserLoggedIn && isProjectFetched && !project) {
		toast.error('Could not load this project');
		return <p className='text-lg text-red-500'>Could not load this project.</p>;
	}

	if (isUserLoggedIn && isProjectFetched && project?.owner.id !== user.id) {
		router.replace(`/project/${projectId}`);
		return (
			<em className='text-lg text-red-500'>
				You are not authorised to edit this project
			</em>
		);
	}

	return (
		<LoadingOrComponent isLoading={isLoadingProject || !isProjectFetched}>
			<FormProvider {...useFormReturn}>
				<ClientOnly>
					<ProjectForm
						isFormLoading={isLoadingFormSubmit}
						onFormSubmit={onFormSubmit}
						isAddingNewProject={false}
					/>
				</ClientOnly>
			</FormProvider>
		</LoadingOrComponent>
	);
};

export default EditProject;

// export interface EditProjectProps {
// 	project?: ProjectByIdQuery['projectById'];
// 	errorMsg?: string;
// }

// export const getServerSideProps: GetServerSideProps<
// 	EditProjectProps,
// 	{ projectId?: string }
// > = async ({ params, res }) => {
// 	const { projectId } = params ?? {};
// 	if (!projectId) {
// 		res.statusCode = 400;
// 		return { props: { errorMsg: 'This project ID is invalid' } };
// 	}

// 	try {
// 		const project = await getProjectById(projectId);
// 		if (!project) {
// 			res.statusCode = 404;
// 			return { props: { errorMsg: 'This project does not exist anymore' } };
// 		}

// 		return { props: { project } };
// 	} catch (err) {
// 		console.error(err);
// 		return {
// 			props: { errorMsg: 'Unable to fetch the project. Try again later' },
// 		};
// 	}
// };
