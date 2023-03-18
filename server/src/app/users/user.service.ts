import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

// ========================== Entities & DTO's ==========================
import { CreateUserDto } from "./dtos/create-user.dto";
import { AssignUserRoleDto } from "./dtos/assign-role-user.dto";
import { UserEntity } from "./entities/user.entity";

// ========================== Repositories ==============================
import { UserRepository } from "./repos/user.repository";
import { UserDetailsRepository } from "./repos/user-details.repository";
import { UserViewRepository } from "./repos/user-view.repository";

// ========================== Enums =====================================
import { UserRoles } from "../../shared/types/user-roles.enum";

// ========================== Services & Controllers ====================
import { UpdateUserDto } from "./dtos/update-user.dto";
import { RoleRepository } from "../roles/repos/role.repository";

@Injectable()
export class UserService {
  constructor(
    private readonly userDetailsRepository: UserDetailsRepository,
    private readonly userRepository: UserRepository,
    private readonly userViewRepository: UserViewRepository,
    private readonly roleRepository: RoleRepository
  ) {}

  async getAllUsers(isActive: boolean) {
    if (isActive === undefined) {
      return await this.userViewRepository.getAllUsers();
    }
    return await this.userRepository.getAllUsers(false);
  }

  async getDetailsById(userId: string) {
    const user = await this.userRepository.getById(userId);
    return await this.userDetailsRepository.getDetailsById(user.details_id);
  }

  async getById(userId: string) {
    return await this.userRepository.getById(userId);
  }

  async assignUserRole(assignUserRoleDto: AssignUserRoleDto, userId: string) {
    const user = await this.userRepository.getById(userId);
    const newRole = await this.roleRepository.getRoleByName(
      assignUserRoleDto.newRole
    );
    user.updated = new Date();
    user.role = newRole;
    user.roleId = newRole.id;
    user.roleType = newRole.type;
    return await this.userRepository.assignUserRole(user);
  }

  async deleteUserById(userId: string) {
    return await this.userRepository.deleteUserById(userId);
  }

  async updateUserDetails(info: UpdateUserDto, userId: string) {
    const user = await this.userRepository.getById(userId);
    let details = await this.userDetailsRepository.getDetailsById(
      user.details_id as string
    );
    const newDetails = await this.userDetailsRepository.setDetails(
      Object.assign(details, info.details)
    );

    delete info.details;
    Object.assign(user, info);

    user.updated = new Date();
    details = newDetails;

    return await this.userRepository.updateUserDetails({
      ...user,
      details,
    });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.getUserByEmail(email);
  }
  async getUserByPhone(phone: string) {
    return await this.userRepository.getUserByPhone(phone);
  }
}
