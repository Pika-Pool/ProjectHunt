import Image from 'next/image';

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
	return (
		<div
			className='rounded-full relative overflow-hidden'
			style={{ width: size, height: size }}
		>
			<Image
				src='https://ph-files.imgix.net/405a0dc6-7d86-4566-941f-6d12cfe1bc73.jpeg?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=60&h=60&fit=crop&bg=0fff'
				alt={username || 'user avatar'}
				layout='fill'
				objectFit='cover'
			/>
		</div>
	);
}
