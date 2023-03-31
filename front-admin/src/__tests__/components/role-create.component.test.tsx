/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
import { BrowserRouter } from "react-router-dom";

// =========================== React-testing ===========================";
import { fireEvent, render, screen, act } from "@testing-library/react";

// =========================== Component ===============================
import CreateRoleForm from "../../components/role-create.component";
// role-create.component.tsx           |   91.66 |    55.55 |   85.71 |     100 | 232,245
describe("Role edit form", () => {
  const mockHandlers = {
    handleCreate: jest.fn(),
    handleBack: jest.fn(),
  };

  it("should render component", () => {
    render(
      <CreateRoleForm
        fetchingPending={false}
        fetchErrors={null}
        isClicked={false}
        {...mockHandlers}
      />
    );
  });

  it("should enable create button in case form in create mode", async () => {
    render(
      <CreateRoleForm
        fetchingPending={false}
        fetchErrors={null}
        isClicked={false}
        {...mockHandlers}
      />
    );
    const button = screen.getByRole("button", {
      name: /back to roles/i,
    });
    expect(button).not.toBeDisabled();
  });

  it("should be return error message", async () => {
    render(
      <CreateRoleForm
        fetchingPending={false}
        fetchErrors={"Error! Test error!"}
        isClicked={false}
        {...mockHandlers}
      />
    );
    expect(await screen.findByText("Error! Test error!")).toBeInTheDocument();
  });

  it("should call 'handleSave' when create button is clicked", async () => {
    render(
      <CreateRoleForm
        fetchingPending={false}
        fetchErrors={null}
        isClicked={false}
        {...mockHandlers}
      />
    );
    const boxes = screen.getAllByRole("textbox");
    act(() => fireEvent.change(boxes[0], { target: { value: "string" } }));

    expect(screen.getByTestId("create-btn")).toBeDisabled();
  });

  it("renders CircularProgress when roles are pending", async () => {
    render(
      <CreateRoleForm
        fetchingPending={true}
        fetchErrors={null}
        isClicked={false}
        {...mockHandlers}
      />
    );
    await screen.findByTestId(/pending-stub/i);
  });

  it("should be have expand button", async () => {
    render(
      <BrowserRouter>
        <CreateRoleForm
          fetchingPending={false}
          fetchErrors={null}
          isClicked={false}
          {...mockHandlers}
        />
      </BrowserRouter>
    );
    const button = screen.getByTestId("ExpandMoreIcon");
    await act(async () => await fireEvent.click(button));
    expect(screen.getByDisplayValue(/createproduct/i)).toBeInTheDocument();
  });

  it("renders CheckCircleIcon when roles are created", async () => {
    render(
      <CreateRoleForm
        fetchingPending={false}
        fetchErrors={null}
        isClicked={true}
        {...mockHandlers}
      />
    );
    await screen.findByTestId(/done-stub/i);
  });
});
