/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
import {
    render,
    screen,
    fireEvent,
    waitFor,
    act,
} from "@testing-library/react";

import ProductEditForm from "../../components/product-edit-form.component";
import { mockProductWithDetails } from "./products.data.mocks";

describe("ProductEditForm", () => {
    let mockProps: any;
    const mockHandlers = {
        setIsEditable: jest.fn(),
        handleDelete: jest.fn(),
        handleSave: jest.fn(),
        handleBack: jest.fn(),
    };

    beforeEach(async () => {
        await act(async () => {
            mockProps = {
                product: mockProductWithDetails,
                isEditable: false,
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
                isClicked: false,
                ...mockHandlers,
            };
        });
    });

    it("should render component", () => {
        render(<ProductEditForm {...mockProps} />);
    });

    it("should disable edit button in case form in edit mode", async () => {
        await act(async () =>
            render(<ProductEditForm {...mockProps} isEditable={true} />)
        );
        const button = screen.getByText(/edit/i);
        expect(button).toBeDisabled();
    });

    it("should enable edit button in case form is not in edit mode", async () => {
        await act(async () =>
            render(<ProductEditForm {...mockProps} isEditable={false} />)
        );

        await waitFor(() => expect(screen.getByText(/edit/i)).toBeEnabled());
    });

    it("should call 'setIsEditable' when edit button clicked", async () => {
        await act(async () =>
            render(<ProductEditForm {...mockProps} isEditable={false} />)
        );
        await act(async () => fireEvent.click(screen.getByText(/edit/i)));

        await waitFor(() =>
            expect(mockHandlers.setIsEditable).toHaveBeenCalledTimes(1)
        );
    });

    it("should call 'handleDelete' when delete button clicked", async () => {
        await act(async () =>
            render(<ProductEditForm {...mockProps} isEditable={false} />)
        );
        await act(async () => fireEvent.click(screen.getByText(/delete/i)));

        await waitFor(() =>
            expect(mockHandlers.handleDelete).toHaveBeenCalledTimes(1)
        );
    });

    it("disables save button when form is invalid", async () => {
        await act(async () =>
            render(<ProductEditForm {...mockProps} isEditable={true} />)
        );
        const input = screen
            .getByLabelText("quantity")
            .querySelector("input") as HTMLInputElement;

        await act(async () =>
            fireEvent.change(input, {
                target: { value: -5 },
            })
        );

        await waitFor(() => expect(screen.getByText(/save/i)).toBeDisabled());
    });
});
