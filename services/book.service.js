import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
}

// For Debug (easy access from console):
// window.cs = BookService

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.vendor))
            }

            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount <= filterBy.price)
            }

            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', listPrice = {}) {
    return { title, listPrice }
}

function getDefaultFilter(filterBy = { txt: '', price: 1000 }) {
    return { txt: filterBy.txt, price: filterBy.price }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        const titles = ['The Maze Runner', 'Harry Potter', '7']
        const listPrices = [ {amount: 109, currencyCode: "EUR", isOnSale: false} , {amount: 12, currencyCode: "EUR", isOnSale: true} , {amount: 302, currencyCode: "NIS", isOnSale: false}]
        for (let i = 0; i < 3; i++) {
            books.push(_createBook(titles[i], listPrices[i]))
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, listPrice) {
    const book = getEmptyBook(title, listPrice)
    book.id = utilService.makeId()
    return book
}
