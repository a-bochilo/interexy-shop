import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1678963447150 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("cart_items", "FK_products_cart_item");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
