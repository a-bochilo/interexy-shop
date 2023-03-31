import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class $npmConfigName1678456993069 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("product_details", getTableColumn());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

const getTableColumn = () => {
  return new TableColumn({
    name: "description",
    type: "varchar",
    isNullable: false,
  });
};
