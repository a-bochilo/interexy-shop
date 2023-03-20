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
import { UserRepository } from "../users/repos/user.repository";
import { OrderRepository } from "./repos/order.repository";
import { ProductsRepository } from "../products/repos/products.repository";

// ========================== Services & Controllers ====================
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";

// ========================== Modules ===================================
import { SecurityModule } from "../security/security.module";
import { OrderItemRepository } from "./repos/order-item.repository";


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
        UserRepository,
        ProductsRepository,
        OrderRepository,
        OrderItemRepository,
        OrderService,
    ],
    exports: [OrderService],
})
export class OrderModule {}