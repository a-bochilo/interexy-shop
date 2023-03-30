import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { I18nContext } from "nestjs-i18n";
import { RoleRepository } from "./repos/role.repository";

// ========================== DTO's & Types ==========================
import { CreateRoleDto } from "./dtos/role-create.dto";

// ========================== Entities & Repos ==========================
import { RoleEntity } from "./entities/role.entity";
import { UserRoles } from "../../shared/types/user-roles.enum";

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const existedRole = await this.roleRepository.getRoleByName(createRoleDto.name);
    if (existedRole) {
      throw new HttpException(
        `${I18nContext.current().t("errors.roles.roleAlreadyExist")}: '${
          existedRole.name
        }'`,
        HttpStatus.BAD_REQUEST
      );
    }

    if (createRoleDto.type === UserRoles.superadmin) {
      throw new HttpException(
        `${I18nContext.current().t("errors.roles.roleSuperuserLimit")}`,
        HttpStatus.NOT_FOUND
      );
    }
    return await this.roleRepository.createRole(createRoleDto);
  }

  async getRoleByType(roleType: UserRoles): Promise<RoleEntity> {
    const role = await this.roleRepository.getRoleByType(roleType);
    if (!role) {
      throw new HttpException(
        `${I18nContext.current().t("errors.roles.roleDoesNotExist")}: '${roleType}'`,
        HttpStatus.BAD_REQUEST
      );
    }
    return role;
  }

  async getAll() {
    return await this.roleRepository.getAll();
  }

  async getRoleById(id: number) {
    const role = await this.roleRepository.getById(id);
    if (!role) {
      throw new HttpException(
        `${I18nContext.current().t("errors.roles.roleDoesNotExist")}: '${id}'`,
        HttpStatus.BAD_REQUEST
      );
    }
    return role;
  }

  async deleteRole(id: number): Promise<HttpStatus> {
    const role = await this.roleRepository.getById(id);

    if (role.type === UserRoles.superadmin) {
      throw new HttpException(
        `${I18nContext.current().t("errors.roles.roleSuperuserLimit")}`,
        HttpStatus.NOT_FOUND
      );
    }

    if (await this.roleRepository.deleteRole(id)) {
      return HttpStatus.OK;
    } else {
      throw new HttpException(
        `${I18nContext.current().t("errors.roles.roleDoesNotExist")}: '${id}'`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async updateRole(roleId: number, createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const role = await this.roleRepository.getById(roleId);
    if (!role) {
      throw new HttpException(
        `${I18nContext.current().t("errors.roles.roleDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );
    }

    const rolesByName = createRoleDto.name
      ? await this.roleRepository.getRolesByName(createRoleDto?.name)
      : null;
    if (
      rolesByName?.length &&
      (rolesByName.length > 1 || rolesByName[0]?.id !== +roleId)
    ) {
      throw new HttpException(
        `${I18nContext.current().t("errors.roles.roleAlreadyExist")}`,
        HttpStatus.NOT_FOUND
      );
    }

    if (role.type === UserRoles.superadmin) {
      throw new HttpException(
        `${I18nContext.current().t("errors.roles.roleSuperuserLimit")}`,
        HttpStatus.NOT_FOUND
      );
    }

    Object.assign(role, createRoleDto);
    return await this.roleRepository.updateRole(role);
  }
}
