import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

// ========================== Entities & DTO's ==========================
import { CartItemDto } from "./dtos/cart-item.dto";
import { CartEntity } from "./entities/cart.entity";
import { UserSessionDto } from "../users/dtos/user-session.dto";
import { CartSessionDto } from "./dtos/cart-session.dto";

// ========================== Decorators ==========================
import { User } from "../users/decorators/user.decorator";

// ========================== Enums ==========================
import { UserPermissions } from "src/shared/types/user-permissions.enum";

// ========================== Services ==========================
import { CartService } from "./cart.service";

// ========================== Security ==========================
import { AuthPermissionsGuard } from "../security/decorators/auth-permissions-guard.decorator";

@ApiTags("cart")
@Controller("cart")
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @ApiOperation({ summary: "Get current user cart" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: CartEntity,
        isArray: false,
    })
    @Get()
    // @AuthPermissionsGuard(UserPermissions.getCart)
    @UsePipes(new ValidationPipe())
    async getCart(@User() user: UserSessionDto): Promise<CartSessionDto> {
        const cart = await this.cartService.getUserCart(user);

        return CartSessionDto.fromEntity(cart);
    }

    @ApiOperation({ summary: "Add new item to cart" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: CartEntity,
        isArray: false,
    })
    @Post()
    // @AuthPermissionsGuard(UserPermissions.addCartItem)
    @UsePipes(new ValidationPipe())
    async addCartItem(
        @User() user: UserSessionDto,
        @Body() cartItemDto: CartItemDto
    ): Promise<CartSessionDto> {
        const cart = await this.cartService.addCartItem(user, cartItemDto);

        return CartSessionDto.fromEntity(cart);
    }

    @ApiOperation({ summary: "Update item quantity" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: CartEntity,
        isArray: false,
    })
    @Put()
    // @AuthPermissionsGuard(UserPermissions.updateCartItem)
    @UsePipes(new ValidationPipe())
    async updateCartItem(
        @User() user: UserSessionDto,
        @Body() cartItemDto: CartItemDto
    ): Promise<CartSessionDto> {
        const cart = await this.cartService.updateCartItem(user, cartItemDto);

        return CartSessionDto.fromEntity(cart);
    }

    @ApiOperation({ summary: "Delete item from cart" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: CartEntity,
        isArray: false,
    })
    @Delete(":productId")
    // @AuthPermissionsGuard(UserPermissions.deleteCartItem)
    @UsePipes(new ValidationPipe())
    async deleteCartItem(
        @User() user: UserSessionDto,
        @Param("productId") productId: string
    ): Promise<CartSessionDto> {
        const cart = await this.cartService.deleteCartItem(user, productId);

        return CartSessionDto.fromEntity(cart);
    }
}
