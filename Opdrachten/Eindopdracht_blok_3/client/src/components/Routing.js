import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import WordleSuggestions from "../pages/WordleSuggestions";

function Routing () {
    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wordle" element={<WordleSuggestions />} />
    </Routes>
}

export default Routing;