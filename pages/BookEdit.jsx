import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) {
            loadBook()
        }
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => {
                console.log('Problem getting book', err);
            })
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        let transformedValue;
        switch (target.type) {
            case 'range':
            case 'number':
                transformedValue = +value
                break
            case 'checkbox':
                transformedValue = target.checked
                break
            default:
                transformedValue = value
        }
        if (field === 'listPrice') {
            setBookToEdit((prevBook) => ({ ...prevBook, [field]: {...listPrice, amount: transformedValue} }))
        } else
        {
            setBookToEdit((prevBook) => ({ ...prevBook, [field]: transformedValue }))
        }
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => navigate('/book'))
            .catch(err => {
                console.log('Cannot save!', err)
            })

    }

    const {title, listPrice} = bookToEdit
    // const {amount, currencyCode, is} = listPrice
    return (
        <section className="car-edit">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">title</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="listPrice">price</label>
                <input onChange={handleChange} value={listPrice.amount} type="number" name="listPrice" id="listPrice" />
                <button>Save</button>
            </form>
        </section>
    )
}

