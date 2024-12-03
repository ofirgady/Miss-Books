import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemoveBook }) {
    return (
    <section className="book-list">
        {books && books.map(book =>
        <BookPreview key={book.id} book={book} onRemoveBook={onRemoveBook} />
        )}
    </section>
    )
}

