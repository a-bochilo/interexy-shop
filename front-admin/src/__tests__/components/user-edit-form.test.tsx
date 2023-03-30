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

// ========================== comp, types ==========================
import UserEditFormComp from "../../components/user-edit-form.comp";
import { mockEditFormProps } from "./user-data-mock";

describe("User edit form", () => {
  it("should renders", async () => {
    render(<UserEditFormComp {...mockEditFormProps} />);
  });

  it("should have a submit button", () => {
    render(<UserEditFormComp {...mockEditFormProps} />);

    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("should call 'handleDelete' when delete button is clicked", async () => {
    await act(async () =>
      render(<UserEditFormComp {...mockEditFormProps} disabled={false} />)
    );
    await act(async () => fireEvent.click(screen.getByText(/Delete/i)));

    await waitFor(() =>
      expect(mockEditFormProps.handleDelete).toHaveBeenCalledTimes(1)
    );
  });

  it("disables save button when form is invalid", async () => {
    await act(async () =>
      render(<UserEditFormComp {...mockEditFormProps} disabled={true} />)
    );

    const handleClick = jest.fn();
    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);
    // expect(handleClick).toHaveBeenCalledTimes(1);

    //console.log(editButton)
    // const input = screen
    //   .getByLabelText("test-first-name")
    //   .querySelector("input") as HTMLInputElement;

    // await act(async () =>
    //   fireEvent.change(input, {
    //     target: { value: 1 },
    //   })
    // );

    // await waitFor(() => expect(screen.getByText(/Save/i)).toBeDisabled());
  });

  it("calls onClick prop when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Delete</Button>);
    fireEvent.click(screen.getByText(/Delete/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should render done icon when button is clicked and no pending and errors", async () => {
    render(<UserEditFormComp {...mockEditFormProps} isClicked={true} />);
    await screen.findByTestId(/temp-done-icon/i);
  });
});
