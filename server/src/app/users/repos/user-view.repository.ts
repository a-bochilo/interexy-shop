import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// ========================== Entities & DTO's ==========================
import { UserViewEntity } from "../entities/user-view.entity";

@Injectable()
export class UserViewRepository extends Repository<UserViewEntity> {
    constructor(
        @InjectRepository(UserViewEntity) userViewRepository: Repository<UserViewEntity>,
    ) {
        super(userViewRepository.target, userViewRepository.manager, userViewRepository.queryRunner);
    }

    async getAll() {
        return await this.find();
    }
}