// ========================== nest ======================================
import { Module } from "@nestjs/common";

// ========================== typeorm ===================================
import { TypeOrmModule } from "@nestjs/typeorm";

// ========================== entities ==================================
import { RoleEntity } from "../roles/entities/role.entity";
import { UserDetailsEntity } from "./entities/user-details.entity";
import { UserEntity } from "./entities/user.entity";
import { UserViewEntity } from "./entities/user-view.entity";

// ========================== repositories ==============================
import { UserRepository } from "./repos/user.repository";
import { RoleRepository } from "../roles/repos/role.repository";
import { UserDetailsRepository } from "./repos/user-details.repository";
import { UserViewRepository } from "./repos/user-view.repository";

// ========================== services & controllers ====================
import { UsersController } from "./user.controller";
import { UsersService } from "./user.service";

// ========================== modules ===================================
import { SecurityModule } from "../security/security.module";
import { OrderEntity } from "../orders/entities/order.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            RoleEntity,
            UserDetailsEntity,
            UserViewEntity,
            OrderEntity,
        ]),
        SecurityModule,
    ],
    controllers: [UsersController],
    providers: [
        RoleRepository,
        UsersService,
        UserRepository,
        UserDetailsRepository,
        UserViewRepository,
    ],
    exports: [UsersService],
})
export class UserModule {}
