import type { NextPage } from 'next';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import CTAButton from '../components/CTAButton';
import ProjectList from '../components/ProjectList';
import useDebounce from '../hooks/useDebounce';
import { getFilteredProjects } from '../lib/graphql/requests/query';

const Search: NextPage = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearchTerm = useDebounce(searchTerm, 800);

	const { data: projects, isFetching } = useQuery(
		['getFilteredProjects', debouncedSearchTerm],
		() => getFilteredProjects(searchTerm),
		{
			keepPreviousData: true,
			enabled: Boolean(debouncedSearchTerm),
			onError(err) {
				console.error(err);
				toast.error('Something went wrong. Could not fetch the projects.');
			},
			onSuccess(data) {
				if (!data)
					toast.error('Something went wrong, could not fetch the projects');
			},
		},
	);

	const onSearch: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault();
	};

	return (
		<div className='flex justify-center'>
			<div className='max-w-6xl mx-2 md:mx-5 w-full'>
				<form
					className='flex flex-col md:flex-row gap-3 mb-5'
					onSubmit={onSearch}
				>
					<label htmlFor='search' className='sr-only'>
						Search
					</label>

					<input
						type='text'
						name='search'
						id='search'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						className='rounded-md border-2 border-primary py-2 px-3 w-full'
						placeholder='Search for project names, descriptions, tags etc.'
					/>

					<CTAButton
						type='submit'
						className='md:w-max rounded-md text-base'
						isLoading={isFetching}
					>
						Search
					</CTAButton>
				</form>

				<ProjectList projects={projects ?? []} />
			</div>
		</div>
	);
};

export default Search;
