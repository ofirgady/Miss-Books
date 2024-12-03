import { bookService } from "../services/book.service.js";

const { useState, useEffect, useRef } = React;
const { useNavigate, useParams } = ReactRouterDOM;

export function BookEdit() {
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
			.then(() => navigate("/book"))
			.catch((err) => {
				console.log("Cannot save!", err);
			});
	}

	const {
		title,
		listPrice = {},
		subtitle,
		publishedDate,
		pageCount,
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
						id='title'
					/>
				</div>
				<div className='book-edit-detail'>
					<label htmlFor='listPrice'>price</label>
					<input
						onChange={handleChange}
						value={amount}
						type='number'
						name='listPrice'
						id='listPrice'
					/>
				</div>
				<div className='book-edit-detail'>
					<label htmlFor='subtitle'>subtitle</label>
					<input
						onChange={handleChange}
						value={subtitle}
						type='text'
						name='subtitle'
						id='subtitle'
					/>
				</div>
				<div className='book-edit-detail'>
					<label htmlFor='subtitle'>subtitle</label>
					<input
						onChange={handleChange}
						value={subtitle}
						type='text'
						name='subtitle'
						id='subtitle'
					/>
				</div>
				<div className='book-edit-detail'>
					<label htmlFor='publishedDate'>Published Date</label>
					<input
						onChange={handleChange}
						value={publishedDate}
						type='number'
						name='publishedDate'
						id='publishedDate'
					/>
				</div>
				<div className='book-edit-detail'>
					<label htmlFor='pageCount'>Number of pages</label>
					<input
						onChange={handleChange}
						value={pageCount}
						type='number'
						name='pageCount'
						id='pageCount'
					/>
				</div>
				<div className='book-edit-sale-detail'>
					<label>Is the book on sale</label>
					<input
						onChange={handleChange}
						checked={isOnSale}
						type='checkbox'
						name='isOnSale'
						id='isOnSale'
					/>
				</div>

				<button>Save</button>
			</form>
		</section>
	);
}
