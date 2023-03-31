import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1679041536118 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "order_id");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
