import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// ========================== Security ==========================
import { SecurityModule } from "src/app/security/security.module";

// ========================== Controllers & Services ==========================
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

// ========================== Entities ==========================
import { ProudctEntity } from "./entities/product.entity";
import { ProductActiveViewEntity } from "./entities/product-active-view.entity";
import { ProudctDetailsEntity } from "./entities/product-details.entity";

// ========================== Repos ==========================
import { ProductsRepository } from "./repos/products.repository";
import { ProductsActiveViewRepository } from "./repos/products-active-view.repository";
import { ProductsDetailsRepository } from "./repos/product-details.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProudctEntity,
            ProductActiveViewEntity,
            ProudctDetailsEntity,
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
