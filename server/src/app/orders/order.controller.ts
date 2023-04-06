// ========================== nest =====================================
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

// ========================== decorators ================================
import { AuthPermissionsGuard } from "../security/decorators/auth-permissions-guard.decorator";
import { User } from "../users/decorators/user.decorator";

// ========================== swagger ===================================
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

// ========================== enums =====================================
import { UserPermissions } from "../../shared/types/user-permissions.enum";

// ========================== entities & dto's ==========================
import { UserSessionDto } from "../users/dtos/user-session.dto";
import { OrderEntity } from "./entities/order.entity";
import { CartSessionDto } from "../cart/dtos/cart-session.dto";
import { OrderDto } from "./dtos/order.dto";
import { OrderItemDto } from "./dtos/order-item.dto";

// ========================== services & controllers ====================
import { OrdersService } from "./order.service";

@ApiTags("Orders controller")
@Controller("orders")
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  @AuthPermissionsGuard(UserPermissions.createOrder)
  @ApiOperation({ summary: "Create order" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: OrderEntity,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async createOrder(
    @User() user: UserSessionDto,
    @Body() cart: CartSessionDto
  ): Promise<OrderDto> {
    return await this.orderService.createOrder(cart, user.id);
  }

  @Get("/profile")
  @AuthPermissionsGuard(UserPermissions.getProfileOrders)
  @ApiOperation({ summary: "Get orders by user_id (user)" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: OrderEntity,
    isArray: true,
  })
  @UsePipes(new ValidationPipe())
  async getProfileOrders(@User() user: UserSessionDto): Promise<OrderDto[]> {
    const orders = await this.orderService.getOrdersByUserId(user.id);
    return await orders.map((orders) => OrderDto.fromEntity(orders));
  }

  @Get()
  @AuthPermissionsGuard(UserPermissions.getAllOrders)
  @ApiOperation({ summary: "Get all orders" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: OrderEntity,
    isArray: true,
  })
  @UsePipes(new ValidationPipe())
  async getAllOrders(): Promise<OrderDto[]> {
    const orders = await this.orderService.getAllOrders();
    return await orders.map((orders) => OrderDto.fromEntity(orders));
  }

  @Get(":userId")
  @AuthPermissionsGuard(UserPermissions.getOrdersByUserId)
  @ApiOperation({ summary: "Get orders by user_id (admin)" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: OrderEntity,
    isArray: true,
  })
  @UsePipes(new ValidationPipe())
  async getOrdersByUserId(
    @Param("userId") userId: string
  ): Promise<OrderDto[]> {
    const orders = await this.orderService.getOrdersByUserId(userId);
    return await orders.map((orders) => OrderDto.fromEntity(orders));
  }

  @Get("items/:orderId")
  @AuthPermissionsGuard(UserPermissions.getOrderItemByOrderId)
  @ApiOperation({ summary: "Get orderItem by orderId" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: OrderItemDto,
    isArray: true,
  })
  @UsePipes(new ValidationPipe())
  async getOrderItemByOrderId(
    @Param("orderId") orderId: string
  ): Promise<OrderItemDto[]> {
    const ordersItems = await this.orderService.getOrderItemByOrderId(orderId);
    return await ordersItems.map((orders) => OrderItemDto.fromEntity(orders));
  }
}
