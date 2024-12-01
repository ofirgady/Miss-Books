const { useState, useEffect, useRef } = React;

export function Home() {
	return (
		<div className='home-page'>
			<h2>Welcome to Miss Books</h2>
			<h1>Your favorite destination for books of all genres</h1>
			<img
				src='../assets/img/vecteezy_icon-lady.svg'
				alt=''
			/>
		</div>
	);
}
