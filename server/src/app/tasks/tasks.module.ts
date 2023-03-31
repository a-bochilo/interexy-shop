import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// ========================== entities ==========================
import { CartItemEntity } from "../cart/entities/cart-item.entity";
import { CartEntity } from "../cart/entities/cart.entity";

// ========================== repositories ==========================
import { CartItemRepository } from "../cart/repos/cart-item.repository";
import { CartRepository } from "../cart/repos/cart.repository";

// ========================== services ==========================
import { TasksService } from "./tasks.service";

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, CartItemEntity])],
  providers: [TasksService, CartRepository, CartItemRepository],
})
export class TasksModule {}
