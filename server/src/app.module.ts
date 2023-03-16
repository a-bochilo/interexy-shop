import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import databaseConfig from "./config/database.config";

// ========================== Modules =====================================
import { ProductsModule } from "./app/products/products.module";
import { SecurityModule } from "./app/security/security.module";
import { UserModule } from "./app/users/user.module";
import { RoleModule } from "./app/roles/role.module";
import { CartModule } from "./app/cart/cart.module";
import { ScheduleModule } from "@nestjs/schedule";
import { TasksModule } from "./app/tasks/tasks.module";
import { OrderModule } from "./app/orders/order.module";
import { AuthModule } from "./app/auth/auth.module";


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".development.env",
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(databaseConfig),
        ScheduleModule.forRoot(),
        TasksModule,
        ProductsModule,
        RoleModule,
        UserModule,
        SecurityModule,
        ProductsModule,
        CartModule,
        OrderModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

