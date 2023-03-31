/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
// =========================== react testing library ===========================
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";

// =========================== mocks ===========================
import { mockProduct } from "../mocks/products.data.mocks";
import {
  mockCartInfoTranslation,
  mockCartItem,
} from "../mocks/cart.data.mocks";

// =========================== component ===========================
import CartItem from "../../components/cart-item.component";

describe("CartItem", () => {
  let mockProps: any;
  const mockedHandlers = {
    handleUpdateCartItem: jest.fn(),
    handleDeleteCartItem: jest.fn(),
    handleNavigate: jest.fn(),
  };

  beforeEach(async () => {
    await act(async () => {
      mockProps = {
        item: mockCartItem,
        product: mockProduct,
        translations: mockCartInfoTranslation,
        ...mockedHandlers,
      };
    });
  });

  it("should render component", () => {
    render(<CartItem {...mockProps} />);
  });

  it("should render value from item props in quantity input", () => {
    render(
      <CartItem {...mockProps} item={{ ...mockProps.item, quantity: 5 }} />
    );

    const quantityInput = screen
      .getByTestId("quantity-input-test")
      .querySelector("input") as HTMLInputElement;

    expect(quantityInput.value).toBe("5");
  });

  it("should leave input value as 1 in case decrease icon clicked", async () => {
    render(<CartItem {...mockProps} />);

    const decreaseIcon = screen.getByTestId("decrease-icon-test");

    await act(() => fireEvent.click(decreaseIcon));

    const quantityInput = screen
      .getByTestId("quantity-input-test")
      .querySelector("input") as HTMLInputElement;

    await waitFor(() => {
      expect(quantityInput.value).toBe("1");
    });
  });

  it("should set input value as 2 in case increase icon clicked", async () => {
    render(<CartItem {...mockProps} />);

    const increaseIcon = screen.getByTestId("increase-icon-test");

    await act(() => fireEvent.click(increaseIcon));

    const quantityInput = screen
      .getByTestId("quantity-input-test")
      .querySelector("input") as HTMLInputElement;

    await waitFor(() => {
      expect(quantityInput.value).toBe("2");
    });
  });

  it("should call handleDeleteCartItem in case delete icon clicked", async () => {
    render(<CartItem {...mockProps} />);

    const deleteIcon = screen.getByTestId("delete-icon-test");

    await act(() => fireEvent.click(deleteIcon));

    await waitFor(() => {
      expect(mockedHandlers.handleDeleteCartItem).toBeCalled();
    });
  });

  it("should call handleUpdateCartItem in case quantity changed", async () => {
    render(<CartItem {...mockProps} />);

    const increaseIcon = screen.getByTestId("increase-icon-test");

    await act(() => fireEvent.click(increaseIcon));

    await waitFor(() => {
      expect(mockedHandlers.handleUpdateCartItem).toBeCalled();
    });
  });

  it("should call handleNavigate in case img clicked", async () => {
    render(<CartItem {...mockProps} />);

    const img = screen.getByTestId("img-test");

    await act(() => fireEvent.click(img));

    await waitFor(() => {
      expect(mockedHandlers.handleNavigate).toBeCalled();
    });
  });
});
