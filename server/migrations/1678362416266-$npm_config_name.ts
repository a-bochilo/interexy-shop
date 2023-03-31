import {
  Column,
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class $npmConfigName1678362416266 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.createTable(getCart(), false);
    await queryRunner.addColumn("users", getCartColumnFromUsers());
    await queryRunner.createForeignKey("users", getCartFKFromUsers());
    await queryRunner.createTable(getCartItems(), false);
    await queryRunner.createForeignKey("cart", getCartItemFKFromCart());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

const getCartItemFKFromCart = () => {
  return new TableForeignKey({
    name: "FK_cart_cart_item",
    columnNames: ["cart_item_id"],
    referencedTableName: "cart_item",
    referencedColumnNames: ["id"],
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

const getCartColumnFromUsers = () => {
  return new TableColumn({
    name: "cart_id",
    type: "uuid",
  });
};

const getCartFKFromUsers = () => {
  return new TableForeignKey({
    name: "FK_user_cart_id",
    columnNames: ["cart_id"],
    referencedColumnNames: ["id"],
    referencedTableName: "cart",
    onDelete: "CASCADE",
  });
};

const getCart = () => {
  return new Table({
    name: "cart",
    columns: [
      {
        name: "id",
        type: "uuid",
        isNullable: false,
        isPrimary: true,
        isGenerated: true,
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
        name: "user_id",
        type: "uuid",
        isNullable: false,
      },
      {
        name: "cart_item_id",
        type: "uuid",
        isNullable: false,
      },
    ],
    foreignKeys: [
      {
        name: "FK_user_cart",
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      },
    ],
  });
};

const getCartItems = () => {
  return new Table({
    name: "cart_item",
    indices: [
      {
        name: "IX_cart_id",
        columnNames: ["cart_id"],
      },
    ],
    columns: [
      {
        name: "id",
        type: "uuid",
        isPrimary: true,
        isGenerated: true,
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
        name: "quantity",
        type: "bigint",
        isNullable: false,
      },
      {
        name: "cart_id",
        type: "uuid",
        isNullable: false,
      },
    ],
    foreignKeys: [
      {
        name: "FK_cartItem_cart_id",
        columnNames: ["cart_id"],
        referencedTableName: "cart",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
    ],
  });
};
