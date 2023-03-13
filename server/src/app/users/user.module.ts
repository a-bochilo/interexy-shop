import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "../roles/entities/role.entity";
import { SecurityModule } from "../security/security.module";
import { UserDetailsEntity } from "./entities/user-details.entity";
import { UserEntity } from "./entities/user.entity";
import { UserRepository } from "./repos/user.repository";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { RoleService } from "../roles/role.service";
import { RoleRepository } from "../roles/repos/role.repository";
import { UserDetailsRepository } from "./repos/user-details.repository";
import { UserViewEntity } from "./entities/user-view.entity";
import { UserViewRepository } from "./repos/user-view.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity, 
            RoleEntity, 
            UserDetailsEntity,
            UserViewEntity
        ]),
        SecurityModule,
    ],
    controllers: [UserController],
    providers: [
        RoleService,
        RoleRepository,
        UserService,
        UserRepository,
        UserDetailsRepository,
        UserViewRepository,
    ],
    exports: [UserService],
})
export class UserModule {}
