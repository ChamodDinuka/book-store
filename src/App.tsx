import BookStore from "./views/bookStrore/bookStore";
import BookDetails from "./views/bookDetails/bookDetails";
import MyCart from "./views/myCart/myCart";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import Alert from "./components/alert/alert";

function App() {
  const show = useSelector((state: any) => state.books.alert.show);

  return (
    <div>
      {show ? <Alert /> : ""}
      <Routes>
        <Route path="/" element={<BookStore />} />
        <Route path="/details" element={<BookDetails />} />
        <Route path="/cart" element={<MyCart />} />
      </Routes>
    </div>
  );
}

export default App;
