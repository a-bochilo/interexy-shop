import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// ========================== Security ==========================
import { SecurityModule } from "../../app/security/security.module";

// ========================== Controllers & Services ==========================
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

// ========================== Entities ==========================
import { ProductEntity } from "./entities/product.entity";
import { ProductActiveViewEntity } from "./entities/product-active-view.entity";
import { ProductDetailsEntity } from "./entities/product-details.entity";

// ========================== Repos ==========================
import { ProductsRepository } from "./repos/products.repository";
import { ProductsActiveViewRepository } from "./repos/products-active-view.repository";
import { ProductsDetailsRepository } from "./repos/product-details.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductEntity,
            ProductActiveViewEntity,
            ProductDetailsEntity,
        ]),
        SecurityModule,
    ],
    controllers: [ProductsController],
    providers: [
        ProductsService,
        ProductsRepository,
        ProductsActiveViewRepository,
        ProductsDetailsRepository,
    ],
    exports: [],
})
export class ProductsModule {}
