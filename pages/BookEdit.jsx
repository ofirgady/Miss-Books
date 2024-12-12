import { bookService } from "../services/book.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

const { useState, useEffect } = React;
const { useNavigate, useParams, useSearchParams } = ReactRouterDOM;

export function BookEdit() {
	const [searchParams] =  useSearchParams()
	const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook());
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();
	const { bookId } = useParams();

	useEffect(() => {
		if (bookId) {
			loadBook();
		}
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, []);

	function loadBook() {
		bookService
			.get(bookId)
			.then(setBookToEdit)
			.catch((err) => {
				console.log("Problem getting book", err);
				showErrorMsg("Problem getting book", err);
			});
	}

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

		setBookToEdit((prevBook) => {
			if (field === "amount" || field === "isOnSale") {
				return {
					...prevBook,
					listPrice: {
						...prevBook.listPrice,
						[field]: transformedValue,
					},
				};
			} else {
				return { ...prevBook, [field]: transformedValue };
			}
		});
	}

	function onSaveBook(ev) {
		ev.preventDefault();
		bookService
			.save(bookToEdit)
			.then(() => {
				showSuccessMsg('Book saved successfully')
				onBack()
			})
			.catch((err) => {
				showErrorMsg("Cannot save!", err);
			});
	}

	function onBack() {
		navigate(searchParams.get('isDetails') ? `/book/${bookId}` : `/book`) 
	}

	const {
		title,
		listPrice = {},
		subtitle,
		publishedDate,
		pageCount,
		description,
	} = bookToEdit;
	const { isOnSale = false, amount = 0 } = listPrice;

	if (loading)
		return (
			<div className='loading-container'>
				<div className='loading'></div>
			</div>
		);
	return (
		<section className='book-edit'>
			<h2>{bookId ? "Edit" : "Add"} Book</h2>
			<form onSubmit={onSaveBook}>
				<div className='book-edit-detail'>
					<label htmlFor='title'>title</label>
					<input
						onChange={handleChange}
						value={title}
						type='text'
						name='title'
					/>
				</div>
				<div className='book-edit-detail'>
					<label htmlFor='amount'>price</label>
					<input
						onChange={handleChange}
						value={amount}
						type='number'
						name='amount'
					/>
				</div>
				<div className='book-edit-detail'>
					<label htmlFor='subtitle'>subtitle</label>
					<input
						onChange={handleChange}
						value={subtitle}
						type='text'
						name='subtitle'
					/>
				</div>
				<div className='book-edit-detail'>
					<label htmlFor='descreption'>descreption</label>
					<textarea
						rows='5'
						onChange={handleChange}
						value={description}
						type='text'
						name='descreption'></textarea>
				</div>
				<div className='book-edit-detail'>
					<label htmlFor='publishedDate'>Book Publish Year</label>
					<input
						onChange={handleChange}
						value={publishedDate}
						type='number'
						name='publishedDate'
					/>
				</div>
				<div className='book-edit-detail'>
					<label htmlFor='pageCount'>Number of pages</label>
					<input
						onChange={handleChange}
						value={pageCount}
						type='number'
						name='pageCount'
					/>
				</div>
				<div className='book-edit-sale-detail'>
					<label>Is the book on sale</label>
					<input
						onChange={handleChange}
						checked={isOnSale}
						type='checkbox'
						name='isOnSale'
					/>
				</div>

				<button type="submit">Save</button>
				<button onClick={onBack}>Cancel</button>
			</form>
		</section>
	);
}
