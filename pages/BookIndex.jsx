import { bookService } from "../services/book.service.js";
import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/BookList.jsx";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
const { useState, useEffect } = React;
const { Link, NavLink, Outlet, useSearchParams } = ReactRouterDOM;

export function BookIndex() {
	const [searchParams, setSearchParams] = useSearchParams();
	const defaultFilter = bookService.getFilterFromSearchParams(searchParams)
	const [books, setBooks] = useState(null);
	const [filterBy, setFilterBy] = useState(defaultFilter);

	useEffect(() => {
		setSearchParams(filterBy)
		loadBooks()

	}, [filterBy, books]);

	 function loadBooks() {
		bookService
			.query(filterBy)
			.then(setBooks)
			.catch((err) => {
				console.log("Problems getting books:", err);
				showErrorMsg("Problems getting books:", err);
			});
	}

	function onRemoveBook(bookId) {
		bookService
			.remove(bookId)
			.then(() => {
				setBooks((books) => books.filter((book) => book.id !== bookId));
				showSuccessMsg('Book removed successfully')
			})
			.catch((err) => {
				console.log("Problems removing book:", err);
				showErrorMsg("Problems removing book")
			});
	}

	function onSetFilter(filterBy) {
		setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
	}

	if (!books)
		return (
			<div className='loading-container'>
				<div className='loading'></div>
			</div>
		);
	return (
		<section className='book-index-container'>
			<h2>Books</h2>
			<section className='book-index'>
				<BookFilter
					onSetFilter={onSetFilter}
					filterBy={filterBy}
				/>
				<div className='add-book-button'>
					<h3>You have another book to add?</h3>
					<button>
						<Link to='/book/add'>Click Here!</Link>
					</button>
				</div>
				<section>
					<Outlet />
				</section>

				{!books.length && <div>No books found...</div>}

				<div className='book-list-container'>
					<BookList
						books={books}
						onRemoveBook={onRemoveBook}
					/>
				</div>
			</section>
		</section>
	);
}
