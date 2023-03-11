import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "./repos/user.repository";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserRoles } from "src/shared/types/user-roles.enum";
import { UserEntity } from "./entities/user.entity";
import { RoleService } from "../roles/role.service";
import { UserDetailsRepository } from "./repos/user-details.repository";
import { AssignUserRoleDto } from "./dtos/assign-role-user.dto";
import { UserDetailsDto } from "./dtos/user-details.dto";

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
        return await this.userRepository.getAll();
    }

    async getById(userId: 'uuid') {
        return await this.userRepository.getFullUserById(userId);
    }

    async assignUserRole(assignUserRoleDto: AssignUserRoleDto, userId: 'uuid') {
        const user = await this.userRepository.getUserWithRoleById(userId);
        const newRole = await this.roleService.getRoleById(
            assignUserRoleDto.newRole
        );
        user.role = newRole;
        user.roleId = newRole.id;
        user.roleType = newRole.type;
        console.log(user)
        return await this.userRepository.updateUser(user);
    };

    async deleteUserById(userId: 'uuid') {
        return await this.userRepository.deleteUser(userId);
    }

    async updateUserDetails(newDetails: UserDetailsDto, userId: 'uuid') {

        const user = await this.userRepository.getUserWithDetails(userId);
        await this.userDetailsRepository.deleteDetails(user.details.id)
        const details = await this.userDetailsRepository.createUserDetails({
            firstname: newDetails.firstname,
            lastname: newDetails.lastname,
            middlename: newDetails?.middlename || null,
        });
        user.details = details;
       return await this.userRepository.updateUser(user);
    }
}