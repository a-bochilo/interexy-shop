/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
// =========================== React-testing ===========================
import { render, screen, fireEvent, act } from "@testing-library/react";

// =========================== Component ===========================
import ProductAddForm from "../../components/product-add-form.component";

// =========================== Mocks ===========================
import { mockProductWithDetails } from "../mocks/products.data.mocks";

describe("ProductEditForm", () => {
    let mockProps: any;
    const mockHandlers = {
        handleSave: jest.fn().mockResolvedValue(true),
        handleBack: jest.fn(),
    };

    beforeEach(async () => {
        await act(async () => {
            mockProps = {
                product: mockProductWithDetails,
                isEditable: true,
                pending: {
                    products: false,
                    productDetails: false,
                    filter: false,
                },
                fetchingErrors: {
                    products: null,
                    productDetails: null,
                    filter: null,
                },
                isClicked: true,
                ...mockHandlers,
            };
        });
    });

    it("should render component", () => {
        render(<ProductAddForm {...mockProps} />);
    });

    it("should call 'handleSave' when save button is clicked", async () => {
        render(<ProductAddForm {...mockProps} />);

        act(() =>
            fireEvent.change(
                screen
                    .getByLabelText("image")
                    .querySelector("input") as HTMLInputElement,
                { target: { value: "string" } }
            )
        );

        expect(screen.getByTestId("save-btn")).toBeDisabled();
    });

    it("should render error text in case wrong data typed", async () => {
        render(<ProductAddForm {...mockProps} />);

        act(() =>
            fireEvent.change(
                screen
                    .getByLabelText("image")
                    .querySelector("input") as HTMLInputElement,
                { target: { value: "string" } }
            )
        );

        await screen.findByText(/image must be a valid URL/i);
    });

    it("should render error text in case wrong fetching error appears", async () => {
        render(
            <ProductAddForm
                {...mockProps}
                fetchingErrors={{
                    products: "fetchingError",
                    productDetails: null,
                    filter: null,
                }}
            />
        );

        await screen.findByText(/fetchingError/i);
    });

    it("should render CircularProgress component in case of pending", async () => {
        render(
            <ProductAddForm
                {...mockProps}
                pending={{
                    products: true,
                    productDetails: false,
                    filter: false,
                }}
            />
        );

        await screen.findByTestId(/pending-stub/i);
    });

    it("should render done icon in case of btn clicked and no pending and errors", async () => {
        render(<ProductAddForm {...mockProps} isClicked={true} />);

        await screen.findByTestId(/temp-done-icon/i);
    });
});
