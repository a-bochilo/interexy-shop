import 'dotenv/config'
import { DataSourceOptions } from "typeorm";

const databaseConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [],
    migrations: [],
    migrationsTableName: "migrations_history",
    migrationsRun: false,
}

export default databaseConfig;