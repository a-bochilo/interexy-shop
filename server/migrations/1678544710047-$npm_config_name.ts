import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1678544710047 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`DROP VIEW active_product_view`);
    await queryRunner.query(`
            CREATE VIEW products_active_view
            AS
            SELECT *
            FROM products
            WHERE is_active=true
            AND quantity>0
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
