export function RateByStars({ val, onSelect }) {
	return (
		<div className="star-rating">
			{[1, 2, 3, 4, 5].map((star) => (
				<span
					key={star}
					className={`star ${star <= val ? "filled" : ""}`}
					onClick={() => onSelect(star)}>
					★
				</span>
			))}
		</div>
	);
}