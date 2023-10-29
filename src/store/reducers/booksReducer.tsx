import * as actions from "../constants/actionTypes";
import { CardProps } from "../../interfaces/typeInterfaces";

const initState = {
  bookList: {
    data: null,
    error: null,
    isloading: false,
  },
  selectedBook: {
    data: null,
    error: null,
    isloading: false,
  },
  cart: {
    data: JSON.parse(localStorage.getItem("cartItems") || "[]"),
    totalPrice: 0,
  },
};
const booksReducer = (state = initState, action: any) => {
  switch (action.type) {
    // get all new books
    case actions.GET_NEW_BOOKS_START:
      return {
        ...state,
        bookList: {
          ...state.bookList,
          isloading: true,
        },
      };
    case actions.GET_NEW_BOOKS_FAIL:
      return {
        ...state,
        bookList: {
          ...state.bookList,
          isloading: false,
          error: action.payload,
        },
      };
    case actions.GET_NEW_BOOKS_SUCCESS:
      return {
        ...state,
        bookList: {
          ...state.bookList,
          data: action.payload,
          isloading: false,
        },
      };
    case actions.GET_NEW_BOOKS_END:
      return {
        ...state,
        bookList: {
          ...state.bookList,
          isloading: false,
          error: null,
        },
      };
    // get details of a book
    case actions.GET_BOOK_DETAILS_START:
      return {
        ...state,
        selectedBook: {
          ...state.selectedBook,
          isloading: true,
        },
      };
    case actions.GET_BOOK_DETAILS_FAIL:
      return {
        ...state,
        selectedBook: {
          ...state.selectedBook,
          isloading: false,
          error: action.payload,
        },
      };
    case actions.GET_BOOK_DETAILS_SUCCESS:
      return {
        ...state,
        selectedBook: {
          ...state.selectedBook,
          data: action.payload,
          isloading: false,
        },
      };
    case actions.GET_BOOK_DETAILS_END:
      return {
        ...state,
        selectedBook: {
          ...state.selectedBook,
          isloading: false,
          error: null,
        },
      };
    case actions.ADD_TO_CART:
      let carItems: Array<CardProps> = JSON.parse(localStorage.getItem("cartItems") || "[]");
      let index = carItems?.findIndex((item: CardProps) => item.isbn13 === action.payload.isbn13);
      if (index !== -1) {
        carItems[index].count = carItems[index].count + action.payload.count;
        localStorage.setItem("cartItems", JSON.stringify(carItems));
        return {
            ...state,
            cart: {
              ...state.cart,
              data: carItems,
            },
          };
      } else {
        localStorage.setItem("cartItems", JSON.stringify(state.cart.data.concat(action.payload)));
        return {
            ...state,
            cart: {
              ...state.cart,
              data: state.cart.data.concat(action.payload),
            },
          };
      }
    default:
      return state;
  }
};

export default booksReducer;
