import classNames from 'classnames';
import { useEffect, useRef, type TextareaHTMLAttributes } from 'react';

export type CommentBoxProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
export default function CommentBox({ ...textAreaProps }: CommentBoxProps) {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = '4rem';
			textarea.style.height = textarea.scrollHeight + 'px';
		}
	}, []);

	return (
		<textarea
			name='comment'
			id='comment'
			placeholder="What's on your mind?"
			minLength={10}
			{...textAreaProps}
			className={classNames(
				'w-full max-h-36 md:max-h-96 h-16 resize-none p-2 border-b border-primary',
				textAreaProps.className,
			)}
			ref={textareaRef}
			onChange={e => {
				e.target.style.height = '4rem';
				e.target.style.height = e.target.scrollHeight + 'px';
				textAreaProps.onChange?.(e);
			}}
		></textarea>
	);
}
