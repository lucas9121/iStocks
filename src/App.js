import Header from "./components/Header"
import Nav from "./components/Nav"
import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Stock from "./pages/Stock"

export default function App() {
    return (
        <div className="App">
            <Header />
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stocks" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/stocks/:symbol" element={<Stock />} />
            </Routes>

        </div>
    )
}