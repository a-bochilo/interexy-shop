import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

// ========================== Entities ==========================
import { RoleEntity } from "../../roles/entities/user-role.entity";
import { UUIDEntity } from "../../shared/entities/uuid.entity";

// ========================== Enums ==========================
import { UserRoles } from "../../shared/types/user-roles.enum";
import { UserStatuses } from "../enums/user-statuses.enum";

@Entity({ name: "users" })
export class UserEntity extends UUIDEntity {
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

    @Column({ name: "role_type", enum: UserStatuses })
    status!: UserStatuses;

    @ManyToOne(() => RoleEntity)
    @JoinColumn({ name: "role_id", referencedColumnName: "id" })
    userRole?: RoleEntity;
}
