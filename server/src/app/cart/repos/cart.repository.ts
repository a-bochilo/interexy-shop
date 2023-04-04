import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// ========================== entities ==========================
import { CartEntity } from "../entities/cart.entity";
import { UserEntity } from "src/app/users/entities/user.entity";

@Injectable()
export class CartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>
  ) {}

  async saveCart(cart: CartEntity): Promise<CartEntity> {
    cart.updated = new Date();
    return await this.cartRepository.save(cart);
  }

  async createCart(user: UserEntity): Promise<CartEntity> {
    const newCart = this.cartRepository.create({
      created: new Date(),
      user,
      items: [],
    });

    return await this.saveCart(newCart);
  }

  async getCartByUserId(userId: string): Promise<CartEntity> {
    return await this.cartRepository.findOne({ where: { userId } });
  }

  async getCartByIdWithItems(id: string): Promise<CartEntity> {
    return await this.cartRepository.findOne({
      where: { id },
      relations: ["items"],
    });
  }

  async getAbandonedCarts(minutesInterval: number): Promise<CartEntity[]> {
    const carts = await this.cartRepository
      .createQueryBuilder("cart")
      .leftJoinAndSelect("cart.items", "items")
      // string below could be added in case some user info is needed
      // .leftJoinAndSelect("cart.user", "user")
      .where("cart.updated < :date1", {
        date1: new Date(Date.now() - minutesInterval * 60 * 1000),
      })
      .andWhere("cart.updated > :date2", {
        date2: new Date(Date.now() - minutesInterval * 2 * 60 * 1000),
      })
      .andWhere("items.id IS NOT NULL")
      .getMany();

    return carts;
  }
}
