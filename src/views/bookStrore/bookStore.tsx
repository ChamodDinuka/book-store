import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooks, addToCart, searchBooks, setAlert } from "../../store/actions/booksAction";
import Card from "../../components/cards/card";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import { CardProps } from "../../interfaces/typeInterfaces";
import Cart from "../../components/cart/cart";
import { useTranslation } from "react-i18next";

function BookStore() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const counter = useRef<Array<{ key: string; value: number }>>([]);
  const searchRef = useRef("");
  const { t } = useTranslation();
  const cart = useSelector((state: any) => state.books.cart.data);
  const bookList = useSelector((state: any) => state.books.bookList.data);
  const isLoading = useSelector((state: any) => state.books.bookList.isloading);

  useEffect(() => {
    getBooks()(dispatch);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      bookList &&
        bookList.forEach((data: CardProps) => {
          counter.current.push({ key: data.isbn13, value: data.count || 1 });
        });
    }
  }, [isLoading]);

  const navigationCallBack = (isbn: string) => {
    navigate("/details", { state: { isbn: isbn } });
  };

  const addToCard = (data: CardProps) => {
    let count: number = 1;
    for (const item of counter.current) {
      if (item.key === data.isbn13) {
        count = item.value;
        break;
      }
    }
    const total = getTotal(data, count);
    addToCart({ ...data, count: count }, total)(dispatch);
    setAlert(t("alert.Item_added_successfully"),true)(dispatch);
  };

  const getTotal = (data: CardProps, count: number): number => {
    const price = Number(data.price.substring(1));
    const preTotal = cart?.reduce((accumulator: number, currentValue: CardProps) => {
      if (currentValue.count) {
        return accumulator + currentValue.count * Number(currentValue.price.substring(1));
      }
    }, 0);
    const total = preTotal + price * count;
    return total;
  };

  const updateCount = (count: number, isbn: string) => {
    for (const item of counter.current) {
      if (item.key === isbn) {
        item.value = count;
        break;
      }
    }
  };

  const findBooks = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (searchRef.current.match(/^\s*$/) === null) {
        searchBooks(searchRef.current)(dispatch);
      } else {
        getBooks()(dispatch);
      }
    }
  };

  return (
    <>
      <Header title={t("header.Book_store")}/>
      <div className="flex justify-end p-2 sticky top-0">
        <div className="max-w-sm items-center flex p-2">
          <div className="relative rounded-full bg-gray-200 p-2 pl-4">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none placeholder-gray-500 w-full"
              onChange={(e) => {
                searchRef.current = e.target.value;
              }}
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
