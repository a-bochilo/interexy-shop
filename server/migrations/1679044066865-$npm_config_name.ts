import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1679044066865 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO user_roles (created, updated, type, name, permissions) VALUES (CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), 'user', 'user', '{"getCart", "addCartItem", "updateCartItem", "deleteCartItem", "cleanCart", "createOrder", "getProfileOrders", "getOrderItemByOrderId", "getUserProfile", "updateUserProfile", "refreshToken"}')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
