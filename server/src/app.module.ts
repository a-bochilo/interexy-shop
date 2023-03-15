import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import databaseConfig from "./config/database.config";

// ========================== Modules =====================================
import { ProductsModule } from "./app/products/products.module";
import { SecurityModule } from "./app/security/security.module";
import { UserModule } from "./app/users/user.module";
import { RoleModule } from "./app/roles/role.module";
import { OrderModule } from "./app/orders/order.module";
import { AuthModule } from "./app/auth/auth.module";


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".development.env",
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(databaseConfig),
        ProductsModule,
        RoleModule,
        UserModule,
        SecurityModule,
        ProductsModule,
        OrderModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }



// ========================== Entities & DTO's ==========================

// ========================== Repositories ==============================

// ========================== Enums =====================================

// ========================== Services & Controllers ====================

// ========================== Modules ===================================