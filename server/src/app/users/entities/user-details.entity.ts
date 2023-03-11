import { UUIDEntity } from "../../../shared/entities/uuid.entity";
import { Column, Entity } from "typeorm";


@Entity({ name: "user_details" })
export class UserDetailsEntity extends UUIDEntity {

    @Column({ name: "firstname" })
    firstname!: string;

    @Column({ name: "lastname" })
    lastname!: string;

    @Column({ name: "middlename" })
    middlename?: string;
    
}