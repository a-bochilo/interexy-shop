// ========================== react ==========================
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// ========================== components ==========================
import ErrorBoundary from "../../components/error-boundary.comp";

describe("Error Boundary", () => {
  test("should work correctly", () => {
    const ThrowError = () => {
      throw new Error("Test");
    };

    render(
      //@ts-ignore
      <ErrorBoundary fallback={<ErrorBoundary />}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByTestId("errorboundary")).toBeVisible();
  });
});
