import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

// ========================== Entities & DTO's ==========================
import { CreateUserDto } from "./dtos/create-user.dto";
import { AssignUserRoleDto } from "./dtos/assign-role-user.dto";
import { UserEntity } from "./entities/user.entity";

// ========================== Repositories ==============================
import { UserRepository } from "./repos/user.repository";
import { UserDetailsRepository } from "./repos/user-details.repository";
import { UserViewRepository } from "./repos/user-view.repository";

// ========================== Enums =====================================
import { UserRoles } from "src/shared/types/user-roles.enum";

// ========================== Services & Controllers ====================
import { RoleService } from "../roles/role.service";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Injectable()
export class UserService {
    constructor(
        private readonly userDetailsRepository: UserDetailsRepository,
        private readonly userRepository: UserRepository,
        private readonly userViewRepository: UserViewRepository,
        private readonly roleService: RoleService
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        try {
            const email = await this.userRepository.getUserByEmail(createUserDto.email);
            if (email) {
                throw new HttpException(
                    `User with ${createUserDto.email} already exist`,
                    HttpStatus.BAD_REQUEST
                )
            }
            const role = await this.roleService.getRoleByType(UserRoles.user);
            const details = await this.userDetailsRepository.createUserDetails(
                createUserDto.details
            );

            return await this.userRepository.createUser({
                ...createUserDto,
                details,
                role,
            });
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async getAll() {
        try {
            return await this.userViewRepository.getAll();
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async getUsers(isActive: boolean) {
        try {
            if (isActive === undefined) {
                return await this.userViewRepository.getAll();
            }
            return await this.userRepository.getInActiveUsers(false);
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async getDetailsById(userId: string) {
        try {
            const user = await this.userRepository.getById(userId);
            return await this.userDetailsRepository.getDetails(user.details_id);
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async getById(userId: string) {
        try {
            return await this.userRepository.getById(userId);
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async assignUserRole(assignUserRoleDto: AssignUserRoleDto, userId: string) {
        try {
            const user = await this.userRepository.getById(userId);
            const newRole = await this.roleService.getRoleById(
                assignUserRoleDto.newRole
            );
            user.updated = new Date();
            user.role = newRole;
            user.roleId = newRole.id;
            user.roleType = newRole.type;
            return await this.userRepository.updateUser(user);
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }
    };

    async deleteUserById(userId: string) {
        return await this.userRepository.deleteUser(userId);
    }

    async updateUserDetails(info: UpdateUserDto, userId: string) {
        try {
            const user = await this.userRepository.getById(userId);
            let details = await this.userDetailsRepository.getDetails(user.details_id as string);
            const newDetails = await this.userDetailsRepository.createUserDetails(
                Object.assign(details, info.details)
            );
            const role = await this.roleService.getRoleById(user.roleId);
            delete (info.details);
            Object.assign(user, info);

            user.updated = new Date();
            details = newDetails;

            await this.userDetailsRepository.deleteDetails(user.details_id as string);
            return await this.userRepository.updateUser({
                ...user,
                details,
                role
            });
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async updateUserOrder(user: UserEntity) {
        try {
            const newUser = await this.userRepository.getById(user.id);
            Object.assign(newUser, user)
            return await this.userRepository.updateUser(user);
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async getOrdersById(id: string) {
        try {
            return await this.userRepository.getOrdersById(id);
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async getUserByEmail(email: string) {
        try {
            return await this.userRepository.getUserByEmail(email);
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }
    }

}