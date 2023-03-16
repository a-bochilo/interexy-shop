import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// ========================== Security ==========================
import { SecurityModule } from "../../app/security/security.module";

// ========================== Controllers & Services ==========================
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";

// ========================== Entities ==========================
import { CartItemEntity } from "./entities/cart-item.entity";
import { CartEntity } from "./entities/cart.entity";
import { UserEntity } from "../users/entities/user.entity";
import { ProductEntity } from "../products/entities/product.entity";
import { UserViewEntity } from "../users/entities/user-view.entity";

// ========================== Repos ==========================
import { CartRepository } from "./repos/cart.repository";
import { CartItemRepository } from "./repos/cart-item.repository";
import { UserRepository } from "../users/repos/user.repository";
import { ProductsRepository } from "../products/repos/products.repository";
import { UserViewRepository } from "../users/repos/user-view.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CartEntity,
            CartItemEntity,
            UserEntity,
            UserViewEntity,
            ProductEntity,
        ]),
        SecurityModule,
    ],
    controllers: [CartController],
    providers: [
        CartService,
        CartRepository,
        CartItemRepository,
        UserRepository,
        ProductsRepository,
        UserViewRepository,
    ],
    exports: [],
})
export class CartModule {}
