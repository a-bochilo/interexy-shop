/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */

// =========================== React-testing ===========================
import {
    render,
    screen,
    fireEvent,
    act,
} from "@testing-library/react";

// =========================== Component ===========================
import ProductCard from "../../components/product-card.component";

// =========================== Mocks ===========================
import { mockProduct } from "./products.data.mocks";

describe("ProductEditForm", () => {
    let mockProps: any;
    const mockHandlers = {
        handleClickCard: jest.fn(),
        handleAddToCart: jest.fn(),
    };
    const nonEmptyCart = {
        id: "string",
        created: "string",
        updated: "string",
        items: [
            {
                id: "string",
                productId: "c06cbc27-26ee-4455-8983-33fff83c8be8",
                quantity: 5,
            },
        ],
    };

    beforeEach(async () => {
        await act(async () => {
            mockProps = {
                product: mockProduct,
                cart: null,
                error: null,
                ...mockHandlers,
            };
        });
    });

    it("should render component", () => {
        render(<ProductCard {...mockProps} />);
    });

    it("should send cartQuantity in case product in cart", () => {
        render(<ProductCard {...mockProps} cart={nonEmptyCart} />);
    });

    it("should send err in case it given with props", () => {
        render(
            <ProductCard {...mockProps} cart={nonEmptyCart} error="error" />
        );
    });

    it("should call handleClickCard function in case button clicked", async () => {
        render(<ProductCard {...mockProps} />);

        const button = screen.getByTestId("handleClickCard-test");
        await act(() => fireEvent.click(button));

        expect(mockHandlers.handleClickCard).toBeCalledTimes(1);
    });
});
