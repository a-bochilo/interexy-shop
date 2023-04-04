// ========================== nest =====================================
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
  ValidationPipe,
} from "@nestjs/common";

// ========================== decorators ================================
import { AuthPermissionsGuard } from "../security/decorators/auth-permissions-guard.decorator";

// ========================== swagger ===================================
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

// ========================== services & controllers ====================
import { RoleService } from "./role.service";

// ========================== entities & dto's ==========================
import { CreateRoleDto } from "./dtos/role-create.dto";
import { RoleEntity } from "./entities/role.entity";

// ========================== enums =====================================
import { UserPermissions } from "../../shared/types/user-permissions.enum";
import { RoleDto } from "./dtos/role.dto";

@ApiTags("Roles controller")
@Controller("roles")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

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
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<RoleDto> {
    const role = await this.roleService.createRole(createRoleDto);
    return await RoleDto.fromEntity(role);
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
  async getAllRoles(): Promise<RoleDto[]> {
    const roles = await this.roleService.getAll();
    return await roles.map((item) => RoleDto.fromEntity(item));
  }

  @Get("/:id")
  @AuthPermissionsGuard(UserPermissions.getRoleById)
  @ApiOperation({ summary: "Get role by id" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: RoleEntity,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async getRoleById(@Param("id") id: number): Promise<RoleDto> {
    const role = await this.roleService.getRoleById(id);
    return await RoleDto.fromEntity(role);
  }

  @Delete("/:id")
  @AuthPermissionsGuard(UserPermissions.deleteRoleById)
  @ApiOperation({ summary: "Delete role by id" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: RoleEntity,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async deleteRoleById(@Param("id") id: number): Promise<RoleDto> {
    const role = await this.roleService.deleteRole(id);
    return await RoleDto.fromEntity(role);
  }

  @Put("/:id")
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
    @Param("id") id: number,
    @Body() createRoleDto: CreateRoleDto
  ): Promise<RoleDto> {
    const role = await this.roleService.updateRole(id, createRoleDto);
    return await RoleDto.fromEntity(role);
  }
}
