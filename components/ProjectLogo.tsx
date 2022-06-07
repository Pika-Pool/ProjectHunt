import classNames from 'classnames';
import Image, { type ImageProps } from 'next/image';
import type { HTMLAttributes } from 'react';

export interface ProjectLogoProps extends ImageProps {
	containerProps?: HTMLAttributes<HTMLDivElement>;
}

export default function ProjectLogo({
	containerProps: { className, ...containerProps } = {},
	...imgProps
}: ProjectLogoProps) {
	return (
		<div
			className={classNames('w-16 h-16 md:w-24 md:h-24 relative', className)}
		>
			<Image
				alt='carousel'
				layout='fill'
				objectFit='cover'
				className='rounded'
				{...imgProps}
			/>
		</div>
	);
}
