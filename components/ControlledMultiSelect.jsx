import { Controller } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

export default function ControlledMultiSelect({
	name,
	control,
	...selectProps
}) {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={[]}
			render={({ field: { value, onChange, onBlur } }) => (
				<CreatableSelect
					placeholder='Choose...'
					{...selectProps}
					isMulti
					onChange={options => onChange(options?.map(option => option.value))}
					value={valuesToSelectOptions(value)}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}

function valuesToSelectOptions(values) {
	return values?.map(value => ({ value, label: value })) ?? [];
}
