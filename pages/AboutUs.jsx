const { Outlet, Link, NavLink, useNavigate } = ReactRouterDOM;
const { useEffect } = React;

export function AboutUs() {

	const navigate = useNavigate()
	useEffect(() => {
		navigate('/about/mission')
	}, []);
	
	return (
		<div className='about-us-page'>
			<header className='about-header'>
				<h2>About Miss Books</h2>
			</header>
			<section>
				<nav className="about-us-nav">
					<NavLink to='/about/mission'>Our Mission</NavLink>
					<NavLink to='/about/story'>Our Story</NavLink>
					<NavLink to='/about/team'>Our Team</NavLink>
				</nav>
			</section>

			<section>
				<Outlet />
			</section>
			<footer className='about-footer'>
				<p>Have questions? Contact us! We'd love to hear from you!</p>
				<p>
					&copy; {new Date().getFullYear()} Miss Books. All Rights Reserved.
				</p>
			</footer>
		</div>
	);
}
