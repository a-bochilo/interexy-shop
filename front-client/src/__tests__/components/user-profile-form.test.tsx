/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
// ========================== react ==========================
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";

// ========================== mui ==========================
import { Button } from "@mui/material";

// ========================== components, mock ==========================
import { mockUserProfileProps } from "./user-data-mock";
import UserProfileFormComp from "../../components/user-profile-form.comp";

describe("User profile", () => {
  it("should renders", async () => {
    render(<UserProfileFormComp {...mockUserProfileProps} />);
  });

  it("should have a submit button", () => {
    render(<UserProfileFormComp {...mockUserProfileProps} />);

    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("should call 'handleBack' when cancel button is clicked", async () => {
    await act(async () =>
      render(<UserProfileFormComp {...mockUserProfileProps} disabled={false} />)
    );
    await act(async () => fireEvent.click(screen.getByText(/Cancel/i)));

    await waitFor(() =>
      expect(mockUserProfileProps.handleBack).toHaveBeenCalledTimes(1)
    );
  });

  it("calls onClick prop when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Cancel</Button>);
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should render CircularProgress when pending", async () => {
    render(<UserProfileFormComp {...mockUserProfileProps} />);
    await screen.findByTestId(/test-progress/i);
  });
});
