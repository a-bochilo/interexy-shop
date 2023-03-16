import "dotenv/config";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

// ========================== Entities ==========================
import { UserEntity } from "../app/users/entities/user.entity";
import { UserViewEntity } from "../app/users/entities/user-view.entity";
import { RoleEntity } from "../app/roles/entities/role.entity";
import { ProductEntity } from "../app/products/entities/product.entity";
import { ProductDetailsEntity } from "../app/products/entities/product-details.entity";
import { ProductActiveViewEntity } from "../app/products/entities/product-active-view.entity";
import { UserDetailsEntity } from "../app/users/entities/user-details.entity";
import { OrderEntity } from "../app/orders/entities/order.entity";
import { OrderItemEntity } from "../app/orders/entities/order-item.entity";

// ========================== Migrations ==========================
import { $npmConfigName1678357923542 } from "../../migrations/1678357923542-$npm_config_name";
import { $npmConfigName1678362416266 } from "../../migrations/1678362416266-$npm_config_name";
import { $npmConfigName1678370951605 } from "../../migrations/1678370951605-$npm_config_name";
import { $npmConfigName1678367706850 } from "../../migrations/1678367706850-$npm_config_name";
import { $npmConfigName1678373196143 } from "../../migrations/1678373196143-$npm_config_name";
import { $npmConfigName1678450911295 } from "../../migrations/1678450911295-$npm_config_name";
import { $npmConfigName1678456092937 } from "../../migrations/1678456092937-$npm_config_name";
import { $npmConfigName1678456561878 } from "../../migrations/1678456561878-$npm_config_name";
import { $npmConfigName1678456993069 } from "../../migrations/1678456993069-$npm_config_name";
import { $npmConfigName1678544710047 } from "../../migrations/1678544710047-$npm_config_name";
import { $npmConfigName1678780011243 } from "../../migrations/1678780011243-$npm_config_name";
import { $npmConfigName1678960944968 } from "../../migrations/1678960944968-$npm_config_name";



const databaseConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [
        UserEntity,
        UserDetailsEntity,
        UserViewEntity,
        RoleEntity,
        ProductEntity,
        ProductActiveViewEntity,
        ProductDetailsEntity,
        OrderEntity,
        OrderItemEntity,
    ],
    synchronize: false,
    migrations: [
        $npmConfigName1678357923542,
        //$npmConfigName1678362416266,
        $npmConfigName1678370951605,
        $npmConfigName1678367706850,
        $npmConfigName1678373196143,
        $npmConfigName1678450911295,
        $npmConfigName1678456092937,
        $npmConfigName1678456561878,
        $npmConfigName1678456993069,
        $npmConfigName1678544710047,
        $npmConfigName1678780011243,
        $npmConfigName1678960944968, 
    ],
};

export default databaseConfig;