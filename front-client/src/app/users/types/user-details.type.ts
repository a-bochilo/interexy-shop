// ========================== enum ==========================
import { UUIDDto } from "../../../types/uuid-dto.type";

export interface UserDetailsDto extends UUIDDto {
  firstname: string;
  lastname: string;
  middlename: string;
}
