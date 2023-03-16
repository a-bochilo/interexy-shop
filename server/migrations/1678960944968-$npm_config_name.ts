import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class $npmConfigName1678960944968 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("order_items", getOrderColumnFromOrderItems());
    await queryRunner.createForeignKey(
      "order_items",
      getOrderFKFromOrderItems()
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

const getOrderColumnFromOrderItems = () => {
  return new TableColumn({
    name: "order_id",
    type: "uuid",
  });
};

const getOrderFKFromOrderItems = () => {
  return new TableForeignKey({
    name: "FK_order_items_order",
    columnNames: ["order_id"],
    referencedTableName: "order",
    referencedColumnNames: ["id"],
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};
