import { useEffect, useRef } from "react";
import Header from "../../components/header/header";
import { useDispatch, useSelector } from "react-redux";
import { CardProps } from "../../interfaces/typeInterfaces";
import Card from "../../components/cards/card";
import { deleteToCart, setAlert, updateToCart } from "../../store/actions/booksAction";
import { useTranslation } from "react-i18next";
import EmptyScreen from "../../components/emptyScreen/emptyScreen";
import Home from "../../assets/icons8-home.svg";
import { useNavigate } from "react-router-dom";

function MyCart() {
  const cartList = useSelector((state: any) => state.books.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const counter = useRef<Array<{ key: string; value: number }>>([]);

  useEffect(() => {
    cartList.data.forEach((data: CardProps) => {
      counter.current.push({ key: data.isbn13, value: data.count || 1 });
    });
  }, []);

  const updateCard = (data: CardProps) => {
    let count: number = 1;
    for (const item of counter.current) {
      if (item.key === data.isbn13) {
        count = item.value;
        break;
      }
    }
    const total = getTotal(data, count);
    updateToCart({ ...data, count: count }, total)(dispatch);
    setAlert(t("alert.Item_updated_successfully"), true)(dispatch);
  };

  const getTotal = (data: CardProps, count: number): number => {
    const price = Number(data.price.substring(1));
    const preTotal = cartList?.data.reduce((accumulator: number, currentValue: CardProps) => {
      if (currentValue.count) {
        return accumulator + currentValue.count * Number(currentValue.price.substring(1));
      }
    }, 0);
    const deduction = Number(data.price.substring(1)) * (data.count || 1);
    const total = preTotal + price * count - deduction;
    return Math.round(total * 100) / 100;
  };

  const updateCount = (count: number, isbn: string) => {
    for (const item of counter.current) {
      if (item.key === isbn) {
        item.value = count;
        break;
      }
    }
  };

  const deleteCart = (data: CardProps) => {
    const newList = cartList?.data.filter((obj: CardProps) => obj.isbn13 !== data.isbn13);
    const total = newList?.reduce((accumulator: number, currentValue: CardProps) => {
      if (currentValue.count) {
        return accumulator + currentValue.count * Number(currentValue.price.substring(1));
      }
    }, 0);
    deleteToCart({ ...data }, total)(dispatch);
    setAlert(t("alert.Item_removed_successfully"), true)(dispatch);
  };

  const navigation = () => {
    navigate("/");
  };

  return (
    <>
      <Header title={t("header.My_cart")} />
      <div className="shrink-0 mt-4 ml-20 sm:ml-4">
        <img className="h-11 w-11 cursor-pointer" src={Home} alt="ChitChat Logo" onClick={navigation} />
      </div>
      {cartList.data.length !== 0 ? (
        <div className="grid grid-cols-2 gap-4 md:justify-items-center sm:grid-cols-1">
          <div className="flex flex-col pt-4 overflow-y-auto max-h-screen ">
            {cartList.data &&
              cartList.data.map((data: CardProps) => (
                <div className="p-2" key={data.isbn13}>
                  <Card
                    {...data}
                    firstCallBackFunction={() => updateCard(data)}
                    secondCallBackFunction={() => deleteCart(data)}
                    counterCallBackFunction={updateCount}
                  />
                </div>
              ))}
          </div>
          <div className=" text-2xl pt-4 sm: text-center">
            <p>Total :${cartList.totalPrice}</p>
          </div>
        </div>
      ) : (
        <EmptyScreen />
      )}
    </>
  );
}

export default MyCart;
