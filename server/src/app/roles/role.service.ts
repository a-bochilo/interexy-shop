import { Injectable } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { RoleRepository } from "./repos/role.repository";

// ========================== DTO's & Types ==========================
import { CreateRoleDto } from "./dtos/create-role.dto";

// ========================== Entities & Repos ==========================
import { RoleEntity } from "./entities/role.entity";
import { UserRoles } from "src/shared/types/user-roles.enum";

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
}
