import {
	FaChartLine,
	FaHome,
	FaPenAlt,
	FaSearch,
	FaUserAstronaut,
} from 'react-icons/fa';
import NavLink from './NavLink';

export default function FooterNav() {
	return (
		<footer
			className='fixed bottom-0 left-0 w-full p-2 bg-white'
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
	);
}
