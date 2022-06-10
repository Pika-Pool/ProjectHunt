import Image from 'next/image';
import { useState } from 'react';

export interface UserAvatarProps {
	size?: string;
	avatar?: string;
	username?: string;
}

export default function UserAvatar({
	size = '2rem',
	avatar,
	username,
}: UserAvatarProps) {
	const [isImageLoadingError, setIsImageLoadingError] = useState(false);

	return (
		<div
			className='rounded-full relative overflow-hidden'
			style={{ width: size, height: size }}
		>
			{avatar && !isImageLoadingError ? (
				<Image
					src={avatar}
					alt={username || 'user avatar'}
					layout='fill'
					objectFit='cover'
					onError={() => setIsImageLoadingError(true)}
				/>
			) : (
				<span className='bg-accent text-white font-bold absolute inset-0 flex justify-center items-center'>
					{username?.slice(0, 2) || 'AN'}
				</span>
			)}
		</div>
	);
}