import { ApiProperty } from "@nestjs/swagger";
import { UUIDEntity } from "../../../shared/entities/uuid.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: "user_details" })
export class UserDetailsEntity extends UUIDEntity {

    @ApiProperty({ example: 'John', description: 'User firstname', required: true })
    @Column({ name: "firstname" })
    firstname!: string;

    @ApiProperty({ example: 'Smith', description: 'User lastname', required: true })
    @Column({ name: "lastname" })
    lastname!: string;

    @ApiProperty({ example: 'Fitzgerald', description: 'User middlename', required: false })
    @Column({ name: "middlename" })
    middlename?: string;
    
}

