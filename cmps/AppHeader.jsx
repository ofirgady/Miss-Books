const { NavLink } = ReactRouterDOM

export function AppHeader() {

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>Miss Books</h1>
                <nav className="app-nav">
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/about">About us</NavLink>
                <NavLink to="/book">Books</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                </nav>
            </section>
        </header>
    )
}
