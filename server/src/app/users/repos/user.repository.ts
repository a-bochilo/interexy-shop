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

    async getFullUser(userId: 'uuid') {
        return await this.find({
            relations: ["details"]
        });
    }

    async getAll() {
        return await this.find();
    }

    async getById(userId: 'uuid') {
        return await this.findOne({
            where: {
                id: userId
            },
        },)
    }

    async getDetailsId(userId: 'uuid') {
        const user =  await this.findOne({
            where: {
                id: userId
            },
            relations: ["details"]
        },)
        return user.details.id
    }

    async updateUser(user: UserEntity) {
        const newUser = new UserEntity();
        Object.assign(newUser, user)
        return await this.save(newUser);
    }

    async deleteUser(userId: 'uuid') {
       const user = await this.findOneBy({ id: userId });
        return await this.save({
            ...user,
            isActive: false
        })
    }
}
