import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserEntity } from "./entities/user.entity";
import { UserPermissions } from "src/shared/types/user-permissions.enum";
import { UserSessionDto } from "./dtos/user-session.dto";
import { GuardPermissions } from "../security/decorators/permissions-guard.decorator";
import { AssignUserRoleDto } from "./dtos/assign-role-user.dto";
import { UserDetailsEntity } from "./entities/user-details.entity";
import { UserDetailsDto } from "./dtos/user-details.dto";

@Controller("users")
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    //CREATE
    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() userDto: CreateUserDto): Promise<UserEntity> {
        return await this.userService.createUser(userDto);
    }

    //GET ALL
    @Get()
    @UsePipes(new ValidationPipe())
    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userService.getAll();
    }

    //GET ONE BY ID
    @Get("/:userId")
    @UsePipes(new ValidationPipe())
    async getUserById(@Param("userId") userId: 'uuid'): Promise<UserEntity> {
        return await this.userService.getById(userId);
    }

    @Get(":userId/details")
    @GuardPermissions(UserPermissions.getUserDetailsByUserId)
    @UsePipes(new ValidationPipe())
    async getUserDetailsByUserId(
        @Param("userId") userId: 'uuid'
    ): Promise<UserDetailsEntity> {
        return await this.userService.getUserDetails(userId);
    }

    @Put("/newDetails/:userId")    
    //@GuardPermissions(UserPermissions.assignRole)
    @UsePipes(new ValidationPipe())
    async updateDetails(
        @Body() details: UserDetailsDto,
        @Param("userid") userId: 'uuid'
    ) {
        // const userFromDB = await this.userService.updateUserDetails(
        //     details,
        //     userId
        // );
        return await this.userService.updateUserDetails(details, userId);
    }
    
    //DELETE ONE BY ID
    @Post("/delete/:userId")
    //@GuardPermissions(UserPermissions.deleteUser)
    @UsePipes(new ValidationPipe())
    async deleteUserById(
        @Param('userId') userId: 'uuid'
    ): Promise<UserEntity> {
        return await this.userService.deleteUserById(userId);
    }
/*
    //ASSIGNE ROLE BY ID
    @Post("/assignRole/:userId")    
    @GuardPermissions(UserPermissions.assignRole)
    @UsePipes(new ValidationPipe())
    async assignRole(
        @Body() assignUserRoleDto: AssignUserRoleDto,
        @Param("userid") userId: 'uuid'
    ): Promise<UserSessionDto> {
        // const userFromDB = await this.userService.assignUserRole(
        //     assignUserRoleDto,
        //     userId
        // );
        // return await UserSessionDto.fromEntity(userFromDB);
    }
    */
}