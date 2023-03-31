/* eslint-disable testing-library/no-unnecessary-act */
// =========================== react testing library ===========================
import { render } from "@testing-library/react";

// =========================== component ===========================
import ProductsTable from "../../components/products-table.component";

// =========================== mocks ===========================
import { mockProductWithDetails } from "../mocks/products.data.mocks";

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
