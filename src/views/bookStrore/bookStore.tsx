import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooks, addToCart, searchBooks } from "../../store/actions/booksAction";
import Card from "../../components/cards/card";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import { CardProps } from "../../interfaces/typeInterfaces";
import Cart from "../../components/cart/cart";

function BookStore() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countRef = useRef(1);
  const searchRef = useRef("");
  const bookList = useSelector((state: any) => state.books.bookList.data);

  useEffect(() => {
    getBooks()(dispatch);
  }, []);

  const navigationCallBack = (isbn: string) => {
    navigate("/details", { state: { isbn: isbn } });
  };

  const addToCard = (data: CardProps) => {
    addToCart({ ...data, count: countRef.current })(dispatch);
  };

  const updateCount = (count: number) => {
    countRef.current = count;
  };

  const findBooks = (event: React.KeyboardEvent<HTMLInputElement>) =>{
    if (event.key === 'Enter') {
        if(searchRef.current.match(/^\s*$/) === null){
            searchBooks(searchRef.current)(dispatch);
        }else{
            getBooks()(dispatch);
        }
      }
  }

  return (
    <>
      <Header />
      <div className="flex justify-end p-2 sticky top-0">
        <div className="max-w-sm items-center flex p-2">
          <div className="relative rounded-full bg-gray-200 p-2 pl-4">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none placeholder-gray-500 w-full"
              onChange={(e)=>{searchRef.current=e.target.value}}
              onKeyDown={findBooks}
            />
          </div>
        </div>
        <Cart />
      </div>
      <div className="grid grid-cols-2 gap-4 md:justify-items-center sm:grid-cols-1">
        {bookList &&
          bookList.map((data: CardProps) => (
            <div className=" hover:cursor-pointer" key={data.isbn13} onClick={() => navigationCallBack(data.isbn13)}>
              <Card {...data} firstCallBackFunction={() => addToCard(data)} counterCallBackFunction={updateCount} />
            </div>
          ))}
      </div>
    </>
  );
}

export default BookStore;
