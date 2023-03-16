import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// ========================== Entities & DTO's ==========================
import { RoleEntity } from "../roles/entities/role.entity";
import { UserDetailsEntity } from "./entities/user-details.entity";
import { UserEntity } from "./entities/user.entity";
import { UserViewEntity } from "./entities/user-view.entity";

// ========================== Repositories ==============================
import { UserRepository } from "./repos/user.repository";
import { RoleRepository } from "../roles/repos/role.repository";
import { UserDetailsRepository } from "./repos/user-details.repository";
import { UserViewRepository } from "./repos/user-view.repository";

// ========================== Services & Controllers ====================
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { RoleService } from "../roles/role.service";

// ========================== Modules ===================================
import { SecurityModule } from "../security/security.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            RoleEntity,
            UserDetailsEntity,
            UserViewEntity,
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
