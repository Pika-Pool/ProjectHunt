import type { Control } from 'react-hook-form';
import { useQuery } from 'react-query';
import { getAllTags } from '../lib/graphql/requests/query';
import styles from '../styles/authForm.module.css';
import ClientOnly from './ClientOnly';
import ControlledMultiSelect from './ControlledMultiSelect';

interface TagsSelectProps<T> {
	control: Control<T>;
}

export default function TagsSelect<T>({ control }: TagsSelectProps<T>) {
	// fetch available tags
	const { data: tags, isLoading: isTagsLoading } = useQuery(
		'allTags',
		getAllTags,
		{ staleTime: 5 * 60 * 1000 },
	);

	return (
		<>
			<label htmlFor='tags' className={styles.authForm__label}>
				Tags
			</label>
			<ClientOnly>
				<ControlledMultiSelect
					control={control}
					name='tags'
					instanceId='tags'
					inputId='tags'
					options={filteredTagsToSelectOptions(tags ?? [])}
					isLoading={isTagsLoading}
					allowCreateWhileLoading
					createOptionPosition='last'
				/>
			</ClientOnly>
		</>
	);
}

type ReactSelectOption = Record<'value' | 'label', string>;
function filteredTagsToSelectOptions(
	tags: ({ id: string; tagName: string } | null)[],
) {
	return tags
		?.map(tag => {
			if (tag) return { value: tag.tagName, label: tag.tagName };
			return null;
		})
		.filter((tagOption): tagOption is ReactSelectOption => Boolean(tagOption));
}
