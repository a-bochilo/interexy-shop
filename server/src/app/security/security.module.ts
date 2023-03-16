import * as dotenv from "dotenv";
dotenv.config();

// ========================== Common ==========================
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// ========================== JWT ==========================
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";

// ========================== Services, Controllers ==========================
import { SecurityService } from "./security.service";

// ========================== Repos + Entities ==========================
import { UserEntity } from "../users/entities/user.entity";
import { UserRepository } from "../users/repos/user.repository";
import { RoleRepository } from "../roles/repos/role.repository";
import { RoleEntity } from "../roles/entities/role.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, RoleEntity]),
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY,
            signOptions: { expiresIn: "3600s" },
        }),
    ],
    controllers: [],
    providers: [SecurityService, JwtStrategy, UserRepository, RoleRepository],
    exports: [SecurityService],
})
export class SecurityModule {}
