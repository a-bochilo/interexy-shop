import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// ========================== DTO's & Types ==========================
import { CreateRoleDto } from "../dtos/create-role.dto";


// ========================== Entities ==========================
import { RoleEntity } from "../entities/role.entity";

@Injectable()
export class RoleRepository extends Repository<RoleEntity> {
    constructor(
        @InjectRepository(RoleEntity) RoleRepository: Repository<RoleEntity>,
    ) {
        super(RoleRepository.target, RoleRepository.manager, RoleRepository.queryRunner);
    }

    async createRole(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
        const newRole = new RoleEntity();
        Object.assign(newRole, createRoleDto);
        return await this.save(newRole);
    }
}
