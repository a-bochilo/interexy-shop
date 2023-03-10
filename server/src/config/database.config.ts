import "dotenv/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { $npmConfigName1678357923542 } from "../../migrations/1678357923542-$npm_config_name";
import { $npmConfigName1678362416266 } from "../../migrations/1678362416266-$npm_config_name";
import { $npmConfigName1678370951605 } from "../../migrations/1678370951605-$npm_config_name";
import { $npmConfigName1678367706850 } from "../../migrations/1678367706850-$npm_config_name";
import { $npmConfigName1678373196143 } from "../../migrations/1678373196143-$npm_config_name";

import { UserEntity } from "../app/users/entities/user.entity";
import { RoleEntity } from "../app/roles/entities/user-role.entity";

type ConfigCallback = { database: TypeOrmModuleOptions };

export default (): ConfigCallback => ({
  database: {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [UserEntity, RoleEntity],
    migrations: [
      $npmConfigName1678357923542,
      $npmConfigName1678362416266,
      $npmConfigName1678367706850,
      $npmConfigName1678370951605,
      $npmConfigName1678373196143,
    ],
    migrationsTableName: "migrations_history",
    migrationsRun: false,
  },
});
