import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class $npmConfigName1678450911295 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("products", getProductsColumn());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

const getProductsColumn = () =>
  new TableColumn({
    name: "quantity",
    type: "bigint",
    isNullable: false,
  });
