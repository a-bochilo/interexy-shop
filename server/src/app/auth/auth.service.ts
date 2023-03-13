// ========================== nest ==========================
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

// ========================== bcrypt ==========================
import { compare } from "bcrypt";

// ========================== Service ==========================
import { SecurityService } from "app/security/security.service";

// ========================== Repo ==========================
import { UserRepository } from "app/users/repos/user.repository";

// ========================== dtos ==========================
import { TokenDto } from "app/security/dtos/token.dto";
import { UserSignInDto } from "./dtos/user-sign-in.dto";
import { UserSessionDto } from "app/users/dtos/user-session.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly securityService: SecurityService
    ) {}

    async signIn(dto: UserSignInDto): Promise<TokenDto> {
        const userFromDB = await this.userRepository.getUserByEmail(dto.email);

        if (!userFromDB)
            throw new HttpException("User not found", HttpStatus.BAD_REQUEST);

        const isPasswordCorrect = compare(dto.password, userFromDB.password);

        if (!isPasswordCorrect)
            throw new HttpException(
                "Wrong password",
                HttpStatus.UNPROCESSABLE_ENTITY
            );

        const payload = UserSessionDto.fromEntity(userFromDB);
        const access_token = await this.securityService.generateJwt(payload);

        return access_token;
    }
}
