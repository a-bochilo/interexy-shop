import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { ConfigModule, ConfigService } from "@nestjs/config";
import databaseConfig from "./config/database.config";
import { SecurityModule } from "./app/security/security.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            useFactory: async (): Promise<TypeOrmModuleOptions> => {
                return databaseConfig;
            },
            inject: [ConfigService],
        }),
        SecurityModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
