import * as dotenv from "dotenv";
dotenv.config();

// ========================== nest ==========================
import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";

// ========================== dto ==========================
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
