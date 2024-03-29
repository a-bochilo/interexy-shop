// ========================== nest ======================================
import { Injectable } from "@nestjs/common";

// ========================== typeorm ===================================
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// ========================== entities & dto's ==========================
import { OrderEntity } from "../entities/order.entity";
import { UserEntity } from "src/app/users/entities/user.entity";

@Injectable()
export class OrderRepository extends Repository<OrderEntity> {
  constructor(
    @InjectRepository(OrderEntity) OrderRepository: Repository<OrderEntity>
  ) {
    super(
      OrderRepository.target,
      OrderRepository.manager,
      OrderRepository.queryRunner
    );
  }

  async getOneById(orderId: string) {
    return await this.findOneBy({ id: orderId });
  }

  async createOrder(user: UserEntity): Promise<OrderEntity> {
    const newOrder = new OrderEntity();
    newOrder.created = new Date();
    newOrder.updated = new Date();
    newOrder.total = 0;
    newOrder.user = user;
    newOrder.items = [];
    return await this.save(newOrder);
  }

  async saveOrder(order: OrderEntity) {
    return await this.save(order);
  }

  async getAllOrders() {
    return await this.find();
  }

  async getOrdersByUserId(id: string) {
    return await this.find({
      where: {
        user_id: id,
      },
    });
  }
}
