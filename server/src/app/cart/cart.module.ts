import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// ========================== Security ==========================
import { SecurityModule } from "src/app/security/security.module";

// ========================== Controllers & Services ==========================
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";

// ========================== Entities ==========================
import { CartItemEntity } from "./entities/cart-item.entity";
import { CartEntity } from "./entities/cart.entity";

// ========================== Repos ==========================
import { CartRepository } from "./repos/cart.repository";
import { CartItemRepository } from "./repos/cart-item.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([CartEntity, CartItemEntity]),
        SecurityModule,
    ],
    controllers: [CartController],
    providers: [CartService, CartRepository, CartItemRepository],
    exports: [],
})
export class CartModule {}
