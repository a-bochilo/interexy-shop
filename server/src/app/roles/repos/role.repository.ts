// ========================== nest ======================================
import { Injectable } from "@nestjs/common";

// ========================== typeorm ===================================
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// ========================== enums =====================================
import { UserRoles } from "../../../shared/types/user-roles.enum";

// ========================== entities & dto's ==========================
import { RoleEntity } from "../entities/role.entity";
import { CreateRoleDto } from "../dtos/role-create.dto";

@Injectable()
export class RoleRepository extends Repository<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity) RoleRepository: Repository<RoleEntity>
  ) {
    super(
      RoleRepository.target,
      RoleRepository.manager,
      RoleRepository.queryRunner
    );
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const role = this.create({
      created: new Date(),
      updated: new Date(),
      name: createRoleDto.name,
      type: createRoleDto.type,
      permissions: createRoleDto.permissions,
    });
    return await this.save(role);
  }

  async getRoleByType(roleType: UserRoles) {
    return await this.findOne({
      where: { type: roleType },
    });
  }

  async getAll() {
    return await this.find();
  }

  async getById(id: number) {
    return await this.findOneBy({ id: id });
  }

  async deleteRole(id: number) {
    return await this.delete({ id: id });
  }

  async updateRole(role: CreateRoleDto) {
    return await this.save(role);
  }

  async getRoleByName(roleName: string) {
    return await this.findOneBy({ name: roleName });
  }

  async getRolesByName(roleName: string) {
    return await this.find({ where: { name: roleName } });
  }
}
