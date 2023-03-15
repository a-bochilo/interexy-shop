import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

// ========================== Repos + Entities ==========================
import { UserRepository } from "../users/repos/user.repository";
import { UserEntity } from "../users/entities/user.entity";

// ========================== DTO's ==========================
import { UserSessionDto } from "../users/dtos/user-session.dto";
import { TokenDto } from "./dtos/token.dto";

@Injectable()
export class SecurityService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) { }

    async generateJwt(user: UserEntity): Promise<TokenDto> {
        try {

            const payload = await UserSessionDto.fromEntity(user);
            const plainObj = {
                id: payload.id,
                email: payload.email,
                role_id: payload.role_id,
                role_type: payload.role_type,
                permissons: payload.permissions,
            };
            const token = this.jwtService.sign(plainObj);
            return { token };
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async getUser(id: string): Promise<UserEntity> {
        try {
            return await this.userRepository.getById(id)
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }
    }
}
