import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class $npmConfigName1678780011243 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("order", ["product_name", "quantities"]);
    await queryRunner.addColumn("order", getOrderColumnFromUsers());
    await queryRunner.createForeignKey("order", getOrderFKFromUsers());

    await queryRunner.addColumn("users", getUsersColumnFromOrder());
    await queryRunner.createForeignKey("users", getUsersFKFromOrder());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

const getOrderColumnFromUsers = () => {
  return new TableColumn({
    name: "user_id",
    type: "uuid",
    isNullable: true,
  });
};

const getOrderFKFromUsers = () => {
  return new TableForeignKey({
    name: "FK_order_user",
    columnNames: ["user_id"],
    referencedTableName: "users",
    referencedColumnNames: ["id"],
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

const getUsersColumnFromOrder = () => {
  return new TableColumn({
    name: "order_id",
    type: "uuid",
    isNullable: true,
  });
};

const getUsersFKFromOrder = () => {
  return new TableForeignKey({
    name: "FK_user_order",
    columnNames: ["order_id"],
    referencedTableName: "order",
    referencedColumnNames: ["id"],
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};
