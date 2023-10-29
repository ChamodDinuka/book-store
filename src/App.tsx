import BookStore from "./views/bookStrore/bookStore";
import BookDetails from "./views/bookDetails/bookDetails"
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BookStore />} />
        <Route path="/details" element={<BookDetails />} />
      </Routes>
    </div>
  );
}

export default App;
