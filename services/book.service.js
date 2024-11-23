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

function getEmptyBook(title = '', description = '', thumbnail = '', listPrice = {}) {
    return { title, description, thumbnail , listPrice }
}

function getDefaultFilter(filterBy = { txt: '', price: 1000 }) {
    return { txt: filterBy.txt, price: filterBy.price }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        const titles = ['Gwent', 'Between here and gone', 'Magic latern']
        const listPrices = [ {amount: 59, currencyCode: "EUR", isOnSale: false} , {amount: 102, currencyCode: "EUR", isOnSale: true} , {amount: 72, currencyCode: "NIS", isOnSale: false}]
        for (let i = 0; i < 3; i++) {
            books.push(_createBook(
                titles[i], 
                utilService.makeLorem(20), 
                `../assets/img/${i+1}.jpg`, 
                listPrices[i]
            ))
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, description, thumbnail, listPrice) {
    const book = getEmptyBook(title,description,thumbnail, listPrice)
    book.id = utilService.makeId()
    return book
}
