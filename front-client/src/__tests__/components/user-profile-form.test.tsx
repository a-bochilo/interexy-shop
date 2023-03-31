/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
// ========================== react testing library ==========================
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";

// ========================== mui ==========================
import { Button } from "@mui/material";

// ========================== components & mock ==========================
import {
  mockUserProfileProps,
  userWithTranslate,
} from "../mocks/user-data-mock";
import UserProfileFormComp from "../../components/user-profile-form.comp";

describe("User profile", () => {
  it("should renders", async () => {
    render(
      <UserProfileFormComp
        isClicked={false}
        userWithTranslate={userWithTranslate}
        fetchingErrors={null}
        {...mockUserProfileProps}
      />
    );
  });

  it("should have a submit button", () => {
    render(
      <UserProfileFormComp
        isClicked={false}
        userWithTranslate={userWithTranslate}
        fetchingErrors={null}
        {...mockUserProfileProps}
      />
    );

    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("should call 'handleBack' when cancel button is clicked", async () => {
    await act(async () =>
      render(
        <UserProfileFormComp
          isClicked={false}
          userWithTranslate={userWithTranslate}
          fetchingErrors={null}
          {...mockUserProfileProps}
          disabled={false}
        />
      )
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
    render(
      <UserProfileFormComp
        {...mockUserProfileProps}
        isClicked={false}
        userWithTranslate={userWithTranslate}
        fetchingErrors={null}
        pending={{ user: true, userInfo: true }}
      />
    );
    await screen.findByTestId(/test-progress/i);
  });

  it("should be called with errors and return error-stub", async () => {
    await act(async () =>
      render(
        <UserProfileFormComp
          {...mockUserProfileProps}
          isClicked={true}
          userWithTranslate={userWithTranslate}
          fetchingErrors={"Test error!"}
          disabled={false}
        />
      )
    );
    await screen.findByTestId(/error-stub/i);
  });

  it("should be called without errors and return done-stub", async () => {
    await act(async () =>
      render(
        <UserProfileFormComp
          {...mockUserProfileProps}
          isClicked={true}
          userWithTranslate={userWithTranslate}
          fetchingErrors={null}
          disabled={false}
        />
      )
    );
    await screen.findByTestId(/done-stub/i);
  });
});
