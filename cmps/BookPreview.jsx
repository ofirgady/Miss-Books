const { useState, useEffect, useRef } = React

export function BookPreview({book}) {
    return (
        <section className="book-preview">
            <h2>{book.title}</h2>
            <span>Price - </span>
            <span>{book.listPrice.amount} </span>
            <span>{book.listPrice.currencyCode}</span>
            <br />
            <span>On Sale - </span>
            <span>{book.listPrice.isOnSale ? "Yes" : "No"}</span>
       </section>
    )
}

