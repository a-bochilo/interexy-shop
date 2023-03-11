import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "./repos/user.repository";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserRoles } from "src/shared/types/user-roles.enum";
import { UserEntity } from "./entities/user.entity";
import { RoleService } from "../roles/role.service";
import { UserDetailsRepository } from "./repos/user-details.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly userDetailsRepository: UserDetailsRepository,
        private readonly userRepository: UserRepository,
        private readonly roleService: RoleService
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {

        const role = await this.roleService.getRoleByType(UserRoles.user);

        const details = await this.userDetailsRepository.createUserDetails(
            createUserDto.details
        );

        return await this.userRepository.createUser({
            ...createUserDto,
            details,
            role,
        });
    }

    async getAll() {
        return this.userRepository.getAll();
    }
}