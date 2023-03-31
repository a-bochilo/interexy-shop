/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
// =========================== react testing library ===========================
import { render, act } from "@testing-library/react";

// =========================== component ===========================
import CartIconComponent from "../../components/cart-icon.component";

describe("CartButton", () => {
  let mockProps: any;

  beforeEach(async () => {
    await act(async () => {
      mockProps = {
        itemsQuantity: 1,
        navigate: () => {},
      };
    });
  });

  it("should render component", () => {
    render(<CartIconComponent {...mockProps} />);
  });
});
