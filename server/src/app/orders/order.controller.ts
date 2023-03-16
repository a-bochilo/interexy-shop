import { Body, Controller, Get, HttpStatus, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { User } from "../users/decorators/user.decorator";

// ========================== Entities & DTO's ==========================
import { UserSessionDto } from "../users/dtos/user-session.dto";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { UserEntity } from "../users/entities/user.entity";
import { OrderEntity } from "./entities/order.entity";

// ========================== Services & Controllers ====================
import { OrderService } from "./order.service";
import { ProductDto } from "../products/dtos/product.dto";
import { OrderItemEntity } from "./entities/order-item.entity";
import { ProductEntity } from "../products/entities/product.entity";
import { AuthPermissionsGuard } from "../security/decorators/auth-permissions-guard.decorator";
import { UserPermissions } from "../../shared/types/user-permissions.enum";
import { CartSessionDto } from "../cart/dtos/cart-session.dto";
import { OrderDto } from "./dtos/order.dto";

@ApiTags('Order controller')
@Controller("orders")
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ) { }

    @Post()
    @AuthPermissionsGuard(UserPermissions.all)
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
        @Body() cart: CartSessionDto,
    ): Promise<OrderDto> {
        return await this.orderService.createOrder(cart, user.id);
    }

    @Get('/profile')
    @AuthPermissionsGuard(UserPermissions.all)
    @ApiOperation({ summary: "Get orders by user_id (user)" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: OrderEntity,
        isArray: true,
    })
    @UsePipes(new ValidationPipe())
    async getProfile(
        @User() user: UserSessionDto
    ): Promise<OrderEntity[]> {
        return await this.orderService.getOrderById(user.id)
    }

    @Get()
    @AuthPermissionsGuard(UserPermissions.all)
    @ApiOperation({ summary: "Get all orders" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: OrderEntity,
        isArray: true,
    })
    @UsePipes(new ValidationPipe())
    async getAllOrders(): Promise<OrderEntity[]> {
        return await this.orderService.getAllOrders();
    }


    @Get(':userId')
    @AuthPermissionsGuard(UserPermissions.all)
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
    ): Promise<OrderEntity[]> {
        return await this.orderService.getOrderById(userId)
    }
}
