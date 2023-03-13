import { ViewEntity } from "typeorm";

// ========================== Entities ==========================
import { ProudctEntity } from "./product.entity";

@ViewEntity({
    name: "products_active_view",
    expression: `
            SELECT *
            FROM products
            WHERE is_active=true
        `,
})
export class ProductActiveViewEntity extends ProudctEntity {}