import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';

export default function BackButton() {
	const router = useRouter();

	return (
		<button onClick={() => router.back()} aria-label='go back' title='go back'>
			<FaArrowLeft size='1.5em' />
		</button>
	);
}
