// ========================== nest & typeorm ============================
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// ========================== entities & dto's ==========================
import { UserViewEntity } from "../entities/user-view.entity";

@Injectable()
export class UserViewRepository extends Repository<UserViewEntity> {
  constructor(
    @InjectRepository(UserViewEntity)
    userViewRepository: Repository<UserViewEntity>
  ) {
    super(
      userViewRepository.target,
      userViewRepository.manager,
      userViewRepository.queryRunner
    );
  }

  async getAllUsers() {
    return await this.find();
  }

  async getById(userId: string) {
    return await this.findOne({
      where: {
        id: userId,
      },
    });
  }
  async getUserByEmail(email: string) {
    return await this.findOne({
      where: {
        email: email,
      },
    });
  }
}
