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
			type='submit'
			disabled={isLoading}
			className={`cursor-pointer ${className}`}
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
