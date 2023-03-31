import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// ========================== security ==========================
import { SecurityModule } from "../../app/security/security.module";

// ========================== controllers & services ==========================
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

// ========================== entities ==========================
import { ProductEntity } from "./entities/product.entity";
import { ProductActiveViewEntity } from "./entities/product-active-view.entity";
import { ProductDetailsEntity } from "./entities/product-details.entity";

// ========================== repos ==========================
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
