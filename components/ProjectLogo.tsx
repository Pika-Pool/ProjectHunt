import classNames from 'classnames';
import Image, { type ImageProps } from 'next/image';
import { HTMLAttributes, useEffect, useState } from 'react';
import { FaImage } from 'react-icons/fa';
import useImageFromServer from '../hooks/useImageFromServer';
import styles from '../styles/utilities.module.css';

export type ProjectLogoProps = Omit<ImageProps, 'src'> & {
	src: string;
	containerProps?: HTMLAttributes<HTMLDivElement>;
};

export default function ProjectLogo({
	containerProps: { className, ...containerProps } = {},
	...imgProps
}: ProjectLogoProps) {
	const [isImageLoadingError, setIsImageLoadingError] = useState(false);
	const logoSrcToUse = useImageFromServer(imgProps.src);

	useEffect(() => {
		setIsImageLoadingError(false);
	}, [logoSrcToUse]);

	return (
		<div
			className={classNames(
				'w-16 h-16 md:w-24 md:h-24 relative bg-gray-300 rounded',
				className,
			)}
			{...containerProps}
		>
			{logoSrcToUse && !isImageLoadingError ? (
				<Image
					alt='logo'
					layout='fill'
					objectFit='cover'
					className='rounded'
					{...imgProps}
					src={logoSrcToUse}
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
