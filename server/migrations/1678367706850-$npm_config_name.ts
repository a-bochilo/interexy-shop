import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class $npmConfigName1678367706850 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("cart_item", getProductsColumnFromCartItem());
    await queryRunner.createTable(getProductsTable(), false);
    await queryRunner.createTable(getProductsDetailsTable(), false);
    await queryRunner.createForeignKey(
      "cart_item",
      getProductsFKFromCartItem()
    );
    await queryRunner.createForeignKey(
      "products",
      getProductsDetailsFKFromProducts()
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
const getProductsColumnFromCartItem = () =>
  new TableColumn({
    name: "product_id",
    type: "uuid",
  });

const getProductsFKFromCartItem = () =>
  new TableForeignKey({
    name: "FK_products_cart_item",
    columnNames: ["product_id"],
    referencedTableName: "products",
    referencedColumnNames: ["id"],
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  });

const getProductsDetailsFKFromProducts = () =>
  new TableForeignKey({
    name: "FK_products_products_details",
    columnNames: ["product_details_id"],
    referencedTableName: "product_details",
    referencedColumnNames: ["id"],
    onDelete: "CASCADE",
  });

const getProductsTable = () =>
  new Table({
    name: "products",
    columns: [
      {
        name: "id",
        type: "uuid",
        isNullable: false,
        isGenerated: true,
        isPrimary: true,
        generationStrategy: "uuid",
      },
      {
        name: "created",
        type: "timestamptz",
        isNullable: false,
      },
      {
        name: "updated",
        type: "timestamptz",
        isNullable: false,
      },
      {
        name: "category",
        type: "varchar",
        length: "50",
        isNullable: false,
      },
      {
        name: "name",
        type: "varchar",
        length: "50",
        isNullable: false,
      },
      {
        name: "price",
        type: "float",
        isNullable: false,
      },
      {
        name: "image",
        type: "varchar",
        isNullable: false,
      },
      {
        name: "is_active",
        type: "bool",
      },
      {
        name: "product_details_id",
        type: "uuid",
      },
    ],
  });

const getProductsDetailsTable = () =>
  new Table({
    name: "product_details",
    columns: [
      {
        name: "id",
        type: "uuid",
        isNullable: false,
        isGenerated: true,
        isPrimary: true,
        generationStrategy: "uuid",
      },
      {
        name: "created",
        type: "timestamptz",
        isNullable: false,
      },
      {
        name: "updated",
        type: "timestamptz",
        isNullable: false,
      },
      {
        name: "color",
        type: "varchar",
        length: "50",
        isNullable: false,
      },
      {
        name: "material",
        type: "varchar",
        length: "50",
        isNullable: false,
      },
      {
        name: "size",
        type: "varchar",
        length: "50",
        isNullable: false,
      },
    ],
  });
