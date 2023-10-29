import { useSelector } from "react-redux";
import {CardProps} from "../../interfaces/typeInterfaces"

function Cart() {
  const cartData = useSelector((state: any) => state.books.cart);
  const sum = cartData.data?.reduce((accumulator:number, currentValue:CardProps) => {
    if(currentValue.count){
    return accumulator + currentValue.count;
    }
  }, 0);
  
  return (
    <div className="h-auto rounded-full border-black w-fit flex-col text-center p-4 border">
      <p className="text-slate-500 font-medium">Cart</p>
      <p className="text-slate-500">{sum} Items</p>
      <p className="text-slate-500">${cartData.totalPrice}</p>
    </div>
  );
}

export default Cart;
