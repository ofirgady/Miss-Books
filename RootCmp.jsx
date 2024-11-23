
import { AboutUs } from "./cmps/AboutUs.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookDetails } from "./cmps/BookDetails.jsx"
import { BookIndex } from "./cmps/BookIndex.jsx"
import { Home } from "./cmps/Home.jsx"
const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

export function RootCmp() {
    return (
        <Router>

            <section className="app main-layout">
                <AppHeader />
                    <main>
                    <Routes>
                        <Route path="/" navigatTo={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/books" element={<BookIndex />} />
                        <Route path="/books/:bookId" component={BookDetails} />
                    </Routes>
                    </main>
            </section>
        </Router>
    )
}