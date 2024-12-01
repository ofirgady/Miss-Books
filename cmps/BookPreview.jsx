const { useState, useEffect, useRef } = React;
const { Link } = ReactRouterDOM;
export function BookPreview({ book, onRemoveBook }) {
	function onRemoveBookHandler() {
		onRemoveBook(book.id);
	}
	return (
		<div className='book-preview-container'>
			<section className='book-preview'>
				<div className='book-preview-details'>
					{book.listPrice.isOnSale && (
						<div className='book-detail'>
							<h1 className='book-is-on-sale'>ON SALE!</h1>
						</div>
					)}
					<div>
						<h2>{book.title}</h2>
					</div>
					<div>
						<h4>{book.subtitle}</h4>
					</div>
					<div>
						<h3>Author: </h3>
						{book.authors && book.authors.map((author) => (
							<h4 key={book.id + author}>{author}</h4>
						))}
					</div>
					<div>
						<h3>{`Price - ${book.listPrice.amount} ${book.listPrice.currencyCode}`}</h3>
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
			</section>
			
			<img
				src={book.thumbnail}
				alt={book.title}
			/>
		</div>
	);
}
