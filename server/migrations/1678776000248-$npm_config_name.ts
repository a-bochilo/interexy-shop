import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class $npmConfigName1678776000248 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "carts",
      "cart_item_ids",
      getCartColumnFromUsers()
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

const getCartColumnFromUsers = () => {
  return new TableColumn({
    name: "cart_item_ids",
    type: "uuid",
    isNullable: true,
  });
};
