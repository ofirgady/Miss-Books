const { useState, useEffect, useRef } = React

export function BookPreview({book}) {
    return (
        <section className="book-preview">
            <div className="book-details">

            <h2>{book.title}</h2>
            <h3>{`Price - ${book.listPrice.amount} ${book.listPrice.currencyCode}`}</h3>
            <h3>{`Description - ${book.description}`}</h3>
            {/* <span>{book.listPrice.amount} </span>
            <span>{book.listPrice.currencyCode}</span> */}
            {/* <br /> */}
            <h3>{`On Sale - ${book.listPrice.isOnSale ? "Yes" : "No"}`}</h3>
            </div>
            {/* <span>{book.listPrice.isOnSale ? "Yes" : "No"}</span> */}
            <img src={book.thumbnail} alt={book.title} />
       </section>
    )
}

