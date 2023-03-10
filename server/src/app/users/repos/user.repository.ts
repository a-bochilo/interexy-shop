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
        console.log(dto)
        const user = new UserEntity();
        Object.assign(user, dto);
        console.log(user)
        const newUser = await this.save(user);
        console.log(newUser);
        return newUser;
    }

    async getAll() {
        return this.find();
    }
}
