import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooks, addToCart } from "../../store/actions/booksAction";
import Card from "../../components/cards/card";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import {CardProps} from "../../interfaces/typeInterfaces"

function BookStore() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countRef = useRef(1);
  const bookList = useSelector((state: any) => state.books.bookList.data);

  useEffect(() => {
    getBooks()(dispatch);
  }, []);

  const navigationCallBack = (isbn: string) => {
    navigate("/details", { state: { isbn: isbn } });
  };

  const addToCard = (data:CardProps) => {
    addToCart({ ...data, count: countRef.current })(dispatch);
  }; 

  const updateCount = (count: number) => {
    countRef.current = count;
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-2 gap-4 md:justify-items-center sm:grid-cols-1">
        {bookList &&
          bookList.map((data: CardProps) => (
            <div key={data.isbn13} onClick={()=>navigationCallBack(data.isbn13)}>
              <Card {...data} firstCallBackFunction={()=>addToCard(data)} counterCallBackFunction={updateCount}/>
            </div>
          ))}
      </div>
    </>
  );
}

export default BookStore;
