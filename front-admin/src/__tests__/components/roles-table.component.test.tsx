/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
// eslint-disable-next-line testing-library/no-unnecessary-act
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RolesTable from "../../components/roles-table.component";
import { UserRoles } from "../../app/roles/types/user-roles.enum";
import { role } from "../mocks/role.data.mock";

// =========================== React-testing ===========================
// =========================== Mocks ===================================
// =========================== Component ===============================
// =========================== Mock useNavi ============================
// =========================== Mock Store ==============================

describe("Roles table", () => {
  const mockedUsedNavigate = jest.fn();

  jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate,
  }));

  it("should render component with roles table", () => {
    render(
      <BrowserRouter>
        <RolesTable roles={[role]} />
      </BrowserRouter>
    );
  });

  it("should render component without roles", () => {
    render(
      <BrowserRouter>
        <RolesTable roles={[]} />
      </BrowserRouter>
    );
  });

  it("should render roles component without permissons", () => {
    render(
      <BrowserRouter>
        <RolesTable
          roles={[
            {
              id: 1,
              type: UserRoles.superadmin,
              name: "superadmin",
              permissions: null,
            },
          ]}
        />
      </BrowserRouter>
    );
  });
});
