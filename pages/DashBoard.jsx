const { useEffect, useState } = React;
import { Chart } from "../cmps/Chart.jsx";
import { bookService } from "../services/book.service.js";

export function Dashboard() {
    const [books, setBooks] = useState([]);
	const [categoriesStats, setCategoriesStats] = useState([]);

	useEffect(() => {
        bookService.query().then(setBooks);
        bookService.getCategoriesStats().then(data => {
            console.log(data); // Debugging the data format
            setCategoriesStats(data);
        });
    }, []);

	return (
		<section className='dashboard'>
			<h1>Dashboard</h1>
			<h2>Statistics for {books.length} Books</h2>
			<h4>By Categories</h4>
			<Chart data={categoriesStats} />
		</section>
	);
}
