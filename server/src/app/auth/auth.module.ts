// ========================== nest ==========================
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// ========================== entities ==========================
import { UserEntity } from "../users/entities/user.entity";
import { RoleEntity } from "../roles/entities/role.entity";
import { UserDetailsEntity } from "../users/entities/user-details.entity";
import { CartEntity } from "../cart/entities/cart.entity";
import { UserViewEntity } from "../users/entities/user-view.entity";

// ========================== repositories ==============================
import { UserRepository } from "../users/repos/user.repository";
import { RoleRepository } from "../roles/repos/role.repository";
import { UserDetailsRepository } from "../users/repos/user-details.repository";
import { CartRepository } from "../cart/repos/cart.repository";
import { UserViewRepository } from "../users/repos/user-view.repository";

// ========================== srvices & controllers ====================
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

// ========================== modules ===================================
import { SecurityModule } from "../security/security.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RoleEntity,
      UserDetailsEntity,
      UserViewEntity,
      CartEntity,
    ]),
    SecurityModule,
  ],
  providers: [
    AuthService,
    UserRepository,
    RoleRepository,
    UserDetailsRepository,
    CartRepository,
    UserViewRepository,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
