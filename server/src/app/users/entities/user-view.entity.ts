import {
    JoinColumn,
    ManyToOne,
    OneToOne,
    ViewColumn,
    ViewEntity,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

// ========================== Entities ==========================
import { UUIDEntity } from "../../../shared/entities/uuid.entity";
import { UserDetailsEntity } from "./user-details.entity";
import { RoleEntity } from "../../roles/entities/role.entity";

// ========================== Enums ==========================
import { UserRoles } from "../../../shared/types/user-roles.enum";

@ViewEntity({ name: "active_user_view" })

export class UserViewEntity extends UUIDEntity {

    @ApiProperty({ example: true, description: "User status" })
    @ViewColumn({ name: "is_active" })
    isActive!: boolean;

    @ApiProperty({
        example: "test@test.com",
        description: "Email",
        required: true,
    })
    @ViewColumn({ name: "email" })
    email!: string;

    @ApiProperty({
        example: "+375 (29) 111 11 11",
        description: "Phone",
        required: false,
    })
    @ViewColumn({ name: "phone" })
    phone?: string;

    @ApiProperty({
        example: "qwerty123",
        description: "Password",
        required: true,
    })
    @ViewColumn({ name: "password" })
    password!: string;

    @ApiProperty({ example: "1", description: "Role id", required: true })
    @ViewColumn({ name: "role_id" })
    roleId: number;

    @ApiProperty({ example: "user", description: "Role type", required: true })
    @ViewColumn({ name: "role_type" })
    roleType: UserRoles;

    @ApiProperty({
        example: "1qwe-21-3",
        description: "Details id",
        required: true,
    })
    @ViewColumn({ name: "details_id" })
    details_id: string;

    @ManyToOne(() => RoleEntity, (role) => role.users)
    @JoinColumn({ name: "role_id" })
    role: RoleEntity;

    // @OneToOne(() => UserDetailsEntity)
    // @JoinColumn({ name: "details_id" })
    // details: UserDetailsEntity;

    // @OneToMany(() => OrderEntity, (order) => order.user)
    // @JoinColumn({ name: "order_id" })
    // order: OrderEntity[];
}
