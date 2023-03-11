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
    ) { }

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
        return await this.userRepository.getById(userId);
    }

    async assignUserRole(assignUserRoleDto: AssignUserRoleDto, userId: 'uuid') {
        const user = await this.userRepository.getById(userId);
        const newRole = await this.roleService.getRoleById(
            assignUserRoleDto.newRole
        );
        user.role = newRole;
        user.roleId = newRole.id;
        user.roleType = newRole.type;
        return await this.userRepository.updateUser(user);
    };

    async deleteUserById(userId: 'uuid') {
        const detailsId = await this.userRepository.getDetailsId(userId);
        await this.userDetailsRepository.deleteDetails(detailsId);
        return await this.userRepository.deleteUser(userId);
    }

    async updateUserDetails(info: CreateUserDto, userId: 'uuid') {
        const user = await this.userRepository.getById(userId);
        const detailsId = await this.userRepository.getDetailsId(userId);
        let details = await this.userDetailsRepository.getDetails(detailsId);
        const newDetails = await this.userDetailsRepository.createUserDetails(
            Object.assign(details, info.details)
        );
        const role = await this.roleService.getRoleById(user.roleId);
        delete(info.details);
        Object.assign(user, info);
        details = newDetails;
        await this.userDetailsRepository.deleteDetails(detailsId);
        return await this.userRepository.updateUser({
            ...user,
            details,
            role
        })
    }

    async getDetailsByUserId(userId: 'uuid') {
        const detailsId = await this.userRepository.getDetailsId(userId);
        return await this.userDetailsRepository.getDetails(detailsId);
    }

    async getRoleByUserId(userId: 'uuid') {
        const user = await this.userRepository.getById(userId);
        return await this.roleService.getRoleById(user.roleId);
    }

}