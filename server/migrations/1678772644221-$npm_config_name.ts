import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class $npmConfigName1678772644221 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "users",
      "cart_id",
      getCartColumnFromUsers()
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

const getCartColumnFromUsers = () => {
  return new TableColumn({
    name: "cart_id",
    type: "uuid",
    isNullable: true,
  });
};
