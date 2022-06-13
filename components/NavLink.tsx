import classnames from 'classnames';
import Link, { type LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useMemo } from 'react';
import type { UrlObject } from 'url';

export interface NavLinkProps extends LinkProps {
	content?: ReactNode;
	href: string | UrlObject;
}

const NavLink = ({ href, content, ...linkProps }: NavLinkProps) => {
	const router = useRouter();

	const isAMatch = useMemo(() => {
		if (typeof href === 'string') return router.pathname.startsWith(href);
		if (href.pathname) return router.pathname.startsWith(href.pathname);
		return false;
	}, [href, router.pathname]);

	return (
		<Link href={href} {...linkProps}>
			<a
				className={classnames(
					'flex flex-col justify-center items-center text-xs hover:text-primary text-gray-500',
					{ 'text-primary': isAMatch },
				)}
				style={{ color: isAMatch ? 'hsl(var(--color-primary))' : '' }}
			>
				{content}
			</a>
		</Link>
	);
};

export default NavLink;
