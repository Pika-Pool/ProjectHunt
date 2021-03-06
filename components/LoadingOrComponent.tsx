import classNames from 'classnames';
import type { PropsWithChildren } from 'react';

export interface LoadingOrComponentProps {
	isLoading?: boolean;
	size?: string;
	message?: string;
	shouldShowSpinner?: boolean;
}

export default function LoadingOrComponent({
	isLoading,
	size,
	message = 'Loading...',
	shouldShowSpinner = true,
	children,
}: PropsWithChildren<LoadingOrComponentProps>) {
	if (isLoading) {
		if (!shouldShowSpinner) return null;

		return (
			<div className='flex items-center justify-center space-x-2 relative'>
				<div
					className={classNames(
						'animate-spin inline-block w-40 h-40 border-primary border-l-transparent border-4 rounded-full',
						{ [`w-[${size}] h-[${size}]`]: size },
					)}
					role='status'
				></div>

				<span className='visible absolute'>{message}</span>
			</div>
		);
	}

	return <>{children}</>;
}
