import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// ========================== Entities & DTO's ==========================
import { UserEntity } from "../entities/user.entity";
import { CreateUserDto } from "../dtos/create-user.dto";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    constructor(
        @InjectRepository(UserEntity) userRepository: Repository<UserEntity>,
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }
    
    async createUser(dto: CreateUserDto) {
        const user = new UserEntity();
        Object.assign(user, dto);
        const newUser = await this.create({
            created: new Date(),
            updated: new Date(),
            email: dto.email,
            password: dto.password,
            phone: dto.phone,
            role: dto.role,
            roleType: dto.role.type,
            details: dto.details,
            isActive: true,
        })
        return this.save(newUser);
    }

    async getAll() {
        return this.find({
            relations: ["role", "details"]
        });
    }
}
