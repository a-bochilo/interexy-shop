// ========================== Nest ==========================
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// ========================== Security ==========================

// ========================== User ==========================


// ========================== Auth ==========================
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SecurityModule } from "../security/security.module";
import { UserEntity } from "../users/entities/user.entity";
import { UserRepository } from "../users/repos/user.repository";
import { RoleRepository } from "../roles/repos/role.repository";
import { UserDetailsRepository } from "../users/repos/user-details.repository";
import { RoleEntity } from "../roles/entities/role.entity";
import { UserDetailsEntity } from "../users/entities/user-details.entity";

@Module({
  imports: [TypeOrmModule.forFeature([
    UserEntity,
    RoleEntity,
    UserDetailsEntity,
  ]), 
  SecurityModule],
  providers: [
    AuthService, 
    UserRepository, 
    RoleRepository, 
    UserDetailsRepository
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
