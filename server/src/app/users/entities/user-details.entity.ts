import { UUIDEntity } from "../../../shared/entities/uuid.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";


@Entity({ name: "user_details" })
export class UserDetailsEntity extends UUIDEntity {

    @Column({ name: "firstname" })
    firstname!: string;

    @Column({ name: "lastname" })
    lastname!: string;

    @Column({ name: "middlename" })
    middlename?: string;
    
}