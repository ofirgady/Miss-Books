import { BookPreview } from "./BookPreview";

const { useState, useEffect, useRef } = React

export function BookList({ books, onRemoveBook }) {
    console.log("list of books frrom BookList", books);
    return (
    <section className="book-list">
        {books && books.map(book =>
        <BookPreview key={book.id} book={book} onRemoveBook={onRemoveBook} />
        )}
    </section>
    )
}

