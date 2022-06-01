import type { NextPage } from 'next';

const HomePage: NextPage = () => {
	return <h1 className='underline'>Hello</h1>;
};

export default HomePage;

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
