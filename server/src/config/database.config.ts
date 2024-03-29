import "dotenv/config";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

// ========================== entities ==========================
import { UserEntity } from "../app/users/entities/user.entity";
import { UserViewEntity } from "../app/users/entities/user-view.entity";
import { RoleEntity } from "../app/roles/entities/role.entity";
import { ProductEntity } from "../app/products/entities/product.entity";
import { ProductDetailsEntity } from "../app/products/entities/product-details.entity";
import { ProductActiveViewEntity } from "../app/products/entities/product-active-view.entity";
import { CartEntity } from "../app/cart/entities/cart.entity";
import { CartItemEntity } from "../app/cart/entities/cart-item.entity";
import { UserDetailsEntity } from "../app/users/entities/user-details.entity";
import { OrderEntity } from "../app/orders/entities/order.entity";
import { OrderItemEntity } from "../app/orders/entities/order-item.entity";

// ========================== migrations ==========================
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
import { $npmConfigName1678980320744 } from "../../migrations/1678980320744-$npm_config_name";
import { $npmConfigName1679035791091 } from "../../migrations/1679035791091-$npm_config_name";
import { $npmConfigName1679041536118 } from "../../migrations/1679041536118-$npm_config_name";
import { $npmConfigName1679044066865 } from "../../migrations/1679044066865-$npm_config_name";
import { $npmConfigName1678709145463 } from "../../migrations/1678709145463-$npm_config_name";
import { $npmConfigName1678772644221 } from "../../migrations/1678772644221-$npm_config_name";
import { $npmConfigName1678776000248 } from "../../migrations/1678776000248-$npm_config_name";
import { $npmConfigName1678781909510 } from "../../migrations/1678781909510-$npm_config_name";
import { $npmConfigName1678963447150 } from "../../migrations/1678963447150-$npm_config_name";

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
    UserDetailsEntity,
    UserViewEntity,
    RoleEntity,
    ProductEntity,
    ProductDetailsEntity,
    ProductActiveViewEntity,
    ProductDetailsEntity,
    OrderEntity,
    OrderItemEntity,
    CartEntity,
    CartItemEntity,
  ],
  synchronize: false,
  migrations: [
    $npmConfigName1678357923542,
    $npmConfigName1678362416266,

    $npmConfigName1678370951605,
    $npmConfigName1678367706850,

    $npmConfigName1678373196143,
    $npmConfigName1678450911295,

    $npmConfigName1678456092937,
    $npmConfigName1678456561878,

    $npmConfigName1678456993069,
    $npmConfigName1678544710047,
    $npmConfigName1678709145463,

    $npmConfigName1678772644221,
    $npmConfigName1678776000248,

    $npmConfigName1678780011243,
    $npmConfigName1678781909510,

    $npmConfigName1678960944968,
    $npmConfigName1678963447150,

    $npmConfigName1678980320744,
    $npmConfigName1679035791091,

    $npmConfigName1679041536118,
    $npmConfigName1679044066865,
  ],
};

export default databaseConfig;
