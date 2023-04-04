import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";

// ========================== entities ==========================
import { CartItemEntity } from "../entities/cart-item.entity";

@Injectable()
export class CartItemRepository {
  constructor(
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>
  ) {}

  async saveCartItem(cartItem: CartItemEntity): Promise<CartItemEntity> {
    cartItem.updated = new Date();

    return;
  }

  async createCartItem(
    cartItem: DeepPartial<CartItemEntity>
  ): Promise<CartItemEntity> {
    const item = this.cartItemRepository.create({
      ...cartItem,
      updated: new Date(),
    });

    return await this.cartItemRepository.save(item);
  }

  async deleteCartItem(id: string) {
    return await this.cartItemRepository.delete(id);
  }

  async deleteCartItems(ids: string[]) {
    return await this.cartItemRepository.delete(ids);
  }
}
