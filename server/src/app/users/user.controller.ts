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
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserEntity } from "./entities/user.entity";
import { AssignUserRoleDto } from "./dtos/assign-role-user.dto";
import { UserDetailsEntity } from "./entities/user-details.entity";
import { UserDetailsDto } from "./dtos/user-details.dto";
import { UserSessionDto } from "./dtos/user-session.dto";

// ========================== Enums =====================================
import { UserPermissions } from "../../shared/types/user-permissions.enum";

// ========================== Services & Controllers ====================
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserViewEntity } from "./entities/user-view.entity";

@ApiTags("Users controller")
@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    //CREATE
    @Post()
    @ApiOperation({ summary: "Create new user" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: UserEntity,
        isArray: false,
    })
    @UsePipes(new ValidationPipe())
    async create(@Body() userDto: CreateUserDto): Promise<UserEntity> {
        return await this.userService.createUser(userDto);
    }

    //GET ALL INACTIVE USERS
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
    async getInActiveUsers(
        @Query("isActive") isActive: boolean
    ): Promise<UserEntity[] | UserViewEntity[]> {
        return this.userService.getUsers(isActive);
    }

    //GET ONE USER BY ID ----------------------------------------------ADMIN
    @Get("/:userId")
    //@AuthPermissionsGuard(UserPermissions.getUserById)
    @ApiOperation({ summary: "Get user by id (admin)" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: UserDetailsEntity,
        isArray: false,
    })
    @UsePipes(new ValidationPipe())
    async getUserById(
        @Param("userId") userId: "uuid"
    ): Promise<UserDetailsEntity> {
        return await this.userService.getById(userId);
    }

    //UPDATE DETAILS BY USER ID ---------------------------------------ADMIN
    @Put("/:userId")
    //@AuthPermissionsGuard(UserPermissions.assignRole)
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
        @Param("userid") userId: "uuid"
    ): Promise<UserEntity> {
        return await this.userService.updateUserDetails(info, userId);
    }

    //DELETE ONE BY ID ---------------------------------------ADMIN
    @Delete("/:userId")
    //@AuthPermissionsGuard(UserPermissions.deleteUser)
    @ApiOperation({ summary: "Delete user by id (change isActive) (admin)" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: UserEntity,
        isArray: false,
    })
    @UsePipes(new ValidationPipe())
    async deleteUserById(@Param("userId") userId: "uuid"): Promise<UserEntity> {
        return await this.userService.deleteUserById(userId);
    }

    //ASSIGN ROLE BY ID ---------------------------------------ADMIN
    @Post("/assignRole/:userId")
    //@AuthPermissionsGuard(UserPermissions.assignRole)
    @ApiOperation({ summary: "Assign role for user by id (admin)" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: UserEntity,
        isArray: false,
    })
    @UsePipes(new ValidationPipe())
    async assignRole(
        @Body() assignUserRoleDto: AssignUserRoleDto,
        @Param("userId") userId: "uuid"
    ): Promise<UserEntity> {
        return await this.userService.assignUserRole(assignUserRoleDto, userId);
    }

    //GET ONE USER BY ID ---------------------------------------USER
    @Get("/profile")
    //@AuthPermissionsGuard(UserPermissions.getProfile)
    @ApiOperation({ summary: "Get user by id (user)" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: UserDetailsEntity,
        isArray: false,
    })
    @UsePipes(new ValidationPipe())
    async getProfile(@User() user: UserSessionDto): Promise<UserDetailsEntity> {
        return await this.userService.getById(user.id as "uuid");
    }

    //UPDATE DETAILS BY USER ID ---------------------------------------USER
    @Put("/profile")
    //@AuthPermissionsGuard(UserPermissions.updateProfile)
    @ApiOperation({ summary: "Update user details (user)" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: UserEntity,
        isArray: false,
    })
    @UsePipes(new ValidationPipe())
    async updateProfile(
        @Body() info: CreateUserDto,
        @User() user: UserSessionDto
    ): Promise<UserEntity> {
        return await this.userService.updateUserDetails(
            info,
            user.id as "uuid"
        );
    }
}
