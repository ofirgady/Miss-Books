import { bookService } from "../services/book.service.js";
import { LongText } from "../cmps/LongText.jsx"
const { useState, useEffect } = React;
const { useParams, useNavigate, Link } = ReactRouterDOM;

export function BookDetails() {
	const [book, setBook] = useState(null);
	const params = useParams();
	//    const {bookId} = useParams()
	const navigate = useNavigate();
	const currentYear = new Date().getFullYear();
	let amountClass;

	useEffect(() => {
		loadBook();
	}, [params.bookId]);

	function loadBook() {
		bookService
			.get(params.bookId)
			.then(setBook)
			.catch((err) => {
				console.error("err:", err);
				showErrorMsg("Cannot load book");
				navigate("/book");
			});
	}

	function onBack() {
		navigate("/book");
	}

	function authorsDisplayHandler(book) {
		let bookAuthors = "";
		if (book.authors.length === 1) {
			bookAuthors = book.authors[0];
		} else {
			for (let i = 0; i < book.authors.length - 1; i++) {
				bookAuthors += `${book.authors[i]},`;
			}
			bookAuthors += ` and ${bookAuthors[bookAuthors.length - 1]}`;
		}
		return bookAuthors;
	}

	if (!book)
		return (
			<div className='loading-container'>
				<div className='loading'></div>
			</div>
		);

	if (book) {
		const price = book.listPrice.amount;
		if (price > 150) {
			amountClass = "high-price";
		} else if (price < 50) {
			amountClass = "low-price";
		} else {
			amountClass = "";
		}
	}
	return (
		<section className='book-details'>
			<div className='book-details-data'>
				<div className='book-detail'>
					<h2>{book.title}</h2>
					{book.authors && (
						<h4 key={book.authors[0]}>{`By ${authorsDisplayHandler(
							book
						)}`}</h4>
					)}
					<h1>{book.subtitle}</h1>
				</div>
				<div className='book-detail'>
					<h2>About the book: </h2>
					{book.description && <LongText txt={book.description} length={50}/> }
				</div>
				<div className='book-detail'>
					<h2>Book's language:</h2>
					<h1>{book.language}</h1>
				</div>
				<div className='book-difficulity'>
					{book.pageCount > 500 && (
						<h2 style={{ backgroundColor: "lightcoral" }}>Serious Reading</h2>
					)}
					{book.pageCount < 500 && book.pageCount > 200 && (
						<h2 style={{ backgroundColor: "yellow" }}>Descent Reading</h2>
					)}
					{book.pageCount < 200 && (
						<h2 style={{ backgroundColor: "lightgreen" }}>Light Reading</h2>
					)}
				</div>
				<div className='book-detail'>
					<h2>New / Vintage: </h2>
					{currentYear - book.publishedDate > 10 ? (
						<h3>Vintage</h3>
					) : (
						<h3>New</h3>
					)}
				</div>
				<div className='book-detail'>
					<h2>Price: </h2>
					<h1 className={amountClass}>
						{book.listPrice.amount} {book.listPrice.currencyCode}
					</h1>
				</div>
				{book.listPrice.isOnSale && (
					<div className='book-detail'>
						<h2 className='book-is-on-sale'>ON SALE!</h2>
					</div>
				)}
			</div>
			<div className='img-container'>
				<img
					src={book.thumbnail}
					alt={book.title}
				/>
			</div>
			<div className='book-details-buttons'>
				<button>
					<Link to={`/book/${book.prevBookId}`}>Previous book</Link>
				</button>
				<button>
					<Link to={`/book/${book.nextBookId}`}>Next book</Link>
				</button>
				<button onClick={onBack}>Back to the library</button>
			</div>
		</section>
	);
}
