
import { AboutUs } from "./pages/AboutUs.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { Home } from "./pages/Home.jsx"
import {BookEdit} from "./pages/BookEdit.jsx"
const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

export function RootCmp() {
    return (
        <Router>

            <section className="app main-layout">
                <AppHeader />
                    <main>
                    <Routes>
                        <Route path="/" navigateTo={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/book/edit" element={<BookEdit />}/>
                        <Route path="/book/edit/:bookId" element={<BookEdit />}/>
                        <Route path="*" element={<Home />} />
                    </Routes>
                    </main>
            </section>
        </Router>
    )
}