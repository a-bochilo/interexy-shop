// ========================== Nest ==========================
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// ========================== Security ==========================
import { SecurityModule } from "app/security/security.module";

// ========================== User ==========================
import { UserEntity } from "app/users/entities/user.entity";
import { UserRepository } from "app/users/repos/user.repository";

// ========================== Auth ==========================
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), SecurityModule],
  providers: [AuthService, UserRepository],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
