import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

// ========================== Entities ==========================
import { UserEntity } from "../../users/entities/user.entity";
import { UUIDEntity } from "../../../shared/entities/uuid.entity";
import { OrderItemEntity } from "./order-item.entity";

@Entity({ name: "order" })
export class OrderEntity extends UUIDEntity {

    @ApiProperty({ example: '123', description: 'Total sum', required: true, default: 0})
    @Column({ name: "total"})
    total: number;

    @Column({ name: "user_id", default: null})
    user_id: string;

    @ManyToOne(() => UserEntity, (user) => user.order)
    @JoinColumn({ name: "user_id" })
    user?: UserEntity;

    @OneToMany(() => OrderItemEntity, (item) => item.order)
    items: OrderItemEntity[];
}