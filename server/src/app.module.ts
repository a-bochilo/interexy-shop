import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { I18nModule } from "nestjs-i18n";

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
