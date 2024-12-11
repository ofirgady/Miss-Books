
import { AboutUs } from "./pages/AboutUs.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { Home } from "./pages/Home.jsx"
import {BookEdit} from "./pages/BookEdit.jsx"
import { AboutMission } from "./cmps/AboutCmps/AboutMission.jsx"
import { AboutTeam } from "./cmps/AboutCmps/AboutTeam.jsx"
import { AboutStory } from "./cmps/AboutCmps/AboutStory.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { BookAdd } from "./cmps/BookAdd.jsx"
const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM


export function RootCmp() {

    return (
        <Router>

            <section className="app main-layout">
                <AppHeader />
                    <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<AboutUs />} >
                            <Route element={<AboutMission />} path="/about/mission" />
                            <Route element={<AboutTeam />} path="/about/team" />
                            <Route element={<AboutStory />} path="/about/story" />
                        </Route>
                        <Route path="/book" element={<BookIndex />} >
                        <Route element={<BookAdd />} path="/book/bookAdd" />
                        </Route>
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/book/edit" element={<BookEdit />}/>
                        <Route path="/book/edit/:bookId" element={<BookEdit />}/>
                        <Route path="*" element={<Home />} />
                    </Routes>
                    </main>
                    <UserMsg />
            </section>
        </Router>
    )
}