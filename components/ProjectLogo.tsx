import classNames from 'classnames';
import Image, { type ImageProps } from 'next/image';
import { HTMLAttributes, useState } from 'react';
import { FaImage } from 'react-icons/fa';
import styles from '../styles/utilities.module.css';

export interface ProjectLogoProps extends ImageProps {
	containerProps?: HTMLAttributes<HTMLDivElement>;
}

export default function ProjectLogo({
	containerProps: { className, ...containerProps } = {},
	...imgProps
}: ProjectLogoProps) {
	const [isImageLoadingError, setIsImageLoadingError] = useState(false);

	return (
		<div
			className={classNames(
				'w-16 h-16 md:w-24 md:h-24 relative bg-gray-300 rounded',
				className,
			)}
			{...containerProps}
		>
			{imgProps.src && !isImageLoadingError ? (
				<Image
					alt='logo'
					layout='fill'
					objectFit='cover'
					className='rounded'
					{...imgProps}
					onError={e => {
						setIsImageLoadingError(true);
						imgProps.onError?.(e);
					}}
				/>
			) : (
				<span className={styles.absolute_center}>
					<FaImage size='2rem' className='opacity-80' />
				</span>
			)}
		</div>
	);
}
