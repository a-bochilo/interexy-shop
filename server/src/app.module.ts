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
import database_config from "./config/database.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".development.env",
      load: [data_config, database_config],
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get("database"),
      inject: [ConfigService],
    }),
    AuthModule,
    OrderModule,
  ],
  controllers: [AuthController, OrderController],
  providers: [AuthService, OrderService],
})
export class AppModule {}
