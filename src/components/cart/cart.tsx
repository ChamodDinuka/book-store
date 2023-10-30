import { useSelector } from "react-redux";
import {CardProps} from "../../interfaces/typeInterfaces"
import { useNavigate } from "react-router-dom";

function Cart() {
  const cartData = useSelector((state: any) => state.books.cart);
  const navigate = useNavigate();
  const sum = cartData.data?.reduce((accumulator:number, currentValue:CardProps) => {
    if(currentValue.count){
    return accumulator + currentValue.count;
    }
  }, 0);

  const navigation = () => {
    navigate("/cart");
  };
  
  return (
    <div className="h-auto rounded-full border-black w-fit flex-col text-center p-4 border hover:cursor-pointer" onClick={navigation}>
      <p className="text-slate-500 font-medium">Cart</p>
      <p className="text-slate-500">{sum} Items</p>
      <p className="text-slate-500">${cartData.totalPrice}</p>
    </div>
  );
}

export default Cart;
