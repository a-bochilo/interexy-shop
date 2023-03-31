// ========================== nest ======================================
import { Module } from "@nestjs/common";

// ========================== typeorm ===================================
import { TypeOrmModule } from "@nestjs/typeorm";

// ========================== entities ==================================
import { RoleEntity } from "../roles/entities/role.entity";
import { UserDetailsEntity } from "../users/entities/user-details.entity";
import { UserViewEntity } from "../users/entities/user-view.entity";
import { UserEntity } from "../users/entities/user.entity";
import { OrderEntity } from "./entities/order.entity";
import { ProductEntity } from "../products/entities/product.entity";
import { ProductActiveViewEntity } from "../products/entities/product-active-view.entity";
import { OrderItemEntity } from "./entities/order-item.entity";

// ========================== repositories ==============================
import { UserRepository } from "../users/repos/user.repository";
import { OrderRepository } from "./repos/order.repository";
import { ProductsRepository } from "../products/repos/products.repository";

// ========================== services & controllers ====================
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";

// ========================== modules ===================================
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
