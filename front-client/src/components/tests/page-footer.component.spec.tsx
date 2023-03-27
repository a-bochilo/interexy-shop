import { render } from "@testing-library/react";
import PageFooterComp from "../page-footer.comp";

describe("PageFooterComp", () => {

  it("renders correctly", () => {
    const { getByText } = render(<PageFooterComp />);
    expect(getByText("© 2023 BEST STORE EVER")).toBeInTheDocument();
  });
});
