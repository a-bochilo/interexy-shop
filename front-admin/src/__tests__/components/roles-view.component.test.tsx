import { render, screen, act, waitFor } from "@testing-library/react";
import RoleForm from "../../components/roles-form.component";
import { role } from "../mocks/data.mocks";

describe("Role edit form", () => {
  const mockHandlers = {
    handleDelete: jest.fn(),
    handleSave: jest.fn(),
    handleBack: jest.fn(),
    setIsEditable: jest.fn(),
  };

  it("should render component", () => {
    render(
      <RoleForm
        role={role}
        isClicked={true}
        isEditable={true}
        pending={{
          roles: false,
          chosenRole: false,
        }}
        fetchingErrors={{
          roles: null,
          chosenRole: null,
        }}
        setIsEditable={mockHandlers.setIsEditable}
        handleBack={mockHandlers.handleBack}
        handleDelete={mockHandlers.handleDelete}
        handleSave={mockHandlers.handleSave}
      />
    );
  });

  it("should undisable create button in case form in create mode", async () => {
    render(
      <RoleForm
        role={role}
        isClicked={true}
        isEditable={true}
        pending={{
          roles: false,
          chosenRole: false,
        }}
        fetchingErrors={{
          roles: null,
          chosenRole: null,
        }}
        setIsEditable={mockHandlers.setIsEditable}
        handleBack={mockHandlers.handleBack}
        handleDelete={mockHandlers.handleDelete}
        handleSave={mockHandlers.handleSave}
      />
    );
    const button = screen.getByRole("button", {
      name: /back to roles/i,
    });
    expect(button).not.toBeDisabled();
  });

  it("should enable edit button in case form is not in edit mode", async () => {
    render(
      <RoleForm
        role={role}
        isClicked={true}
        isEditable={false}
        pending={{
          roles: false,
          chosenRole: false,
        }}
        fetchingErrors={{
          roles: null,
          chosenRole: null,
        }}
        setIsEditable={mockHandlers.setIsEditable}
        handleBack={mockHandlers.handleBack}
        handleDelete={mockHandlers.handleDelete}
        handleSave={mockHandlers.handleSave}
      />
    );

    //   it("should call 'setIsEditable' when edit button clicked", async () => {
    //     await act(async () => render(<ProductEditForm {...mockProps} isEditable={false} />));
    //     await act(async () => fireEvent.click(screen.getByText(/edit/i)));

    //     await waitFor(() => expect(mockHandlers.setIsEditable).toHaveBeenCalledTimes(1));
    //   });

    //   it("should call 'handleDelete' when delete button clicked", async () => {
    //     await act(async () => render(<ProductEditForm {...mockProps} isEditable={false} />));
    //     await act(async () => fireEvent.click(screen.getByText(/delete/i)));

    //     await waitFor(() => expect(mockHandlers.handleDelete).toHaveBeenCalledTimes(1));
    //   });

    //   it("disables save button when form is invalid", async () => {
    //     await act(async () => render(<ProductEditForm {...mockProps} isEditable={true} />));
    //     const input = screen
    //       .getByLabelText("quantity")
    //       .querySelector("input") as HTMLInputElement;

    //     await act(async () =>
    //       fireEvent.change(input, {
    //         target: { value: -5 },
    //       })
    //     );

    //     await waitFor(() => expect(screen.getByText(/save/i)).toBeDisabled());
    //   });
  });

  it("should be return error message", async () => {
    render(
      <RoleForm
        role={role}
        isClicked={true}
        isEditable={false}
        pending={{
          roles: false,
          chosenRole: false,
        }}
        fetchingErrors={{
          roles: "Error! Test error!",
          chosenRole: "Error! Test error!",
        }}
        setIsEditable={mockHandlers.setIsEditable}
        handleBack={mockHandlers.handleBack}
        handleDelete={mockHandlers.handleDelete}
        handleSave={mockHandlers.handleSave}
      />
    );
    expect(await screen.findByText("Error! Test error!")).toBeInTheDocument();
  });
});
