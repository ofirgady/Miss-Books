import { bookService } from "../services/book.service.js";

const { useState, useEffect, useRef } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
//    const {bookId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId)
        .then(setBook)
        .catch(err => {
        console.error('err:', err)
        showErrorMsg('Cannot load book')
        navigate('/book')
        })
    }

    function onBack() {
        navigate('/book')
    }


        if (!book) return <div>Loading...</div>
        return (
            <section className="book-details">
                <h1>Book Name: {book.title}</h1>
                <h1>Book Description: {book.description}</h1>
                <h1>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h1>
                <img src={book.thumbnail} alt={book.title} />
                <div className="buttons">
                <button>
                    <Link to={`/book/${book.prevBookId}`}>Previous book</Link>
                </button>
                <button>
                    <Link to={`/book/${book.nextBookId}`}>Next book</Link>
                </button>
                </div>
                <button onClick={onBack}>Back</button>
            </section>
        )
    
}

