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

// ========================== Services & Controllers ==========================
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { UserViewEntity } from "../users/entities/user-view.entity";



@Module({
    imports: [
        TypeOrmModule.forFeature([
            RoleEntity,
            UserEntity,
            UserDetailsEntity,
            UserViewEntity,
        ]),
        SecurityModule,
    ],
    controllers: [RoleController],
    providers: [
        RoleService,
        RoleRepository,
    ],
    exports: [RoleService],
})
export class RoleModule { }
