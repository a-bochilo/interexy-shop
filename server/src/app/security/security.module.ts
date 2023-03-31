import * as dotenv from "dotenv";
dotenv.config();

// ========================== nest ==========================
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

// ========================== jwt ==========================
import { JwtStrategy } from "./jwt.strategy";

// ========================== services & controllers ==========================
import { SecurityService } from "./security.service";

// ================================= entities ================================
import { UserEntity } from "../users/entities/user.entity";
import { RoleEntity } from "../roles/entities/role.entity";

// ================================== repository ==================================
import { UserRepository } from "../users/repos/user.repository";
import { RoleRepository } from "../roles/repos/role.repository";

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
