import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// ========================== Entities & DTO's ==========================
import { UserDetailsEntity } from "../entities/user-details.entity";
import { UserDetailsDto } from "../dtos/user-details.dto";

@Injectable()
export class UserDetailsRepository extends Repository<UserDetailsEntity> {
    constructor(
        @InjectRepository(UserDetailsEntity) userDetailsRepository: Repository<UserDetailsEntity>,
    ) {
        super(userDetailsRepository.target, userDetailsRepository.manager, userDetailsRepository.queryRunner);
    }

    

    async createUserDetails(
        userDetails: UserDetailsDto
    ): Promise<UserDetailsEntity> {
        const newUserDetails = new UserDetailsEntity();
        Object.assign(newUserDetails, userDetails);

        return await this.save(newUserDetails);
    }
}
