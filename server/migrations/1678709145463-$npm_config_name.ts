import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1678709145463 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("cart", "carts");
    await queryRunner.renameTable("cart_item", "cart_items");
    await queryRunner.renameColumn("carts", "cart_item_id", "cart_item_ids");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
