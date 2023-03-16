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
import { UserRoles } from "src/shared/types/user-roles.enum";

// ========================== Services & Controllers ====================
import { RoleService } from "../roles/role.service";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    private readonly userDetailsRepository: UserDetailsRepository,
    private readonly userRepository: UserRepository,
    private readonly userViewRepository: UserViewRepository,
    private readonly roleService: RoleService
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const email = await this.userRepository.getUserByEmail(createUserDto.email);
    if (email) {
      throw new HttpException(
        `User with ${createUserDto.email} already exist`,
        HttpStatus.BAD_REQUEST
      );
    }
    const role = await this.roleService.getRoleByType(UserRoles.user);
    const details = await this.userDetailsRepository.createUserDetails(
      createUserDto.details
    );

    return await this.userRepository.createUser({
      ...createUserDto,
      details,
      role,
    });
  }

  async getAll() {
    try {
      return await this.userViewRepository.getAll();
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async getUsers(isActive: boolean) {
    if (isActive === undefined) {
      return await this.userViewRepository.getAll();
    }
    return await this.userRepository.getInActiveUsers(false);
  }

  async getDetailsById(userId: string) {
    const user = await this.userRepository.getById(userId);
    return await this.userDetailsRepository.getDetails(user.details_id);
  }

  async getById(userId: string) {
    return await this.userRepository.getById(userId);
  }

  async assignUserRole(assignUserRoleDto: AssignUserRoleDto, userId: string) {
    const user = await this.userRepository.getById(userId);
    const newRole = await this.roleService.getRoleById(
      assignUserRoleDto.newRole
    );
    user.updated = new Date();
    user.role = newRole;
    user.roleId = newRole.id;
    user.roleType = newRole.type;
    return await this.userRepository.updateUser(user);
  }

  async deleteUserById(userId: string) {
    return await this.userRepository.deleteUser(userId);
  }

  async updateUserDetails(info: UpdateUserDto, userId: string) {
    const user = await this.userRepository.getById(userId);
    let details = await this.userDetailsRepository.getDetails(
      user.details_id as string
    );
    const newDetails = await this.userDetailsRepository.createUserDetails(
      Object.assign(details, info.details)
    );
    const role = await this.roleService.getRoleById(user.roleId);
    delete info.details;
    Object.assign(user, info);

    user.updated = new Date();
    details = newDetails;

    await this.userDetailsRepository.deleteDetails(user.details_id as string);
    return await this.userRepository.updateUser({
      ...user,
      details,
      role,
    });
  }

  async updateUserOrder(user: UserEntity) {
    const newUser = await this.userRepository.getById(user.id);
    Object.assign(newUser, user);
    return await this.userRepository.updateUser(user);
  }

  async getOrdersById(id: string) {
    return await this.userRepository.getOrdersById(id);
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.getUserByEmail(email);
  }
}
