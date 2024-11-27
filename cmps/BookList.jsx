import { BookPreview } from "./BookPreview.jsx"

const { useState, useEffect, useRef } = React

export function BookList({ books, onRemoveBook }) {
    return (
    <section className="book-list">
        {books.map(book =>
        <BookPreview key={book.id} book={book} onRemoveBook={onRemoveBook} />
        )}
    </section>
    )
}

