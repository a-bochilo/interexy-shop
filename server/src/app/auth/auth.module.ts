// ========================== Nest ==========================
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// ========================== Entities & DTO's ==========================
import { UserEntity } from "../users/entities/user.entity";
import { RoleEntity } from "../roles/entities/role.entity";
import { UserDetailsEntity } from "../users/entities/user-details.entity";

// ========================== Repositories ==============================
import { UserRepository } from "../users/repos/user.repository";
import { RoleRepository } from "../roles/repos/role.repository";
import { UserDetailsRepository } from "../users/repos/user-details.repository";

// ========================== Services & Controllers ====================
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

// ========================== Modules ===================================
import { SecurityModule } from "../security/security.module";
import { CartRepository } from "../cart/repos/cart.repository";
import { CartEntity } from "../cart/entities/cart.entity";

@Module({
  imports: [TypeOrmModule.forFeature([
    UserEntity,
    RoleEntity,
    UserDetailsEntity,
    CartEntity,
  ]), 
  SecurityModule],
  providers: [
    AuthService, 
    UserRepository, 
    RoleRepository, 
    UserDetailsRepository,
    CartRepository,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
