import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class $npmConfigName1679035791091 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO user_roles (created, updated, type, name, permissions) VALUES (CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), 'superadmin', 'superadmin', '{}')`
    );
    await queryRunner.query(
      `INSERT INTO user_details (id, created, updated, firstname, lastname, middlename) VALUES ('02e95ec9-1252-4072-b88e-8fb59a2d7d5a', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), 'superadmin', 'superadmin', 'superadmin')`
    );
    await queryRunner.changeColumn(
      "users",
      "cart_id",
      getCartColumnFromUsers()
    );
    //password 123123123
    await queryRunner.query(
      `INSERT INTO users (created, updated, email, phone, password, role_id, role_type, is_active, details_id) VALUES (CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), 'superadmin@gmail.com', '+375 29 000 00 00', '123123123', 1, 'superadmin', true, '02e95ec9-1252-4072-b88e-8fb59a2d7d5a')`
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
