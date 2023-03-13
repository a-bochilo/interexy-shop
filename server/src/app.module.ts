import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./app/auth/auth.module";
import { AuthController } from "./app/auth/auth.controller";
import { AuthService } from "./app/auth/auth.service";
import { OrderService } from "./app/order/order.service";
import { OrderModule } from "./app/order/order.module";
import { OrderController } from "./app/order/order.controller";

import data_config from "./config/data-source";
import databaseConfig from "./config/database.config";
import { ProductsModule } from "./app/products/products.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".development.env",
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(databaseConfig),
        ProductsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
