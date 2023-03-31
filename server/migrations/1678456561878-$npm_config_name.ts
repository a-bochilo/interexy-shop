import { TableIndex, MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1678456561878 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex("products", getIndices());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

const getIndices = () => {
  return new TableIndex({
    name: "IX_category",
    columnNames: ["category"],
  });
};
