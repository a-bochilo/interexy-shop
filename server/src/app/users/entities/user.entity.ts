import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

// ========================== Entities ==========================
import { UUIDEntity } from "../../../shared/entities/uuid.entity";
import { CartEntity } from "../../cart/entities/cart.entity";
import { UserDetailsEntity } from "./user-details.entity";
import { RoleEntity } from "../../roles/entities/role.entity";

// ========================== Enums ==========================
import { UserRoles } from "../../../shared/types/user-roles.enum";

@Entity({ name: "users" })
export class UserEntity extends UUIDEntity {
    @ApiProperty({ example: true, description: "User status" })
    @Column({ name: "is_active", default: true })
    isActive!: boolean;

    @ApiProperty({
        example: "test@test.com",
        description: "Email",
        required: true,
    })
    @Column({ name: "email" })
    email!: string;

    @ApiProperty({
        example: "+375 (29) 111 11 11",
        description: "Phone",
        required: false,
    })
    @Column({ name: "phone" })
    phone?: string;

    @ApiProperty({
        example: "qwerty123",
        description: "Password",
        required: true,
    })
    @Column({ name: "password" })
    password!: string;

    @ApiProperty({ example: "1", description: "Role id", required: true })
    @Column({ name: "role_id" })
    roleId: number;

    @ApiProperty({ example: "user", description: "Role type", required: true })
    @Column({ name: "role_type" })
    roleType: UserRoles;

    @ApiProperty({
        example: "1qwe-21-3",
        description: "Details id",
        required: true,
    })
    @Column({ name: "details_id" })
    details_id: string;

    @ApiProperty({
        example: "1qwe-21-3",
        description: "Cart id",
        required: true,
    })
    @Column({ name: "cart_id" })
    cart_id: string;

    @OneToOne(() => UserDetailsEntity)
    @JoinColumn({ name: "details_id" })
    details: UserDetailsEntity;

    @ManyToOne(() => RoleEntity, (role) => role.users)
    @JoinColumn({ name: "role_id" })
    role: RoleEntity;

    @OneToOne(() => CartEntity, (cart) => cart.user)
    @JoinColumn({ name: "cart_id", referencedColumnName: "id" })
    cart: CartEntity;
}
