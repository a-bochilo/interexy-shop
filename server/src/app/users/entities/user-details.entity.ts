import { UUIDEntity } from "src/shared/entities/uuid.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";


@Entity({ name: "user-details" })
export class UserDetailsEntity extends UUIDEntity {

    @Column({ name: "firstname" })
    firstname!: boolean;

    @Column({ name: "secondname" })
    secondname!: string;

    @Column({ name: "middlename" })
    middlename?: string;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user?: UserEntity;

}