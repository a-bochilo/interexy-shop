import { Column, Entity, JoinColumn, ManyToOne, OneToOne, ViewColumn, ViewEntity, } from "typeorm";

// ========================== Entities ==========================
//import { RoleEntity } from "../../roles/entities/user-role.entity";
import { UUIDEntity } from "../../../shared/entities/uuid.entity";

// ========================== Enums ==========================
import { UserRoles } from "../../../shared/types/user-roles.enum";
import { UserDetailsEntity } from "./user-details.entity";
import { RoleEntity } from "../../roles/entities/role.entity";

@ViewEntity({ name: "active_user_view" })
export class UserViewEntity extends UUIDEntity {

    @ViewColumn({ name: "is_active"})
    isActive!: boolean;

    @ViewColumn({ name: "email" })
    email!: string;

    @ViewColumn({ name: "phone" })
    phone?: string;

    @ViewColumn({ name: "password"})
    password!: string;

    @ViewColumn({ name: "role_id" })
    roleId!: number;

    @ViewColumn({ name: "role_type" })
    roleType!: UserRoles;

    @OneToOne(() => UserDetailsEntity)
    @JoinColumn({name: "details"})
    details: UserDetailsEntity;

    @ManyToOne(() => RoleEntity, (role) => role.users)
    @JoinColumn({name: "role_id"})
    role: RoleEntity;

}
