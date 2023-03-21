import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";

// ========================== Services ==========================
import { RoleService } from "./role.service";

// ========================== DTO's & Types ==========================
import { CreateRoleDto } from "./dtos/role-create.dto";
import { RoleEntity } from "./entities/role.entity";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDetailsEntity } from "../users/entities/user-details.entity";
import { UserPermissions } from "../../shared/types/user-permissions.enum";
import { AuthPermissionsGuard } from "../security/decorators/auth-permissions-guard.decorator";
import { DeleteResult } from "typeorm";


@ApiTags('Roles controller')
@Controller("roles")
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Post()
    @AuthPermissionsGuard(UserPermissions.createRole)
    @ApiOperation({ summary: "Create role" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: RoleEntity,
        isArray: false,
    })
    @UsePipes(new ValidationPipe())
    async createRole(
        @Body() createRoleDto: CreateRoleDto
    ): Promise<RoleEntity> {
        return await this.roleService.createRole(createRoleDto);
    }

    @Get()
    @AuthPermissionsGuard(UserPermissions.getAllRoles)
    @ApiOperation({ summary: "Get all roles" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: RoleEntity,
        isArray: true,
    })
    @UsePipes(new ValidationPipe())
    async getAllRoles(): Promise<RoleEntity[]> {
        return await this.roleService.getAll();
    }

    @Get('/:id')
    @AuthPermissionsGuard(UserPermissions.getRoleById)
    @ApiOperation({ summary: "Get role by id" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: RoleEntity,
        isArray: false,
    })
    @UsePipes(new ValidationPipe())
    async getRoleById(
        @Param("id") id: number
    ) {
        return await this.roleService.getRoleById(id);
    }

    @Delete('/:id')
    @AuthPermissionsGuard(UserPermissions.deleteRoleById)
    @ApiOperation({ summary: "Delete role by id" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: RoleEntity,
        isArray: false,
    })
    @UsePipes(new ValidationPipe())
    async deleteRoleById(
        @Param('id') id: number
    ): Promise<HttpStatus> {
        return await this.roleService.deleteRole(id)
    }

    @Put('/:id')
    @AuthPermissionsGuard(UserPermissions.updateRoleById)
    @ApiOperation({ summary: "Update role by id" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: RoleEntity,
        isArray: false,
    })
    @UsePipes(new ValidationPipe())
    async updateRoleById(
        @Param('id') id: number,
        @Body() createRoleDto: CreateRoleDto
    ) {
        return await this.roleService.updateRole(id, createRoleDto)
    }
}