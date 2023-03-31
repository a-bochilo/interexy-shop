import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class $npmConfigName1678456092937 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("products", getProductsColumn());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

const getProductsColumn = () =>
  new TableColumn({
    name: "brand",
    type: "varchar",
    isNullable: false,
  });
