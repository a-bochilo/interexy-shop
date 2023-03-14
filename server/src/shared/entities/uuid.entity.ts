import { Column, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class UUIDEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    id!: string;

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
