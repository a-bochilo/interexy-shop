import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";

@Controller("users")
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @Get()
    getAllUsers() {
        return this.userService.getAll();
    }
}