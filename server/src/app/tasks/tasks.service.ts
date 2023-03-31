import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

// ========================== repositories ==========================
import { CartRepository } from "../cart/repos/cart.repository";

@Injectable()
export class TasksService {
  constructor(private readonly cartRepository: CartRepository) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async logAbandonedCart() {
    const minutes = 5;
    const carts = await this.cartRepository.getAbandonedCarts(minutes);

    if (!carts.length) return;

    const usersIds = carts.map((cart) => cart.userId);
    console.log(
      `User(s) '${usersIds}' abandoned cart(s) for more than ${minutes} minutes`
    );
  }
}
