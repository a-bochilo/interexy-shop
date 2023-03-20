import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RoleRepository } from "./repos/role.repository";

// ========================== DTO's & Types ==========================
import { CreateRoleDto } from "./dtos/create-role.dto";

// ========================== Entities & Repos ==========================
import { RoleEntity } from "./entities/role.entity";
import { UserRoles } from "../../shared/types/user-roles.enum";

@Injectable()
export class RoleService {
    constructor(private readonly roleRepository: RoleRepository) {}

    async createRole(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
        const existedRole = await this.roleRepository.getRoleByName(createRoleDto.name);
        if(existedRole) {
            throw new HttpException(
                `Role '${existedRole.name}' already exist`,
                HttpStatus.BAD_REQUEST
              );
        }
        return await this.roleRepository.createRole(createRoleDto);
    }

    async getRoleByType(roleType: UserRoles) {
        return await this.roleRepository.getRoleByType(roleType);
    }

    async getAll() {
        return await this.roleRepository.getAll();
    }

    async getRoleById(id: number) {
        return await this.roleRepository.getById(id);
    }

    async deleteRole(id: number) {
        if(await this.roleRepository.deleteRole(id)) {
            return HttpStatus.OK;
        }
    }

    async updateRole(id: number, createRoleDto: CreateRoleDto) {
        const role = await this.roleRepository.getById(id);
        Object.assign(role, createRoleDto);
        return await this.roleRepository.updateRole(role);
    }
}
