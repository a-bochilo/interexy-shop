import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

// ========================== Repos + Entities ==========================
import { UserRepository } from "../users/repos/user.repository";
import { UserEntity } from "../users/entities/user.entity";

// ========================== DTO's ==========================
import { UserSessionDto } from "../users/dtos/user-session.dto";
import { TokenDto } from "./dtos/token.dto";
import { RoleRepository } from "../roles/repos/role.repository";

@Injectable()
export class SecurityService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRepository,
        private readonly jwtService: JwtService
    ) {}

    async generateJwt(user: UserEntity): Promise<TokenDto> {
        const payload = await UserSessionDto.fromEntity(user);
        const token = this.jwtService.sign(payload);
        return { token };
    }

    async verifyJwt(jwt: string) {
        try {
            return await this.jwtService.verify(jwt);
        } catch (error) {
            throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
        }
    }

    async getUser(id: string): Promise<UserEntity> {
        try {
            const user = await this.userRepository.getById(id);

            //! Если мы возвращаем DTO без роли, то нам наверно не нужен запрос ниже + нужно убрать try..catch и verifyJwt!
            user.role = await this.roleRepository.getById(user.roleId);
            return user;
        } catch (error) {
            throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
        }
    }
}
