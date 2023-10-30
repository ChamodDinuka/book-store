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

export const addToCart = (itemData: CardProps, total: number) => async (dispatch: Dispatch) => {
    dispatch({
        type: actions.ADD_TO_CART,
        payload: itemData,
        total: total
    });
};

export const updateToCart = (itemData: CardProps, total: number) => async (dispatch: Dispatch) => {
    dispatch({
        type: actions.UPDATE_TO_CART,
        payload: itemData,
        total: total
    });
};

export const deleteToCart = (itemData: CardProps, total: number) => async (dispatch: Dispatch) => {
    dispatch({
        type: actions.DELETE_CART_ITEM,
        payload: itemData,
        total: total
    });
};

export const searchBooks = (search: string) => async (dispatch: Dispatch) => {
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

export const setAlert = (message: string, show: boolean) => async (dispatch: Dispatch) => {
    dispatch({
        type: actions.SET_ALERT,
        payload: { message, show }
    });
    if (show) {
        setTimeout(() => {
            setAlert('', false)(dispatch);
        }, 3000);
    }
}

