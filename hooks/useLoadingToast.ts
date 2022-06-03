import { useEffect } from 'react';
import toast from 'react-hot-toast';

export interface useLoadingToastProps {
	isLoading?: boolean;
	toastMsg?: string;
	toastOptions?: Parameters<typeof toast.loading>[1];
}

export default function useLoadingToast({
	isLoading,
	toastMsg,
	toastOptions,
}: useLoadingToastProps) {
	useEffect(() => {
		let loadingToastId: string | undefined;
		if (isLoading)
			loadingToastId = toast.loading(toastMsg || 'Loading...', toastOptions);
		return () => {
			toast.remove(loadingToastId);
		};
	}, [isLoading, toastMsg, toastOptions]);
}
