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

// ========================== entities ==========================
import { CartItemDto } from "./dtos/cart-item.dto";

// ========================== dto's ==========================
import { UserSessionDto } from "../users/dtos/user-session.dto";
import { CartSessionDto } from "./dtos/cart-session.dto";
import { CartItemCreateDto } from "./dtos/cart-item-create.dto";

// ========================== decorators ==========================
import { User } from "../users/decorators/user.decorator";

// ========================== enums ==========================
import { UserPermissions } from "../../shared/types/user-permissions.enum";

// ========================== services ==========================
import { CartService } from "./cart.service";

// ========================== security ==========================
import { AuthPermissionsGuard } from "../security/decorators/auth-permissions-guard.decorator";

@ApiTags("cart")
@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: "Get current user cart" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: CartSessionDto,
    isArray: false,
  })
  @Get()
  @AuthPermissionsGuard(UserPermissions.getCart)
  @UsePipes(new ValidationPipe())
  async getCart(@User() user: UserSessionDto): Promise<CartSessionDto> {
    const cart = await this.cartService.getUserCart(user);

    return CartSessionDto.fromEntity(cart);
  }

  @ApiOperation({ summary: "Add new item to cart" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: CartSessionDto,
    isArray: false,
  })
  @Post()
  @AuthPermissionsGuard(UserPermissions.addCartItem)
  @UsePipes(new ValidationPipe())
  async addCartItem(
    @User() user: UserSessionDto,
    @Body() cartItemDto: CartItemCreateDto
  ): Promise<CartSessionDto> {
    const cart = await this.cartService.addCartItem(user, cartItemDto);
    return CartSessionDto.fromEntity(cart);
  }

  @ApiOperation({ summary: "Update item quantity" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: CartSessionDto,
    isArray: false,
  })
  @Put()
  @AuthPermissionsGuard(UserPermissions.updateCartItem)
  @UsePipes(new ValidationPipe())
  async updateCartItem(
    @User() user: UserSessionDto,
    @Body() cartItemDto: CartItemDto
  ): Promise<CartSessionDto> {
    const cart = await this.cartService.updateCartItem(user, cartItemDto);

    return CartSessionDto.fromEntity(cart);
  }

  @ApiOperation({ summary: "Clean current user cart" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: CartSessionDto,
    isArray: false,
  })
  @Delete()
  @AuthPermissionsGuard(UserPermissions.cleanCart)
  @UsePipes(new ValidationPipe())
  async cleanCart(@User() user: UserSessionDto): Promise<CartSessionDto> {
    const cart = await this.cartService.cleanCart(user);

    return CartSessionDto.fromEntity(cart);
  }

  @ApiOperation({ summary: "Delete item from cart" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: CartSessionDto,
    isArray: false,
  })
  @Delete(":itemId")
  @AuthPermissionsGuard(UserPermissions.deleteCartItem)
  @UsePipes(new ValidationPipe())
  async deleteCartItem(
    @User() user: UserSessionDto,
    @Param("itemId") itemId: string
  ): Promise<CartSessionDto> {
    const cart = await this.cartService.deleteCartItem(user, itemId);

    return CartSessionDto.fromEntity(cart);
  }
}
