const { useState, useEffect, useRef } = React;
const { Link } = ReactRouterDOM;

function LongText({ txt, length = 100 }) {
	let isTextLonger = txt.length > length;
	let shownTxt;
	const [longTxtButtonPressed, setLongTxtButtonPressed] = useState(false);

	if (isTextLonger) {
		shownTxt = txt.slice(0, length - 1) + "...";
	}

	if (isTextLonger && !longTxtButtonPressed)
		return (
			<section className='long-text-container'>
				<p>{shownTxt}</p>
				<button onClick={() => setLongTxtButtonPressed(true)}>Read more</button>
			</section>
		);

	return (
		<section className='long-text-container'>
			<p>{txt}</p>
			{isTextLonger && longTxtButtonPressed && (
				<a onClick={() => setLongTxtButtonPressed(false)}>read less</a>
			)}
		</section>
	);
}
