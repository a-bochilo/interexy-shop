/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen } from "@testing-library/react";
import CreateRoleForm from "../../components/role-create.component";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

describe("Role edit form", () => {
  const mockHandlers = {
    handleCreate: jest.fn(),
    handleBack: jest.fn(),
  };

  it("should render component", () => {
    render(<CreateRoleForm fetchErrors={null} isClicked={false} {...mockHandlers} />);
  });

  it("should enable create button in case form in create mode", async () => {
    render(<CreateRoleForm fetchErrors={null} isClicked={false} {...mockHandlers} />);
    const button = screen.getByRole("button", {
      name: /back to roles/i,
    });
    expect(button).not.toBeDisabled();
  });

  it("should be return error message", async () => {
    render(
      <CreateRoleForm
        fetchErrors={"Error! Test error!"}
        isClicked={false}
        {...mockHandlers}
      />
    );
    expect(await screen.findByText("Error! Test error!")).toBeInTheDocument();
  });

  it("should call 'handleSave' when create button is clicked", async () => {
    render(<CreateRoleForm fetchErrors={null} isClicked={false} {...mockHandlers} />);
    const boxes = screen.getAllByRole("textbox");
    act(() => fireEvent.change(boxes[0], { target: { value: "string" } }));

    expect(screen.getByTestId("create-btn")).toBeDisabled();
  });

  it("should be have expand button", async () => {
    render(
      <BrowserRouter>
        <CreateRoleForm fetchErrors={null} isClicked={false} {...mockHandlers} />
      </BrowserRouter>
    );
    const button = screen.getByTestId("ExpandMoreIcon");
    await act(async () => await fireEvent.click(button));
    expect(screen.getByDisplayValue(/createproduct/i)).toBeInTheDocument();
  });
});

