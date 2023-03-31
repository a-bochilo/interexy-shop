import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1678373196143 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE VIEW active_product_view
            AS
            SELECT *
            FROM products
            WHERE is_active=true
        `);
    await queryRunner.query(`
            CREATE VIEW active_user_view
            AS
            SELECT *
            FROM users
            WHERE is_active=true
        `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
