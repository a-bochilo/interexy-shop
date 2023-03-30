import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthPermissionsGuard } from "../security/decorators/auth-permissions-guard.decorator";
import { User } from "./decorators/user.decorator";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

// ========================== Entities & DTO's ==========================
import { UserEntity } from "./entities/user.entity";
import { AssignUserRoleDto } from "./dtos/user-assigne-role.dto";
import { UserDetailsEntity } from "./entities/user-details.entity";
import { UserSessionDto } from "./dtos/user-session.dto";
import { UpdateUserDto } from "./dtos/user-update.dto";

// ========================== Enums =====================================
import { UserPermissions } from "../../shared/types/user-permissions.enum";

// ========================== Services & Controllers ====================
import { UserService } from "./user.service";

@ApiTags("Users controller")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  //GET ALL USERS
  @Get("")
  //@AuthPermissionsGuard(UserPermissions.getAllUsers)
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserEntity,
    isArray: true,
  })
  @UsePipes(new ValidationPipe())
  async getAllUsers(
    @Query("isActive") isActive: boolean
  ): Promise<UserSessionDto[]> {
    const usersFromDB = await this.userService.getAllUsers(isActive);
    const res = usersFromDB.map((user) => UserSessionDto.fromEntity(user));
    return res;
  }

  //GET ONE USER BY ID ---------------------------------------USER
  @Get("/profile")
  @AuthPermissionsGuard(UserPermissions.getUserProfile)
  @ApiOperation({ summary: "Get current user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserDetailsEntity,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async getUserProfile(
    @User() user: UserSessionDto
  ): Promise<UserDetailsEntity> {
    return await this.userService.getDetailsById(user.id);
  }

  //UPDATE DETAILS BY USER ID ---------------------------------------USER
  @Put("/profile")
  @AuthPermissionsGuard(UserPermissions.updateUserProfile)
  @ApiOperation({ summary: "Update user details (user)" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserEntity,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async updateUserProfile(
    @Body() info: UpdateUserDto,
    @User() user: UserSessionDto
  ): Promise<UserEntity> {
    return await this.userService.updateUserDetails(info, user.id);
  }

  //GET ONE USER BY ID ----------------------------------------------ADMIN
  @Get("/:userId")
  @AuthPermissionsGuard(UserPermissions.getUserById)
  @ApiOperation({ summary: "Get user by id (admin)" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserDetailsEntity,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async getUserById(
    @Param("userId") userId: string
  ): Promise<UserDetailsEntity> {
    return await this.userService.getDetailsById(userId);
  }

  //UPDATE DETAILS BY USER ID ---------------------------------------ADMIN
  @Put("/:userId")
  @AuthPermissionsGuard(UserPermissions.updateDetails)
  @ApiOperation({ summary: "Update user details (admin)" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserEntity,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async updateDetails(
    @Body() info: UpdateUserDto,
    @Param("userId") userId: string
  ): Promise<UserEntity> {
    return await this.userService.updateUserDetails(info, userId);
  }

  //DELETE ONE BY ID ---------------------------------------ADMIN
  @Delete("/:userId")
  //@AuthPermissionsGuard(UserPermissions.deleteUserById)
  @ApiOperation({ summary: "Delete user by id (change isActive) (admin)" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserEntity,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async deleteUserById(@Param("userId") userId: string): Promise<UserEntity> {
    return await this.userService.deleteUserById(userId);
  }

  //ASSIGN ROLE BY ID ---------------------------------------ADMIN
  @Post("/assignRole/:userId")
  @AuthPermissionsGuard(UserPermissions.assignRoleById)
  @ApiOperation({ summary: "Assign role for user by id (admin)" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserEntity,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async assignRoleById(
    @Body() assignUserRoleDto: AssignUserRoleDto,
    @Param("userId") userId: string
  ): Promise<UserEntity> {
    return await this.userService.assignUserRole(assignUserRoleDto, userId);
  }
}
