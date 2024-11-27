const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM
export function BookPreview({book, onRemoveBook}) {
    
    function onRemoveBookHandler() {
        onRemoveBook(book.id)
    }
    return (
        <div className="book-preview-container">

            <section className="book-preview">
                <div className="book-details">
                    <h2>{book.title}</h2>
                    <h3>{`Price - ${book.listPrice.amount} ${book.listPrice.currencyCode}`}</h3>
                    <h3>{`On Sale - ${book.listPrice.isOnSale ? "Yes" : "No"}`}</h3>
                </div>
                <img src={book.thumbnail} alt={book.title} />
            </section>
            <footer className="book-preview-footer">
                <button onClick={onRemoveBookHandler}>Remove</button>
                <button><Link to={`/book/${book.id}`}>Details</Link></button>
                <button><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
            </footer>
        </div>
    )
}

