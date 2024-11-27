import { bookService } from "../services/book.service.js";
import { BookDetails } from "./BookDetails.jsx";
import { BookFilter } from "./BookFilter.jsx";
import { BookList } from "./bookList.jsx";
const { useState, useEffect, useRef} = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(()=>{
        loadBooks()
        }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
        .then(setBooks)
        .catch(err => {
            console.log('Problems getting books:', err)
        })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('Problems removing book:', err)
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({...prevFilter, ...filterBy }))
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
                <h2>Books</h2>
                    <section >
                        <BookFilter onSetFilter={onSetFilter} defaultFilter={filterBy}/>
                        <button><Link to="/book/edit">Add</Link></button>

                        {!books.length && <div>No books found...</div>}

                        <div className="book-list-container">
                            <BookList books={books} onRemoveBook={onRemoveBook} />
                        </div>

                    </section>
        </section>
    )
}

