import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// ========================== Entities & DTO's ==========================
import { RoleEntity } from "../roles/entities/role.entity";
import { UserDetailsEntity } from "../users/entities/user-details.entity";
import { UserViewEntity } from "../users/entities/user-view.entity";
import { UserEntity } from "../users/entities/user.entity";
import { OrderEntity } from "./entities/order.entity";
import { ProductEntity } from "../products/entities/product.entity";
import { ProductActiveViewEntity } from "../products/entities/product-active-view.entity";
import { OrderItemEntity } from "./entities/order-item.entity";

// ========================== Repositories ==============================
import { RoleRepository } from "../roles/repos/role.repository";
import { UserDetailsRepository } from "../users/repos/user-details.repository";
import { UserViewRepository } from "../users/repos/user-view.repository";
import { UserRepository } from "../users/repos/user.repository";
import { OrderRepository } from "./repos/order.repository";
import { ProductsActiveViewRepository } from "../products/repos/products-active-view.repository";
import { ProductsRepository } from "../products/repos/products.repository";

// ========================== Services & Controllers ====================
import { RoleService } from "../roles/role.service";
import { UserService } from "../users/user.service";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { ProductsService } from "../products/products.service";

// ========================== Modules ===================================
import { SecurityModule } from "../security/security.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            UserDetailsEntity,
            UserViewEntity,

            RoleEntity, 
           
            OrderEntity,
            OrderItemEntity,

            ProductEntity,
            ProductActiveViewEntity,
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

        ProductsRepository,
    ],
    exports: [OrderService],
})
export class OrderModule {}