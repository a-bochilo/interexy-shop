import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1678781909510 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("carts", "cart_item_ids");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
