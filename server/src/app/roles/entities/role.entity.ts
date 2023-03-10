import { Column, Entity, OneToMany, } from "typeorm";

// ========================== Entities ==========================
import { IDEntity } from "../../../shared/entities/id.entity";

// ========================== Enums ==========================
import { UserRoles } from "../../../shared/types/user-roles.enum";
import { UserPermissions } from "../../../shared/types/user-permissions.enum";
import { UserEntity } from "../../users/entities/user.entity";

@Entity({ name: "user_roles" })
export class RoleEntity extends IDEntity {

    @Column({ name: "type", enum: UserRoles })
    type: UserRoles;

    @Column({ name: "name" })
    name: string;

    @Column("text", { name: "permissions", array: true })
    permissions: UserPermissions[];

    @OneToMany(() => UserEntity, (user) => user.id)
    users: UserEntity[];
}
