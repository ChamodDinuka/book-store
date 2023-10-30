import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Alert from "./alert";

describe("Alert message test", () => {
  it("should display the message equal to a Redux value", () => {
    // Mock Redux store and state
    const initialState = {
      books: {
        alert: {
          message: "success",
          show: false,
        },
      },
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    // Render the component with the Redux store
    render(
      <Provider store={store}>
        <Alert />
      </Provider>
    );
    const message = screen.getByTestId("message");
    expect(message).toHaveTextContent("success");
  });
});
