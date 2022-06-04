import classnames from 'classnames';
import Link, { type LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import type { UrlObject } from 'url';

export interface NavLinkProps extends LinkProps {
	content?: ReactNode;
	href: string | UrlObject;
}

const NavLink = ({ href, content, ...linkProps }: NavLinkProps) => {
	const router = useRouter();

	return (
		<Link href={href} {...linkProps}>
			<a
				className={classnames(
					'flex flex-col justify-center items-center text-xs hover:text-primary',
					{ 'text-primary': router.pathname === href },
					{ 'text-gray-500': router.pathname !== href },
				)}
			>
				{content}
			</a>
		</Link>
	);
};

export default NavLink;
