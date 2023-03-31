// ====================== types & dto's =====================
import { BaseState } from "./base-state.type";
import { RolesDto } from "./roles.dto";

export interface IRoleState extends BaseState {
  roles: RolesDto[];
  chosenRole: RolesDto | undefined;
  pending: {
    roles: boolean;
    chosenRole: boolean;
  };
  errors: {
    roles: string | null;
    chosenRole: string | null;
  };
}
