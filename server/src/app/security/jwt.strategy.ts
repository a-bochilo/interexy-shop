import * as dotenv from "dotenv";
dotenv.config();

// ========================== Common ==========================
import { Injectable } from "@nestjs/common";

// ========================== JWT ==========================
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";

// ========================== DTO's ==========================
import { UserSessionDto } from "../users/dtos/user-session.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.PRIVATE_KEY,
        });
    }

    async validate(payload: UserSessionDto): Promise<UserSessionDto> {

        return UserSessionDto.fromJwt(payload);
    }
}
