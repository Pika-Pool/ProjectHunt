import classNames from 'classnames';
import Link from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

export interface UsernameLinkProps
	extends AnchorHTMLAttributes<HTMLAnchorElement> {
	username: string;
	userId: string | number;
	linkProps?: Parameters<typeof Link>[0];
}

export default function UsernameLink({
	userId,
	username,
	className,
	linkProps,
	...anchorProps
}: UsernameLinkProps) {
	return (
		<Link {...linkProps} href={linkProps?.href ?? `/profile/${userId}`}>
			<a className={classNames('hover:underline', className)} {...anchorProps}>
				@{username}
			</a>
		</Link>
	);
}
