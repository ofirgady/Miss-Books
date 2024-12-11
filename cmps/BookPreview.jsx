const { Link } = ReactRouterDOM;
export function BookPreview({ book, onRemoveBook }) {

	function onRemoveBookHandler() {
		onRemoveBook(book.id);
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

	return (
		<div className='book-preview-container'>
			{book.listPrice.isOnSale && (
					<h1 className='book-is-on-sale'>ON SALE!</h1>
			)}
			<div className='book-preview-details'>
				<div className="book-preview-detail">
					<h2>
						{book.title} ({book.publishedDate})
					</h2>
				</div>
				<div className="book-preview-detail">
					{book.authors && (
						<h4 key={book.authors[0]}>{`By ${authorsDisplayHandler(
							book
						)}`}</h4>
					)}
				</div>
				<div className="book-preview-detail">
					<h4>{book.subtitle}</h4>
				</div>
				<div className="book-preview-detail">
					<h3>{`Price: ${book.listPrice.amount} ${book.listPrice.currencyCode}`}</h3>
				</div>
				<div className='book-preview-buttons'>
					<button onClick={onRemoveBookHandler}>Remove</button>
					<button>
						<Link to={`/book/${book.id}`}>Details</Link>
					</button>
					<button>
						<Link to={`/book/edit/${book.id}`}>Edit</Link>
					</button>
				</div>
			</div>
			<img
				src={book.thumbnail}
				alt={book.title}
			/>
		</div>
	);
}
