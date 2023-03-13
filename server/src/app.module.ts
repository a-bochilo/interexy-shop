import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import databaseConfig from "./config/database.config";
import { ProductsModule } from "./app/products/products.module";
import { SecurityModule } from "./app/security/security.module";
import { UserModule } from "./app/users/user.module";
import { RoleModule } from "./app/roles/role.module";

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
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
