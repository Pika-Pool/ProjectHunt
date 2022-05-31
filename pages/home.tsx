import classnames from 'classnames';
import type { NextPage } from 'next';
import Link, { type LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import {
	FaChartLine,
	FaHome,
	FaPenAlt,
	FaSearch,
	FaUserAstronaut,
} from 'react-icons/fa';
import type { UrlObject } from 'url';

const HomePage: NextPage = () => {
	return (
		<div>
			<main>
				<h1 className='underline'>Hello</h1>
			</main>

			<footer
				className='fixed bottom-0 left-0 w-full p-2'
				style={{
					boxShadow:
						'0 -10px 15px -3px rgb(0 0 0 / 0.1), 0 -4px 6px -4px rgb(0 0 0 / 0.1)',
				}}
			>
				<div className='max-w-lg flex justify-between items-center m-auto'>
					<NavLink
						href='/home'
						content={
							<>
								<FaHome size='2em' />
								<span>Home</span>
							</>
						}
					/>
					<NavLink
						href='/trending'
						content={
							<>
								<FaChartLine size='2em' />
								<span>Trending</span>
							</>
						}
					/>
					<NavLink
						href='/submit'
						content={
							<>
								<FaPenAlt size='2em' />
								<span>Submit</span>
							</>
						}
					/>
					<NavLink
						href='/search'
						content={
							<>
								<FaSearch size='2em' />
								<span>Search</span>
							</>
						}
					/>
					<NavLink
						href='/profile'
						content={
							<>
								<FaUserAstronaut size='2em' />
								<span>Profile</span>
							</>
						}
					/>
				</div>
			</footer>
		</div>
	);
};

export default HomePage;

interface NavLinkProps extends LinkProps {
	content?: ReactNode;
	href: string | UrlObject;
}

const NavLink = ({ href, content, ...linkProps }: NavLinkProps) => {
	const router = useRouter();

	return (
		<Link href={href} {...linkProps}>
			<a
				className={classnames(
					'flex flex-col justify-center items-center text-xs text-gray-500 hover:text-amber-600',
					{ 'text-amber-600': router.pathname === href },
				)}
			>
				{content}
			</a>
		</Link>
	);
};

// interface NavLinkProps extends LinkProps {
// 	render: (props: {
// 		href: LinkProps['href'];
// 		isRouteActive: boolean;
// 	}) => ReactNode;
// }

// const NavLink = ({ render, href, ...linkProps }: NavLinkProps) => {
// 	const router = useRouter();

// 	return (
// 		<Link href={href} {...linkProps}>
// 			{render({ href, isRouteActive: router.pathname === href })}
// 		</Link>
// 	);
// };
