import { Injectable } from "@nestjs/common";
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
    ) {}

    async generateJwt(dto: UserSessionDto): Promise<TokenDto> {
        const access_token = this.jwtService.sign(dto);

        return { access_token };
    }

    async getUserWithRoleById(id: string): Promise<UserEntity> {
        return this.userRepository.getUserWithRoleById(id);
    }
}
