import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class $npmConfigName1678357923542 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.createTable(getUserRolesTable(), false);
    await queryRunner.createTable(getUserDetails(), false);
    await queryRunner.createTable(getUsersTable(), false);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

const getUserDetails = () => {
  return new Table({
    name: "user_details",
    indices: [
      {
        name: "IX_user_details_reference_id",
        columnNames: ["id"],
        isUnique: true,
      },
    ],
    columns: [
      {
        name: "id",
        type: "uuid",
        isNullable: false,
        isGenerated: true,
        isPrimary: true,
        generationStrategy: "uuid",
      },
      {
        name: "created",
        type: "timestamptz",
        isNullable: false,
      },
      {
        name: "updated",
        type: "timestamptz",
        isNullable: false,
      },
      {
        name: "firstname",
        type: "varchar",
        length: "50",
        isNullable: false,
      },
      {
        name: "lastname",
        type: "varchar",
        length: "50",
        isNullable: false,
      },
      {
        name: "middlename",
        type: "varchar",
        length: "50",
        isNullable: false,
      },
    ],
  });
};

const getUserRolesTable = () => {
  return new Table({
    name: "user_roles",
    indices: [
      {
        name: "IX_user_roles_reference_id",
        columnNames: ["id", "type"],
        isUnique: true,
      },
      {
        name: "IX_user_roles_role_name",
        columnNames: ["name"],
        isUnique: true,
      },
    ],
    columns: [
      {
        name: "id",
        type: "int",
        isNullable: false,
        isGenerated: true,
        isPrimary: true,
        generationStrategy: "increment",
      },
      {
        name: "created",
        type: "timestamptz",
        isNullable: false,
      },
      {
        name: "updated",
        type: "timestamptz",
        isNullable: false,
      },
      {
        name: "type",
        type: "varchar",
        length: "50",
        isNullable: false,
      },
      {
        name: "name",
        type: "varchar",
        length: "50",
        isNullable: false,
      },
      {
        name: "permissions",
        type: "text[]",
        isNullable: false,
      },
    ],
  });
};

const getUsersTable = () => {
  return new Table({
    name: "users",
    indices: [
      {
        name: "IX_users_role",
        columnNames: ["role_type"],
        isUnique: false,
      },
      {
        name: "IX_users_email",
        columnNames: ["email"],
      },
      {
        name: "IX_users_phone",
        columnNames: ["phone"],
      },
    ],
    foreignKeys: [
      {
        name: "FK_users_user_roles_role",
        columnNames: ["role_id", "role_type"],
        referencedTableName: "user_roles",
        referencedColumnNames: ["id", "type"],
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      {
        name: "FK_user_details",
        columnNames: ["details_id"],
        referencedTableName: "user_details",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
    ],
    columns: [
      // common
      {
        name: "id",
        type: "uuid",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "uuid",
      },
      {
        name: "created",
        type: "timestamptz",
        isNullable: false,
      },
      {
        name: "updated",
        type: "timestamptz",
        isNullable: false,
      },
      {
        name: "is_active",
        type: "bool",
      },
      // user data
      {
        name: "email",
        type: "varchar",
        isNullable: true,
      },
      {
        name: "phone",
        type: "varchar",
        isNullable: true,
      },
      {
        name: "password",
        type: "varchar",
        isNullable: true,
      },
      // ======== role =============
      {
        name: "role_id",
        type: "int",
        isNullable: false,
      },
      {
        name: "role_type",
        type: "varchar",
        isNullable: false,
      },
      // ======== details =============
      {
        name: "details_id",
        type: "uuid",
        isNullable: false,
      },
    ],
  });
};
