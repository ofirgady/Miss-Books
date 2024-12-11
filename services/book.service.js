import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";

const BOOK_KEY = "bookDB";
_createBooks();
const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

export const bookService = {
	query,
	get,
	remove,
	save,
	getEmptyBook,
	getDefaultFilter,
	addReview,
	queryGoogleBooks,
	addGoogleBook,
	removeReview,
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
			thumbnail: `http://coding-academy.org/books-photos/1.jpg`,
			description: utilService.makeLorem(20),
			authors: ["John Doe"],
			publishedDate: new Date().getFullYear(),
			pageCount: 100,
			categories: ["General"],
			language: "en",
			reviews: [],
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
	listPrice = { amount: 0, currencyCode: "USD", isOnSale: false },
	reviews = []
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
		reviews,
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

function addReview(bookId, review) {
	return storageService.get(BOOK_KEY, bookId).then((book) => {
		review.id = utilService.makeId();
		book.reviews.unshift(review);
		return save(book).then(() => review);
	});
}

function removeReview(bookId, reviewId) {
	return storageService.get(BOOK_KEY, bookId).then((book) => {
		book.reviews = book.reviews.filter((review) => review.id !== reviewId);
		return save(book);
	});
}

async function queryGoogleBooks(searchValue) {
	try {
		const url = `${GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(searchValue)}`;
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to fetch books: ${response.statusText}`);
		}
		const data = await response.json();
		return data || [];
	} catch (error) {
		console.error("Error fetching books from Google Books API:", error);
		throw error; // Rethrow error to be handled by the caller
	}
}

function _transformBook(item) {
	const { id, volumeInfo } = item;
	const {
		title = "No Title", // Default value if title is missing
		description = "No Description", // Default value if description is missing
		authors = [], // Default to an empty array if authors is undefined
		publishedDate = "Unknown",
		pageCount = 0,
		categories = [], // Default to an empty array if categories is undefined
		imageLinks = {}, // Default to an empty object if imageLinks is undefined
	} = volumeInfo;
	return {
		id,
		title: title,
		subtitle: "",
		description: description,
		authors: [...authors],
		publishedDate: publishedDate,
		pageCount: pageCount,
		categories: [...categories],
		thumbnail: imageLinks.thumbnail,
		language: "en",
		listPrice: {
			amount: Math.floor(Math.random() * 1001),
			currencyCode: "USD",
			isOnSale: false,
		},
		reviews: [],
	};
}

async function addGoogleBook(item) {
	return storageService.query(BOOK_KEY).then((books) => {
		const isBookExists = books.some(book => book.id === item.id);
		if (isBookExists) {
			throw Error('The book already exists in the Library')
		} else {
			const book = _transformBook(item);
			return storageService.post(BOOK_KEY, book);
		}
	});
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
				reviews: [],
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
