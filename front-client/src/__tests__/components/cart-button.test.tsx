/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */

// =========================== React-testing ===========================
import {
    render,
    screen,
    fireEvent,
    act,
    waitFor,
} from "@testing-library/react";

// =========================== Component ===========================
import CartButton from "../../components/cart-button.compoent";

describe("CartButton", () => {
    let mockProps: any;
    const mockhandleAddToCart = jest.fn();

    beforeEach(async () => {
        await act(async () => {
            mockProps = {
                size: "small",
                isInCart: false,
                cartItemQuantity: 1,
                error: null,
                handleAddToCartLocal: mockhandleAddToCart,
            };
        });
    });

    it("should render component", () => {
        render(<CartButton {...mockProps} />);
    });

    it("should render menu in case open button pressed", async () => {
        render(<CartButton {...mockProps} />);

        const openButton = screen.getByTestId("handleAddToCart-open-test");

        await act(() => fireEvent.click(openButton));

        await screen.findByTestId("hidden-menu-test");
    });

    it("should render error in hidden menu in case it exists in props", async () => {
        render(<CartButton {...mockProps} error="testError" />);

        const openButton = screen.getByTestId("handleAddToCart-open-test");

        await act(() => fireEvent.click(openButton));

        await waitFor(() => {
            expect(screen.getByText("testError")).toBeInTheDocument();
        });
    });

    it("should call handleAddToCartLocal in case nested button clicked", async () => {
        render(<CartButton {...mockProps} />);

        const openButton = screen.getByTestId("handleAddToCart-open-test");

        await act(() => fireEvent.click(openButton));

        const addButton = screen.getByTestId("add-to-cart-button-test");

        await act(() => fireEvent.click(addButton));

        await waitFor(() => {
            expect(mockhandleAddToCart).toBeCalled();
        });
    });

    it("should set input value as 2 in case increase icon clicked", async () => {
        render(<CartButton {...mockProps} />);

        const openButton = screen.getByTestId("handleAddToCart-open-test");

        await act(() => fireEvent.click(openButton));

        const increaseIcon = screen.getByTestId("increase-icon-test");

        await act(() => fireEvent.click(increaseIcon));

        const quantityInput = screen
            .getByTestId("quantity-input-test")
            .querySelector("input") as HTMLInputElement;

        await waitFor(() => {
            expect(quantityInput.value).toBe("2");
        });
    });

    it("should leave input value as 1 in case decrease icon clicked", async () => {
        render(<CartButton {...mockProps} />);

        const openButton = screen.getByTestId("handleAddToCart-open-test");

        await act(() => fireEvent.click(openButton));

        const decreaseIcon = screen.getByTestId("decrease-icon-test");

        await act(() => fireEvent.click(decreaseIcon));

        const quantityInput = screen
            .getByTestId("quantity-input-test")
            .querySelector("input") as HTMLInputElement;

        await waitFor(() => {
            expect(quantityInput.value).toBe("1");
        });
    });

    it("should render input with width 60px in case size props not 'small'", async () => {
        render(<CartButton {...mockProps} size="large" />);

        const openButton = screen.getByTestId("handleAddToCart-open-test");

        await act(() => fireEvent.click(openButton));

        const quantityInput = screen
            .getByTestId("quantity-input-test")
            .querySelector("input") as HTMLInputElement;

        await waitFor(() => {
            expect(getComputedStyle(quantityInput).width).toBe("60px");
        });
    });

    it("should render contained button in case isInCart is true", async () => {
        render(<CartButton {...mockProps} isInCart={true} />);

        const openButton = screen.getByTestId("handleAddToCart-open-test");

        expect(openButton.classList.contains("MuiButton-contained")).toBe(true);
    });
});
