import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// ========================== Entities & DTO's ==========================
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async getUserWithRoleById(id: string): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: { id },
            relations: ["userRole"],
        });
    }
}
