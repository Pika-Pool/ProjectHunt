import type { ButtonHTMLAttributes } from 'react';
import type { IconBaseProps } from 'react-icons';
import { AiOutlineLoading } from 'react-icons/ai';

export interface LoadingButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
	iconProps?: IconBaseProps;
	isLoading?: boolean;
}

export default function CTAButton({
	isLoading,
	text,
	iconProps,
	className,
	...buttonProps
}: LoadingButtonProps) {
	return (
		<button
			disabled={isLoading}
			className={`cursor-pointer w-full px-3 py-2 bg-primary text-white uppercase text-xl font-bold ${className}`}
			{...buttonProps}
		>
			{isLoading ? (
				<div className='flex justify-center items-center gap-3'>
					<AiOutlineLoading
						{...iconProps}
						className='inline animate-spin-medium'
					/>{' '}
					Loading...
				</div>
			) : (
				text
			)}
		</button>
	);
}
