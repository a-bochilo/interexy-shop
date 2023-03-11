import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserEntity } from "./entities/user.entity";
import { UserPermissions } from "src/shared/types/user-permissions.enum";
import { UserSessionDto } from "./dtos/user-session.dto";
import { GuardPermissions } from "../security/decorators/permissions-guard.decorator";
import { AssignUserRoleDto } from "./dtos/assign-role-user.dto";
import { UserDetailsEntity } from "./entities/user-details.entity";

@Controller("users")
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    //CREATE
    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() userDto: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(userDto);
    }

    //GET ALL
    @Get()
    @UsePipes(new ValidationPipe())
    getAllUsers(): Promise<UserEntity[]> {
        return this.userService.getAll();
    }

    //GET ONE BY ID
    @Get("/:userId")
    @UsePipes(new ValidationPipe())
    getUserById(@Param("userId") userId: 'uuid'): Promise<UserEntity> {
        return this.userService.getById(userId);
    }

    @Get(":userId/details")
    @GuardPermissions(UserPermissions.getUserDetailsByUserId)
    @UsePipes(new ValidationPipe())
    async getUserDetailsByUserId(
        @Param("userId") userId: 'uuid'
    ): Promise<UserDetailsEntity> {
        return await this.userService.getUserDetails(userId);
    }

    //UPDATE ONE BY ID
    // @Put("/:userId")
    
    // //DELETE ONE BY ID
    // @Delete("/:userId")

    //ASSIGNE ROLE BY ID
    @Post("/assignRole/:userId")    
    @GuardPermissions(UserPermissions.assignRole)
    @UsePipes(new ValidationPipe())
    async assignRole(
        @Body() assignUserRoleDto: AssignUserRoleDto,
        @Param("userid") userId: 'uuid'
    ): Promise<UserSessionDto> {
        const userFromDB = await this.userService.assignUserRole(
            assignUserRoleDto,
            userId
        );
        return await UserSessionDto.fromEntity(userFromDB);
    }

}