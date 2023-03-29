/* eslint-disable testing-library/no-unnecessary-act */
import { render } from "@testing-library/react";
import ProductsTable from "../../components/products-table.component";
import { mockProductWithDetails } from "./products.data.mocks";

describe("ProductsTable", () => {
    let mockProps: any;
    const mockHandlers = {
        handleClickRow: jest.fn(),
    };

    beforeEach(() => {
        mockProps = {
            products: [mockProductWithDetails],
            ...mockHandlers,
        };
    });

    it("should render component", () => {
        render(<ProductsTable {...mockProps} />);
    });
});
