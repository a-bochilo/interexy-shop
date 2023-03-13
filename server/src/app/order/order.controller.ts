import { OrderDto } from "./dtos/order.dto";
// ========================== nest ==========================
import { Controller, Post, Body } from "@nestjs/common";

// ========================== swagger ==========================
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

// ========================== entities ==========================
import { OrderEntity } from "./entities/order.entity";

// ========================== service ==========================
import { OrderService } from "./order.service";

// ========================== permissions ==========================
import { AuthPermissionsGuard } from "app/security/decorators/auth-permissions-guard.decorator";
import { UserPermissions } from "./../../shared/types/user-permissions.enum";

@ApiTags("Orders")
@Controller("orders")
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiOperation({ summary: "Create order" })
  @ApiResponse({ status: 200, type: [OrderEntity] })
  @AuthPermissionsGuard(UserPermissions.all)
  @Post()
  async create(@Body() order: OrderDto[]): Promise<OrderEntity> {
    return await this.orderService.createOrder(order);
  }
}
