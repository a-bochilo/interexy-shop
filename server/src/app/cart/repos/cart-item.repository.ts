import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

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

    return await this.cartItemRepository.save(cartItem);
  }

  async deleteCartItem(id: string) {
    return await this.cartItemRepository.delete(id);
  }

  async deleteCartItems(ids: string[]) {
    return await this.cartItemRepository.delete(ids);
  }
}
