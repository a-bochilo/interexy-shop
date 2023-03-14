import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "../roles/entities/role.entity";
import { RoleRepository } from "../roles/repos/role.repository";
import { RoleService } from "../roles/role.service";
import { SecurityModule } from "../security/security.module";
import { UserDetailsEntity } from "../users/entities/user-details.entity";
import { UserViewEntity } from "../users/entities/user-view.entity";
import { UserEntity } from "../users/entities/user.entity";
import { UserDetailsRepository } from "../users/repos/user-details.repository";
import { UserViewRepository } from "../users/repos/user-view.repository";
import { UserRepository } from "../users/repos/user.repository";
import { UserController } from "../users/user.controller";
import { UserService } from "../users/user.service";
import { OrderEntity } from "./entities/order.entity";
import { OrderRepository } from "./repos/order.repository";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            UserDetailsEntity,
            UserViewEntity,

            RoleEntity, 
           
            OrderEntity,
        ]),
        SecurityModule,
    ],
    controllers: [OrderController],
    providers: [
        UserService,
        UserRepository,
        UserDetailsRepository,
        UserViewRepository,

        RoleService,
        RoleRepository,

        OrderService,
        OrderRepository,
    ],
    exports: [OrderService],
})
export class OrderModule {}