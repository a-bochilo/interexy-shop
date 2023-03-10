import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// ========================== Security ==========================
import { SecurityModule } from "src/app/security/security.module";

// ========================== Controllers & Services ==========================
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

// ========================== Entities & Repos ==========================
import { ProductsRepository } from "./repos/products.repository";
import { ProductsDetailsRepository } from "./repos/product-details.repository";
import { ProudctEntity } from "./entities/product.entity";
import { ProudctDetailsEntity } from "./entities/product-details.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProudctEntity, ProudctDetailsEntity]),
        SecurityModule,
    ],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository, ProductsDetailsRepository],
    exports: [],
})
export class ProductsModule {}
