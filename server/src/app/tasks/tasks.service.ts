import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

// ========================== Repositories ==========================
import { CartRepository } from "../cart/repos/cart.repository";

@Injectable()
export class TasksService {
    constructor(private readonly cartRepository: CartRepository) {}

    @Cron(CronExpression.EVERY_5_MINUTES)
    async logAbandonedCart() {
        const minutes = 5;
        const carts = await this.cartRepository.getAbandonedCarts(minutes);
        const usersIds = carts.map((cart) => cart.userId);
        if (usersIds.length) {
            console.log(
                `User(s) '${usersIds}' abandoned carts for more then ${minutes} minutes`
            );
        }
    }
}
