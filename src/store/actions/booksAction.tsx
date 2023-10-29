import * as actions from "../constants/actionTypes";
import { CardProps } from "../../interfaces/typeInterfaces";
import { Dispatch } from "redux";

export const getBooks = () => async (dispatch: Dispatch) => {
    dispatch({ type: actions.GET_NEW_BOOKS_START });

    try {
        const response = await fetch("https://api.itbook.store/1.0/new").then((res) => res.json());
        dispatch({
            type: actions.GET_NEW_BOOKS_SUCCESS,
            payload: response.books,
        });
    } catch (err) {
        dispatch({
            type: actions.GET_NEW_BOOKS_FAIL,
            payload: err,
        });
    } finally {
        dispatch({ type: actions.GET_NEW_BOOKS_END });
    }
};

export const getBookDetails = (ISBN: string) => async (dispatch: Dispatch) => {
    dispatch({ type: actions.GET_BOOK_DETAILS_START });

    try {
        const response = await fetch(`https://api.itbook.store/1.0/books/${ISBN}`).then((res) => res.json());
        dispatch({
            type: actions.GET_BOOK_DETAILS_SUCCESS,
            payload: response,
        });
    } catch (err) {
        dispatch({
            type: actions.GET_BOOK_DETAILS_FAIL,
            payload: err,
        });
    } finally {
        dispatch({ type: actions.GET_BOOK_DETAILS_END });
    }
};

export const addToCart = (itemData: CardProps) => async (dispatch: Dispatch) => {
    dispatch({
        type: actions.ADD_TO_CART,
        payload: itemData,
    });
};

export const searchBooks = (search:string) => async (dispatch: Dispatch) => {
    dispatch({ type: actions.GET_SEARCH_BOOKS_START });

    try {
        const response = await fetch(`https://api.itbook.store/1.0/search/${search}`).then((res) => res.json());
        dispatch({
            type: actions.GET_SEARCH_BOOKS_SUCCESS,
            payload: response.books,
        });
    } catch (err) {
        dispatch({
            type: actions.GET_SEARCH_BOOKS_FAIL,
            payload: err,
        });
    } finally {
        dispatch({ type: actions.GET_SEARCH_BOOKS_END });
    }
};

