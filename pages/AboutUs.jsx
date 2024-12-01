const { useState, useEffect, useRef } = React;

export function AboutUs() {
	return (
		<div className='about-us-page'>
			<header className='about-header'>
				<h2>About Miss Books</h2>
			</header>
			<section className='about-mission'>
				<h3>Our Mission</h3>
				<p>
					At Miss Books, our mission is to connect people with the power of
					books. We believe in the transformative magic of stories and
					knowledge, and we strive to make books accessible to everyone.
				</p>
			</section>
			<section className='our-story'>
				<h3>Our Story</h3>
				<p>
					Founded in 2023, Miss Books began as a small local bookstore. Over the
					years, we have grown into a thriving online bookstore while
					maintaining our love for the printed page.
				</p>
				<p>
					Whether you're a lifelong reader or just beginning your journey, Miss
					Books is here to help you find the stories that speak to your heart.
				</p>
			</section>
			<section className='team'>
				<h3>Meet Our Team</h3>
				<ul>
					<li>
						<strong>Ofir Gady</strong> - Founder & CEO
					</li>
					<li>
						<strong>John Doe</strong> - Head of Marketing
					</li>
					<li>
						<strong>Madeup Name</strong> - Customer Support Lead
					</li>
				</ul>
			</section>
			<footer className='about-footer'>
				<p>
					Have questions? Contact us! We'd love to hear
					from you!
				</p>
				<p>
					&copy; {new Date().getFullYear()} Miss Books. All Rights Reserved.
				</p>
			</footer>
		</div>
	);
}
