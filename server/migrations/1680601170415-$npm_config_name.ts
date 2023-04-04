import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class $npmConfigName1680601170415 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndices("order_items", getIndiciesToOrderItems());
    await queryRunner.createIndices("order", getIndiciesToOrder());
    await queryRunner.createIndices("user_roles", getIndiciesToRoles());
    await queryRunner.createIndices("users", getIndiciesToUsers());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

const getColumnIndex = (columnName: string) =>
  new TableIndex({ name: `IX_${columnName}`, columnNames: [columnName] });

const getIndiciesToOrderItems = () => {
  const columnsArray = ["order_id"];

  return columnsArray.map(getColumnIndex);
};

const getIndiciesToOrder = () => {
  const columnsArray = ["user_id"];

  return columnsArray.map(getColumnIndex);
};

const getIndiciesToRoles = () => {
  const columnsArray = ["type", "name"];

  return columnsArray.map(getColumnIndex);
};

const getIndiciesToUsers = () => {
  const columnsArray = ["email", "role_type"];

  return columnsArray.map(getColumnIndex);
};
