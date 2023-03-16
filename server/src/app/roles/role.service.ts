import { Injectable } from "@nestjs/common";
import { DeleteResult } from "typeorm";
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
        return this.roleRepository.createRole(createRoleDto);
    }

    async getRoleByType(roleType: UserRoles) {
        return this.roleRepository.getRoleByType(roleType);
    }

    async getAll() {
        return await this.roleRepository.getAll();
    }

    async getRoleById(id: number) {
        return await this.roleRepository.getById(id);
    }

    async deleteRole(id: number) {
        return await this.roleRepository.deleteRole(id);
    }

    async updateRole(id: number, createRoleDto: CreateRoleDto) {
        const role = await this.roleRepository.getById(id);
        Object.assign(role, createRoleDto);
        return await this.roleRepository.updateRole(role);
    }
}
