export function RateByTextbox({ val, onSelect }) {
	return (
		<div>
			<label htmlFor="rate-by-textbox">Enter Rating (1-5):</label>
			<input
				id="rate-by-textbox"
				type="number"
				min="1"
				max="5"
				value={val}
				onChange={(e) => onSelect(+e.target.value)}
			/>
		</div>
	);
}