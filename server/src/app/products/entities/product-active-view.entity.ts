import { ViewEntity } from "typeorm";

// ========================== entities ==========================
import { ProductEntity } from "./product.entity";

@ViewEntity({
  name: "products_active_view",
  expression: `
            SELECT *
            FROM products
            WHERE is_active=true
        `,
})
export class ProductActiveViewEntity extends ProductEntity {}
