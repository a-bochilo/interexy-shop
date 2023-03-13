import { Column, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class UUIDEntity {
    @PrimaryColumn({ name: "id", type: "uuid" })
    id!: 'uuid';

    @UpdateDateColumn({
        name: "created",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
    })
    created!: Date;

    @Column({
        name: "updated",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)",
    })
    updated!: Date;
}
