import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/app/users/entities/user.entity";
import { UUIDEntity } from "src/shared/entities/uuid.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: "order" })
export class OrderEntity extends UUIDEntity {

    @ApiProperty({ example: '123', description: 'Total sum', required: true, default: 0})
    @Column({ name: "total"})
    total: number;

    @Column({ name: "user_id"})
    user_id: string;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: "user_id" })
    user: UserEntity[];
}