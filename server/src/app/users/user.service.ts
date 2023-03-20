import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { I18nContext } from "nestjs-i18n";

// ========================== Entities & DTO's ==========================
import { AssignUserRoleDto } from "./dtos/assign-role-user.dto";

// ========================== Repositories ==============================
import { UserRepository } from "./repos/user.repository";
import { UserDetailsRepository } from "./repos/user-details.repository";
import { UserViewRepository } from "./repos/user-view.repository";

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
    if (!user) {
      throw new HttpException(
        `${I18nContext.current().t("errors.user.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );
    }
    return await this.userDetailsRepository.getDetailsById(user.details_id);
  }

  async getById(userId: string) {
    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new HttpException(
        `${I18nContext.current().t("errors.user.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );
    }
    return user;
  }

  async assignUserRole(assignUserRoleDto: AssignUserRoleDto, userId: string) {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new HttpException(
        `${I18nContext.current().t("errors.user.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );
    }

    const newRole = await this.roleRepository.getRoleByName(
      assignUserRoleDto.newRole
    );
    
    if (!newRole) {
      throw new HttpException(
        `${I18nContext.current().t("errors.roles.roleDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );
    }

    user.updated = new Date();
    user.role = newRole;
    user.roleId = newRole.id;
    user.roleType = newRole.type;
    return await this.userRepository.assignUserRole(user);
  }

  async deleteUserById(userId: string) {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new HttpException(
        `${I18nContext.current().t("errors.user.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );
    }
    return await this.userRepository.deleteUserById(userId);
  }

  async updateUserDetails(info: UpdateUserDto, userId: string) {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new HttpException(
        `${I18nContext.current().t("errors.user.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );
    }

    let details = await this.userDetailsRepository.getDetailsById(
      user.details_id
    );

    if (!details) {
      throw new HttpException(
        `${I18nContext.current().t("errors.details.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );
    }

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
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new HttpException(
        `${I18nContext.current().t("errors.user.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );
    }
    return user;
  }
}
