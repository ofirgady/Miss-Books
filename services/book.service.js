import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";

const BOOK_KEY = "bookDB";
_createBooks();

export const bookService = {
	query,
	get,
	remove,
	save,
	getEmptyBook,
	getDefaultFilter,
};

// For Debug (easy access from console):
// window.cs = bookService

function query(filterBy = {}) {
	return storageService.query(BOOK_KEY).then((books) => {
		if (filterBy.title) {
			const regExp = new RegExp(filterBy.title, "i");
			books = books.filter((book) => regExp.test(book.title));
		}

		if (filterBy.price) {
			books = books.filter((book) => book.listPrice.amount <= filterBy.price);
		}

		if (filterBy.onSale) {
			books = books.filter((book) => book.listPrice.isOnSale);
		}

		return books;
	});
}

function get(bookId) {
	return storageService.get(BOOK_KEY, bookId).then(_setNextPrevBookId);
}

function remove(bookId) {
	return storageService.remove(BOOK_KEY, bookId);
}

function save(book) {
	if (book.id) {
		return storageService.put(BOOK_KEY, book);
	} else {
		const initialValues = {
			thumbnail: `../assets/img/20.jpg`,
			description: utilService.makeLorem(20),
			authors: ["John Doe"],
			publishedDate: new Date().getFullYear(),
			pageCount: 100,
			categories: ["General"],
			language: "en",
		};
		const newBook = { ...book, ...initialValues };
		return storageService.post(BOOK_KEY, newBook);
	}
}

function getEmptyBook(
	title = "",
	subtitle = "",
	description = "",
	authors = [],
	publishedDate = new Date().getFullYear(),
	pageCount = 0,
	categories = [],
	thumbnail = "",
	language = "en",
	listPrice = { amount: 0, currencyCode: "USD", isOnSale: false }
) {
	return {
		title,
		subtitle,
		description,
		authors,
		publishedDate,
		pageCount,
		categories,
		thumbnail,
		language,
		listPrice,
	};
}

function getDefaultFilter(
	filterBy = { title: "", price: 1000, onSale: false }
) {
	return {
		title: filterBy.title,
		price: filterBy.price,
		onSale: filterBy.onSale,
	};
}

function _createBooks() {
	let storagedBooks = utilService.loadFromStorage(BOOK_KEY);
	if (!storagedBooks || !storagedBooks.length) {
		const categories = ["Love", "Fiction", "Poetry", "Computers", "Religion"];
		const books = [];
		for (let i = 0; i < 20; i++) {
			const book = {
				id: utilService.makeId(),
				title: utilService.makeLorem(2),
				subtitle: utilService.makeLorem(4),
				authors: [utilService.makeLorem(1)],
				publishedDate: utilService.getRandomIntInclusive(1950, 2024),
				description: utilService.makeLorem(20),
				pageCount: utilService.getRandomIntInclusive(20, 600),
				categories: [
					categories[
						utilService.getRandomIntInclusive(0, categories.length - 1)
					],
				],
				thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
				language: "en",
				listPrice: {
					amount: utilService.getRandomIntInclusive(80, 500),
					currencyCode: "USD",
					isOnSale: Math.random() > 0.7,
				},
			};
			books.push(book);
			_createBook(book);
		}
		utilService.saveToStorage(BOOK_KEY, books);
	}
}

function _createBook(book) {
	book.id = utilService.makeId();
	return book;
}

function _setNextPrevBookId(book) {
	return storageService.query(BOOK_KEY).then((books) => {
		const bookIdx = books.findIndex((currBook) => currBook.id === book.id);
		const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0];
		const prevBook = books[bookIdx - 1]
			? books[bookIdx - 1]
			: books[books.length - 1];
		book.nextBookId = nextBook.id;
		book.prevBookId = prevBook.id;
		return book;
	});
}
