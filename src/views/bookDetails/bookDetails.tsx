import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getBookDetails, addToCart } from "../../store/actions/booksAction";
import Header from "../../components/header/header";
import Cart from "../../components/cart/cart";
import Button from "../../components/buttons/button";
import { useTranslation } from "react-i18next";
import { CardProps } from "../../interfaces/typeInterfaces";

function BookDetails() {
  const dispatch = useDispatch();
  const countRef = useRef(1);
  const location = useLocation();
  const cart = useSelector((state: any) => state.books.cart.data);
  const selectedBook = useSelector((state: any) => state.books.selectedBook.data);
  const isLoading = useSelector((state: any) => state.books.selectedBook.isloading);
  const { t } = useTranslation();

  useEffect(() => {
    getBookDetails(location.state.isbn)(dispatch);
  }, []);

  const addToCard = () => {
    const total = getTotal();
    addToCart({ ...selectedBook, count: countRef.current },total)(dispatch);
  };

  const getTotal = ():number =>{
    const price = Number(selectedBook.price.substring(1));
    const preTotal = cart?.reduce((accumulator:number, currentValue:CardProps) => {
        if(currentValue.count){
        return accumulator + (currentValue.count*Number(currentValue.price.substring(1)));
        }
      }, 0);
    const total = preTotal + (price*countRef.current);
    return total;
  }

  const updateCount = (count: number) => {
    countRef.current = count;
  };

  return (
    <>
      <Header />
      <div className="flex justify-end p-2 sticky top-0">
        <Cart />
      </div>
      {selectedBook && !isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
          <div className="flex flex-row sm:flex-col">
            <div className="shrink-0 justify-center items-center flex">
              <img className="h-45 w-45" src={selectedBook.image} alt="ChitChat Logo" />
            </div>
            <div className="flex flex-col justify-center sm:text-center sm:p-2">
              <div className="text-xl font-medium text-black">{selectedBook.title}</div>
              <p className="text-slate-500 font-medium">{selectedBook.subtitle}</p>
              <p className="text-slate-500">ISBN: {selectedBook.isbn13}</p>
              <p className="text-slate-500">Price: {selectedBook.price}</p>
              <p className="text-slate-500">{selectedBook.authors}</p>
              <p className="text-slate-500">{selectedBook.year}</p>
              <p className="text-slate-500">{selectedBook.desc}</p>
            </div>
          </div>
          <div className=" flex justify-center items-center">
            <div className="flex flex-col items-end w-fit gap-4 sm:items-center">
              <input
                className="pl-1 border-2 border-gray-700 w-12 rounded-sm"
                type="number"
                min={1}
                defaultValue={1}
                onChange={(e) => {
                  updateCount(Number(e.target.value));
                }}
              />
              <Button label={t("label.Add_to_cart")} callBackFunction={addToCard} />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}

export default BookDetails;
