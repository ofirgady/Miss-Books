import { bookService } from "../services/book.service.js";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
const { useState, useEffect, useRef } = React;

export function AddReview({ book, removeReview, saveReview }) {
	const [review, setReview] = useState({ fullname: "", rating: 1, readAt: "" });
	const [reviews, setReviews] = useState(book.reviews || []);


	function handleChange({ target }) {
		let { value, name: field } = target;
		let transformedValue;

		switch (target.type) {
			case "range":
			case "number":
				transformedValue = +value;
				break;
			case "checkbox":
				transformedValue = target.checked;
				break;
			default:
				transformedValue = value;
		}
		setReview((prevReview) => ({
			...prevReview,
			[field]: transformedValue,
		}));
	}

	function onRemoveReview(bookId, reviewId) {
        removeReview(bookId, reviewId)
		setReviews((prevReviews) =>
			prevReviews.filter((review) => review.id !== reviewId)
		)
        showSuccessMsg('review removed successfully')

	}

	function onSaveReview(ev) {
		ev.preventDefault();
		// Add review to the bookService and update local state
		bookService
			.addReview(book.id, review)
			.then((review) => {
				setReviews((prevReviews) => [...prevReviews, review]);
				setReview({ fullname: "", rating: 1, readAt: "" }); // Reset form fields after submission
                showSuccessMsg('review saved successfully')
			})
			.catch((err) => {
				console.error("Failed to save review:", err);
                showErrorMsg('Failed to save review')

			});
	}

	const { fullname, rating, readAt } = review;

	return (
		<section className='add-review'>
			<section className='add-review-form'>
				<h2>Add A Review on the book!</h2>
				<form onSubmit={onSaveReview}>
					<label htmlFor='fullname'>Full Name:</label>
					<input
						type='text'
						name='fullname'
						value={fullname}
						onChange={handleChange}
					/>
					<label htmlFor='rating'>Rating:</label>
					<input
						type='number'
						min={1}
						max={5}
						name='rating'
						value={rating}
						onChange={handleChange}
					/>
					<label htmlFor='readAt'>When did you read it?</label>
					<input
						type='date'
						name='readAt'
						value={readAt}
						onChange={handleChange}
					/>
					<button>Submit</button>
				</form>
			</section>
			<section className='review-list'>
				<h2>The Book's Reviews:</h2>
				{reviews.length ? (
					reviews.map((review, idx) => (
						<div
							key={idx}
							className='review-item'>
							<h4>Name: {review.fullname}</h4>
							<p>Rating: {review.rating}</p>
							<p>
								Read On:{" "}
								{review.readAt
									? new Date(review.readAt).toLocaleDateString()
									: "N/A"}
							</p>
							<button onClick={() => onRemoveReview(book.id, review.id)}>Remove</button>
						</div>
					))
				) : (
					<div>There are no reviews on the book yet</div>
				)}
			</section>
		</section>
	);
}
