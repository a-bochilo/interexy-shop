import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "../roles/entities/role.entity";
import { SecurityModule } from "../security/security.module";
import { UserDetailsEntity } from "./entities/user-details.entity";
import { UserEntity } from "./entities/user.entity";
import { UserRepository } from "./repos/user.repository";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, RoleEntity, UserDetailsEntity]),
        SecurityModule,
    ],
    controllers: [UserController],
    providers: [
        UserService,
        UserRepository,
    ],
    exports: [UserService],
})
export class UserModule {}
