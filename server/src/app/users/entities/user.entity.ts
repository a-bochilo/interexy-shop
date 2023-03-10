import { Column, Entity, JoinColumn, ManyToOne, OneToOne, } from "typeorm";

// ========================== Entities ==========================
//import { RoleEntity } from "../../roles/entities/user-role.entity";
import { UUIDEntity } from "../../../shared/entities/uuid.entity";

// ========================== Enums ==========================
import { UserRoles } from "../../../shared/types/user-roles.enum";
import { UserDetailsEntity } from "./user-details.entity";
import { RoleEntity } from "../../roles/entities/role.entity";

@Entity({ name: "users" })
export class UserEntity extends UUIDEntity {

    @Column({ name: "is_active", default: true })
    isActive!: boolean;

    @Column({ name: "email" })
    email!: string;

    @Column({ name: "phone" })
    phone?: string;

    @Column({ name: "password", select: false })
    password!: string;

    @Column({ name: "role_id" })
    roleId!: number;

    @Column({ name: "role_type" })
    roleType!: UserRoles;

    @OneToOne(() => UserDetailsEntity)
    @JoinColumn({name: "details"})
    details: UserDetailsEntity;

    @ManyToOne(() => RoleEntity, (role) => role.users)
    @JoinColumn({name: "role_id"})
    role: RoleEntity;

}
