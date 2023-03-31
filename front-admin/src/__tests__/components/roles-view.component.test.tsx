// =========================== React-testing ===========================
import { render, screen } from "@testing-library/react";

// =========================== Mocks ===================================
import { role } from "../mocks/role.data.mock";

// =========================== Component ===============================
import RoleForm from "../../components/roles-form.component";

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
