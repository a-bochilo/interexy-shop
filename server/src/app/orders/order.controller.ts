import { Body, Controller, Get, HttpStatus, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { OrderEntity } from "./entities/order.entity";
import { User } from "../users/decorators/user.decorator";
import { UserSessionDto } from "../users/dtos/user-session.dto";
import { UserDetailsEntity } from "../users/entities/user-details.entity";
import { CreateOrderDto } from "./dtos/create-order.dto";

@ApiTags('Order controller')
@Controller("order")
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ) { }

    @Post('/:userId')
    @ApiOperation({ summary: "Create order" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: OrderEntity,
        isArray: false,
    })
    @UsePipes(new ValidationPipe())
    async createOrder(
        @Param("userId") userId: string,
        @Body() order: CreateOrderDto,
    )/*: Promise<OrderEntity> */{
        return await this.orderService.createOrder(order, userId);
    }


    @Get()
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

    @Get('/profile')
    //@AuthPermissionsGuard(UserPermissions.getOrder)
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
}