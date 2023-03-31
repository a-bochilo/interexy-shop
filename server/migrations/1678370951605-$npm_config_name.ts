import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class $npmConfigName1678370951605 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(getOrderItemsTable(), false);
    await queryRunner.createTable(getOrderTable(), false);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
const getOrderTable = () =>
  new Table({
    name: "order",
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
        name: "product_name",
        type: "varchar",
        length: "50",
        isNullable: false,
      },
      {
        name: "total",
        type: "float",
        isNullable: false,
      },
      {
        name: "quantities",
        type: "int",
        isNullable: false,
      },
      {
        name: "order_item_id",
        type: "uuid",
      },
    ],
    foreignKeys: [
      {
        name: "FK_users_details",
        columnNames: ["order_item_id"],
        referencedTableName: "order_items",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    ],
  });

const getOrderItemsTable = () =>
  new Table({
    name: "order_items",
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
        name: "product_name",
        type: "varchar",
        length: "50",
        isNullable: false,
      },
      {
        name: "product_price",
        type: "float",
        isNullable: false,
      },
      {
        name: "product_quantity",
        type: "int",
        isNullable: false,
      },
      {
        name: "product_id",
        type: "uuid",
        isNullable: false,
      },
    ],
    foreignKeys: [
      {
        name: "FK_order_items_products",
        columnNames: ["product_id"],
        referencedTableName: "products",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    ],
  });
