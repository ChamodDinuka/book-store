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
        totalPrice: localStorage.getItem("totalPrice") || 0,
    },
    alert: {
        message: null,
        show: false
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
        // get search new books
        case actions.GET_SEARCH_BOOKS_START:
            return {
                ...state,
                bookList: {
                    ...state.bookList,
                    isloading: true,
                },
            };
        case actions.GET_SEARCH_BOOKS_FAIL:
            return {
                ...state,
                bookList: {
                    ...state.bookList,
                    isloading: false,
                    error: action.payload,
                },
            };
        case actions.GET_SEARCH_BOOKS_SUCCESS:
            return {
                ...state,
                bookList: {
                    ...state.bookList,
                    data: action.payload,
                    isloading: false,
                },
            };
        case actions.GET_SEARCH_BOOKS_END:
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
        //add to cart
        case actions.ADD_TO_CART:
            let carItems: Array<CardProps> = JSON.parse(localStorage.getItem("cartItems") || "[]");
            let index = carItems?.findIndex((item: CardProps) => item.isbn13 === action.payload.isbn13);
            localStorage.setItem("totalPrice", action.total);
            if (index !== -1) {
                carItems[index].count = carItems[index].count + action.payload.count;
                localStorage.setItem("cartItems", JSON.stringify(carItems));
                return {
                    ...state,
                    cart: {
                        ...state.cart,
                        data: carItems,
                        totalPrice: action.total,
                    },
                };
            } else {
                localStorage.setItem("cartItems", JSON.stringify(state.cart.data.concat(action.payload)));
                return {
                    ...state,
                    cart: {
                        ...state.cart,
                        data: state.cart.data.concat(action.payload),
                        totalPrice: action.total,
                    },
                };
            }
        //update cart item
        case actions.UPDATE_TO_CART:
            let items: Array<CardProps> = JSON.parse(localStorage.getItem("cartItems") || "[]");
            let position = items?.findIndex((item: CardProps) => item.isbn13 === action.payload.isbn13);
            localStorage.setItem("totalPrice", action.total);
            items[position].count = action.payload.count;
            localStorage.setItem("cartItems", JSON.stringify(items));
            return {
                ...state,
                cart: {
                    ...state.cart,
                    data: items,
                    totalPrice: action.total,
                },
            };
        // delete cart item
        case actions.DELETE_CART_ITEM:
            localStorage.setItem('cartItems', JSON.stringify(state.cart.data.filter((x: any) => x.isbn13 !== action.payload.isbn13)));
            localStorage.setItem("totalPrice", action.total);
            return {
                ...state,
                cart: {
                    ...state.cart,
                    data: state.cart.data.filter((x: any) => x.isbn13 !== action.payload.isbn13),
                    totalPrice: action.total,
                }
            };
        // alert action
        case actions.SET_ALERT:
            return {
                ...state,
                alert: {
                    ...state.alert,
                    message: action.payload.message,
                    show: action.payload.show
                }
            };
        default:
            return state;
    }
};

export default booksReducer;
