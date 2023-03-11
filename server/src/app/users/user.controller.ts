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

    //GET ALL USERS WITHOUT RELATIONS
    @Get('/all')
   // @GuardPermissions(UserPermissions.getAllUsers)
    //@UsePipes(new ValidationPipe())
    async getAllUsers()/*: Promise<UserSessionDto[]> */{
        // const userFromDB = await this.userService.getAll()
        // return userFromDB.map(users => UserSessionDto.fromEntity(users));
        return this.userService.getAll()
    }

    //GET ONE USER BY ID
    @Get("/:userId")
    //@GuardPermissions(UserPermissions.getUserById)
    @UsePipes(new ValidationPipe())
    async getUserById(@Param("userId") userId: 'uuid'): Promise<UserSessionDto> {
        const userFromDB = await this.userService.getById(userId);
        return await UserSessionDto.fromEntity(userFromDB);
    }

    //UPDATE DETAILS BY USER ID
    @Put("/:userId")    
    //@GuardPermissions(UserPermissions.assignRole)
    //@UsePipes(new ValidationPipe())
    async updateDetails(
        @Body() info: CreateUserDto,
        @Param("userid") userId: 'uuid'
    )/*: Promise<UserEntity>*/{
        return await this.userService.updateUserDetails(info, userId);
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

    //ASSIGNE ROLE BY ID
    @Post("/assignRole/:userId")    
    //@GuardPermissions(UserPermissions.assignRole)
    @UsePipes(new ValidationPipe())
    async assignRole(
        @Body() assignUserRoleDto: AssignUserRoleDto,
        @Param("userid") userId: 'uuid'
    ):Promise <UserEntity> {
        return await this.userService.assignUserRole(assignUserRoleDto, userId);
    }

    //GET USER DETAILS BY USER ID
    @Get('/details/:userId')
    @UsePipes(new ValidationPipe())
    async getDetailsByUserId(@Param("userId") userId: 'uuid') {
        return await this.userService.getDetailsByUserId(userId)
    }

    //GET USER ROLE BY USER ID
    @Get('/role/:userId')
    @UsePipes(new ValidationPipe())
    async getRoleByUserId(@Param("userId") userId: 'uuid' ) {
        return await this.userService.getRoleByUserId(userId);
    }

}

/*
//CREATE
@Post()

//GET ALL USERS WITHOUT RELATIONS
@Get('/all')

//GET ONE USER BY ID WITHOUT RELATIONS
@Get("/:userId")

//GET USER DETAILS BY USER ID
@Get('/details/:userId')

//GET USER ROLE BY USER ID
@Get('/role/:userId')

//UPDATE USER INFO ID
@Put("/:userId")    

//DELETE ONE USER BY ID
@Post("/delete/:userId")

//ASSIGNE ROLE BY ID
@Post("/assignRole/:userId")    


*/