import { bookService } from "../services/book.service.js";
import { BookList } from "./bookList.jsx";

const { useState, useEffect, useRef} = React

export function BookIndex() {

    const [books, setBooks] = useState([]);

    // const { carId } = useParams()
    // const navigate = useNavigate()

    useEffect(()=>{
        bookService.query()
        .then(setBooks)
        }, [])

    return (
        <section className="books">
            <h2>Books</h2>
            <div className="book-list-container">
                <BookList books={books} />
            </div>
       </section>
    )
}

