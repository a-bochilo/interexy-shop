import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { ConfigModule, ConfigService } from "@nestjs/config";
import databaseConfig from "./config/database.config";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
          useFactory: async (): Promise<TypeOrmModuleOptions> => {
            return databaseConfig;
          },
          inject: [ConfigService],
        }),
      ],
    controllers: [],
    providers: [],
})
export class AppModule {}
