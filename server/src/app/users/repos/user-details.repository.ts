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

    async createUserDetails(userDetails: UserDetailsDto) {
        const newDetails = await this.create({
            created: new Date(),
            updated: new Date(),
            firstname: userDetails.firstname,
            lastname: userDetails.lastname,
            middlename: userDetails.middlename,
        })
        return await this.save(newDetails);
    }

    async deleteDetails(detailsId: string) {
        return await this.delete({id: detailsId})
    }

    async getDetailsById(detailsId: string) {
        return await this.findOneBy({id: detailsId})
    }

    async setDetails(details: UserDetailsDto) {
        return await this.save(details);
    }
}
