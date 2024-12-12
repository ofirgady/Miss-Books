import { bookService } from "../services/book.service.js";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { RateBySelect } from "./RateCmps/RateBySelect.jsx";
import { RateByTextbox } from "./RateCmps/RateByTextbox.jsx";
import { RateByStars } from "./RateCmps/RateByStars.jsx";
const { useState, useEffect } = React;


export function AddReview({ book, removeReview }) {
	const [review, setReview] = useState({ fullname: "", rating: 1, readAt: "" });
	const [reviews, setReviews] = useState(book.reviews || []);
	const [ratingMethod, setRatingMethod] = useState("RateByStars");

	function handleChange({ target }) {
		const { value, name: field } = target;
		setReview((prevReview) => ({
			...prevReview,
			[field]: target.type === "number" ? +value : value,
		}));
	}

	function handleRatingChange(newRating) {
		setReview((prevReview) => ({ ...prevReview, rating: newRating }));
	}

	function onRemoveReview(bookId, reviewId) {
		removeReview(bookId, reviewId);
		setReviews((prevReviews) =>
			prevReviews.filter((review) => review.id !== reviewId)
		);
		showSuccessMsg("Review removed successfully");
	}

	function onSaveReview(ev) {
		ev.preventDefault();
		bookService
			.addReview(book.id, review)
			.then((review) => {
				setReviews((prevReviews) => [...prevReviews, review]);
				setReview({ fullname: "", rating: 1, readAt: "" });
				showSuccessMsg("Review saved successfully");
			})
			.catch((err) => {
				console.error("Failed to save review:", err);
				showErrorMsg("Failed to save review");
			});
	}

	function renderRatingComponent() {
		const components = {
			RateBySelect: RateBySelect,
			RateByTextbox: RateByTextbox,
			RateByStars: RateByStars,
		};
		const SelectedComponent = components[ratingMethod];
		return <SelectedComponent val={review.rating} onSelect={handleRatingChange} />;
	}

	return (
		<section className="add-review">
			<section className="add-review-form">
				<h2>Add A Review for the Book!</h2>
				<form onSubmit={onSaveReview}>
					<label htmlFor="fullname">Full Name:</label>
					<input
						type="text"
						name="fullname"
						value={review.fullname}
						onChange={handleChange}
					/>

					<label>Choose Rating Method:</label>
					<div className="rating-methods">
						<label>
							<input
								type="radio"
								name="ratingMethod"
								value="RateBySelect"
								checked={ratingMethod === "RateBySelect"}
								onChange={(e) => setRatingMethod(e.target.value)}
							/>
							Dropdown Select
						</label>
						<label>
							<input
								type="radio"
								name="ratingMethod"
								value="RateByTextbox"
								checked={ratingMethod === "RateByTextbox"}
								onChange={(e) => setRatingMethod(e.target.value)}
							/>
							Textbox
						</label>
						<label>
							<input
								type="radio"
								name="ratingMethod"
								value="RateByStars"
								checked={ratingMethod === "RateByStars"}
								onChange={(e) => setRatingMethod(e.target.value)}
							/>
							Star Rating
						</label>
					</div>

					<h3>Rate the Book:</h3>
					{renderRatingComponent()}

					<label htmlFor="readAt">When did you read it?</label>
					<input
						type="date"
						name="readAt"
						value={review.readAt}
						onChange={handleChange}
					/>

					<button>Submit</button>
				</form>
			</section>

			<section className="review-list">
				<h2>The Book's Reviews:</h2>
				{reviews.length ? (
					reviews.map((review, idx) => (
						<div key={idx} className="review-item">
							<h4>Name: {review.fullname}</h4>
							<p>
								Rating:{" "}
								<span className="star-rating">
									{[1, 2, 3, 4, 5].map((star) => (
										<span
											key={star}
											className={`star ${
												star <= review.rating ? "filled" : ""
											}`}>
											★
										</span>
									))}
								</span>
							</p>
							<p>
								Read On:{" "}
								{review.readAt
									? new Date(review.readAt).toLocaleDateString()
									: "N/A"}
							</p>
							<button
								onClick={() => onRemoveReview(book.id, review.id)}>
								Remove
							</button>
						</div>
					))
				) : (
					<div>There are no reviews for the book yet</div>
				)}
			</section>
		</section>
	);
}