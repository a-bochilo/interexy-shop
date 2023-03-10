import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Delete,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { DeleteResult } from "typeorm";

// ========================== Services ==========================
import { RoleService } from "./role.service";

// ========================== DTO's & Types ==========================
import { CreateRoleDto } from "./dtos/create-role.dto";
import { RoleEntity } from "./entities/role.entity";

// ========================== Security ==========================

@Controller("roles")
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post()
    async createRole(
        @Body() createRoleDto: CreateRoleDto
    ): Promise<RoleEntity> {
        return await this.roleService.createRole(createRoleDto);
    }

    @Get()
    async getAll() {
        return await this.roleService.getAll();
    }
}
