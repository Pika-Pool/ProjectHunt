import classNames from 'classnames';
import type { HTMLAttributes } from 'react';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
	tagName: string;
	tagId?: string;
}

export default function Tag({ tagName, ...spanProps }: TagProps) {
	return (
		<span
			{...spanProps}
			className={classNames(
				'py-1 px-2 hover:underline rounded bg-primary/50',
				spanProps.className ?? '',
			)}
		>
			{tagName}
		</span>
	);
}
