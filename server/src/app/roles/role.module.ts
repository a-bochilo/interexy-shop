import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// ========================== Security ==========================
import { SecurityModule } from "../security/security.module";

// ========================== Entities ==========================
import { UserDetailsEntity } from "../users/entities/user-details.entity";
import { UserEntity } from "../users/entities/user.entity";
import { RoleEntity } from "./entities/role.entity";

// ========================== Repos ==========================
import { RoleRepository } from "./repos/role.repository";
import { UserDetailsRepository } from "../users/repos/user-details.repository";
import { UserRepository } from "../users/repos/user.repository";

// ========================== Services & Controllers ==========================
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { UserService } from "../users/user.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([RoleEntity, UserEntity, UserDetailsEntity]),
        SecurityModule,
    ],
    controllers: [RoleController],
    providers: [
        RoleService,
        RoleRepository,
        UserService,
        UserRepository,
        UserDetailsRepository,
    ],
    exports: [RoleService],
})
export class RoleModule { }
