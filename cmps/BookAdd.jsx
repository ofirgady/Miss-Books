import { bookService } from "../services/book.service.js";
import { showErrorMsg } from "../services/event-bus.service.js";
import { utilService } from "../services/util.service.js";

const { useState, useEffect, useRef } = React;
const { Link, useNavigate } = ReactRouterDOM;
const cache = {};

export function BookAdd() {
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState("");
	const [results, setResults] = useState([]);

	// const handleBookSearch = useRef(utilService.debounce(searchBooks, 2000))

	function handleChange({ target }) {
		setSearchValue(target.value);
	}

	useEffect(() => {
		if (!searchValue.trim()) {
			setResults([]);
			return;
		}

		const timeoutId = setTimeout(() => {
			// Check if the data is in the cache
			if (cache[searchValue]) {
				setResults(cache[searchValue]); // Use cached data
			} else {
				// Fetch from the API if not in the cache
				searchBooks(searchValue);
			}
		}, 300); // Debounce for 300ms
		console.log(results);
		return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
	}, [searchValue]);

	async function searchBooks(query) {
	//async function searchBooks({target}) {
	//send to service target.value
		try {
			const items = await bookService.queryGoogleBooks(query);
		
			setResults(items);
		} catch (err) {
			console.error("Error fetching books:", err);
		}
	}

	async function handleAddBook(item) {
		try {
			const addedBook = await bookService.addGoogleBook(item);
            if (addedBook && addedBook !== undefined) {
                showSuccessMsg(`${addedBook.title} added successfully`);
                navigate("/book"); // Redirect to the index page
            }
		} catch (err) {
			showErrorMsg(err.message);
		}
	}

	function handleCloseButton() {
		navigate("/book");
	}

	return (
		<section className='add-book'>
			<h2>Add Books from Google</h2>
			<button
				onClick={handleCloseButton}
				className='add-book-close-button'>
				x
			</button>
			<form>
				<input
					type='text'
					placeholder='Search for books...'
					value={searchValue}
					onChange={handleChange}
					// onChange={handleBookSearch.current}
				/>
			</form>
			<ul>
				{results &&
					results.map((item) => (
						<li key={item.id}>
							{item.volumeInfo.title}
							<button onClick={() => handleAddBook(item)}>+</button>
						</li>
					))}
			</ul>
		</section>
	);
}
