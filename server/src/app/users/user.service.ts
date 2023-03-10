import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "./repos/user.repository";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserRoles } from "src/shared/types/user-roles.enum";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async createUser(dto: CreateUserDto): Promise<UserEntity> {
        return await this.userRepository.createUser({...dto});
    }

    async getAll() {
        return this.userRepository.getAll();
    }
}