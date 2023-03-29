/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen } from "@testing-library/react";
import PageAsideComp from "../../components/aside.component";

describe("PageAsideComp", () => {
  it("renders children correctly", () => {
    render(
      <PageAsideComp>
        <div>Child 1</div>
        <div>Child 2</div>
      </PageAsideComp>
    );

    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  it("has the correct styles", () => {
    const { container } = render(
      <PageAsideComp>
        <div>Child</div>
      </PageAsideComp>
    );

    const asideElement = container.querySelector("aside");
    expect(asideElement).toHaveStyle({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "300px",
      minHeight: "100%",
      flexGrow: 1,
      backgroundColor: "secondary.main",
      padding: "16px",
      gap: "8px",
    });
  });
});
