/* eslint-disable no-restricted-globals */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
// ========================== react ==========================
import { render, waitFor, screen } from "@testing-library/react";

// ========================== components ==========================
import UserAssignRoleFormComp from "../../components/user-assign-role-form.comp";

// ========================== types ==========================
import { mockAssignRoleProps } from "./user-data-mock";

describe("User assign role form component", () => {
  it("should renders", async () => {
    await waitFor(() => {
      render(<UserAssignRoleFormComp {...mockAssignRoleProps} />);
    });
  });

  it("should render done icon when button is clicked and no pending and errors", async () => {
    render(
      <UserAssignRoleFormComp {...mockAssignRoleProps} isClicked={true} />
    );
    await screen.findByTestId(/done-icon-test/i);
  });
});
