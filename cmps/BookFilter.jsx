const { useState, useEffect, useRef } = React;

export function BookFilter({ defaultFilter, onSetFilter }) {

	const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter);
	const [tempPrice, setTempPrice] = useState(filterByToEdit.price); // Temporary state for the range slider


	useEffect(() =>  {
		// debounce
		const timeout = setTimeout(() => {
			onSetFilter(filterByToEdit);
		}, 300);

		return () => clearTimeout(timeout);
	}, [filterByToEdit]);

	function handleChange({ target }) {
		const { value, name: field } = target;
		let transformedValue;
		switch (target.type) {
			case "range":
			case "number":
				transformedValue = +value;
				break;
			case "checkbox":
				transformedValue = target.checked;
				break;
			default:
				transformedValue = value;
		}
		setFilterByToEdit((prevFilter) => ({
			...prevFilter,
			[field]: transformedValue,
		}));

		if (field === "price") {
			setTempPrice(transformedValue);
		}
	}

	function onSubmitFilter(ev) {
		ev.preventDefault();
		onSetFilter(filterByToEdit);
	}

	const { title, price, onSale } = filterByToEdit;
	return (
		<section className='book-filter'>
			<h2>Filter Our Books</h2>
			<br />
			<form
				onSubmit={onSubmitFilter}
				className='book-filter-form'>
				<div className='filter-input'>
					<label htmlFor='title'>Book's name</label>
					<input
						value={title}
						onChange={handleChange}
						type='text'
						name='title'
						id='title'
					/>
				</div>

				<div className='filter-input'>
					<label htmlFor='price'>Max Price</label>
					<input
						min='0'
						max='1000'
						value={tempPrice}
						onChange={handleChange}
						type='range'
						name='price'
						id='price'
					/>
					<span>{price}</span>
				</div>

                <div className='filter-input'>
					<label htmlFor='onSale'>Only Books On Sale</label>
					<input
						value={onSale}
						onChange={handleChange}
						type='checkbox'
						name='onSale'
						id='onSale'
					/>
				</div>

				<button>Submit</button>
			</form>
		</section>
	);
}
