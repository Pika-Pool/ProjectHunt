import { useRouter } from 'next/router';
import { websiteName } from '../constants/global';

export interface HeaderProps {
	title?: string;
}

export default function Header({ title }: HeaderProps) {
	const router = useRouter();

	// get title from route if not specified
	if (title === undefined)
		title = router.pathname.split('/').filter(Boolean)[0] || websiteName;

	return (
		<header className='bg-primary px-3 pb-1 pt-10 md:py-3 md:px-4 shadow-lg shadow-gray-300'>
			<h1 className='text-white capitalize text-3xl md:text-2xl'>{title}</h1>
		</header>
	);
}
