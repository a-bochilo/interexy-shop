// ========================== nest ==========================
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// ========================== order ==========================
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

// ========================== entities ==========================
import { OrderEntity } from "./entities/order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],

  providers: [OrderService],
  exports: [OrderController],
  controllers: [OrderController],
})
export class OrderModule {}
