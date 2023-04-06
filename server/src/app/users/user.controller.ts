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
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

// ========================== decorators ================================
import { AuthPermissionsGuard } from "../security/decorators/auth-permissions-guard.decorator";
import { User } from "./decorators/user.decorator";

// ========================== swagger ===================================
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

// ========================== entities & dto's ==========================
import { UserEntity } from "./entities/user.entity";
import { AssignUserRoleDto } from "./dtos/user-assigne-role.dto";
import { UserDetailsEntity } from "./entities/user-details.entity";
import { UserSessionDto } from "./dtos/user-session.dto";
import { UpdateUserDto } from "./dtos/user-update.dto";
import { UserDetailsDto } from "./dtos/user-details.dto";

// ========================== enums =====================================
import { UserPermissions } from "../../shared/types/user-permissions.enum";

// ========================== services & controllers ====================
import { UsersService } from "./user.service";

@ApiTags("Users controller")
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  //=============================== get all users ===============================================
  @Get("")
  @AuthPermissionsGuard(UserPermissions.getAllUsers)
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
    return await usersFromDB.map((user) => UserSessionDto.fromEntity(user));
  }

  //=============================== the user can get his profile ==================================
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
  async getUserProfile(@User() user: UserSessionDto): Promise<UserDetailsDto> {
    const detailsFromDB = await this.userService.getDetailsById(user.id);
    return await UserDetailsDto.fromEntity(detailsFromDB);
  }

  //=============================== the user can update his profile ==================================
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
  ): Promise<UserSessionDto> {
    const userFromDB = await this.userService.updateUserDetails(info, user.id);
    return await UserSessionDto.fromEntity(userFromDB);
  }

  //=============================== admin can get current user profile =================================
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
  async getUserById(@Param("userId") userId: string): Promise<UserDetailsDto> {
    const detailsFromDB = await this.userService.getDetailsById(userId);
    return await UserDetailsDto.fromEntity(detailsFromDB);
  }

  //=============================== admin can update current user profile =================================
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
  ): Promise<UserSessionDto> {
    const userFromDB = await this.userService.updateUserDetails(info, userId);
    return await UserSessionDto.fromEntity(userFromDB);
  }

  //=============================== admin can delete current user ==========================================
  @Delete("/:userId")
  @AuthPermissionsGuard(UserPermissions.deleteUserById)
  @ApiOperation({ summary: "Delete user by id (change isActive) (admin)" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserSessionDto,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async deleteUserById(
    @Param("userId") userId: string
  ): Promise<UserSessionDto> {
    const userFromDB = await this.userService.deleteUserById(userId);
    return await UserSessionDto.fromEntity(userFromDB);
  }

  //=============================== admin can assign role for current user ===================================
  @Post("/assignRole/:userId")
  @AuthPermissionsGuard(UserPermissions.assignRoleById)
  @ApiOperation({ summary: "Assign role for user by id (admin)" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserSessionDto,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async assignRoleById(
    @Body() assignUserRoleDto: AssignUserRoleDto,
    @Param("userId") userId: string
  ): Promise<UserSessionDto> {
    const userFromDB = await this.userService.assignUserRole(
      assignUserRoleDto,
      userId
    );
    return await UserSessionDto.fromEntity(userFromDB);
  }
}
