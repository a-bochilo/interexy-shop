import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1678980320744 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("order", "order_item_id");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
