import { useRouter } from 'next/router';
import { websiteName } from '../../lib/constants';
import BackButton from './BackButton';

export interface HeaderProps {
	title?: string;
	withBackBtn?: boolean;
}

export default function Header({ title, withBackBtn }: HeaderProps) {
	const router = useRouter();

	// get title from route if not specified
	if (title === undefined)
		title = router.pathname.split('/').filter(Boolean)[0] || websiteName;

	return (
		<header className='text-white bg-primary px-3 pb-1 pt-10 md:py-3 md:px-4 shadow-lg shadow-gray-300 flex gap-3'>
			{withBackBtn ? <BackButton /> : null}

			<h1 className='capitalize text-3xl md:text-2xl'>{title}</h1>
		</header>
	);
}
