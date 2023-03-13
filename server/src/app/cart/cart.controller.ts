import {
    Body,
    Controller,
    HttpStatus,
    Post,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

// ========================== DTO's ==========================
import { CartCreateDto } from "./dtos/cart-create.dto";
import { CartEntity } from "./entities/cart.entity";

// ========================== Enums ==========================

// ========================== Services ==========================
import { CartService } from "./cart.service";

// ========================== Security ==========================
import { AuthPermissionsGuard } from "../security/decorators/auth-permissions-guard.decorator";

@ApiTags("cart")
@Controller("cart")
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @ApiOperation({ summary: "Add new cart" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: CartCreateDto,
        isArray: false,
    })
    @Post()
    // @AuthPermissionsGuard(UserPermissions.createCart)
    @UsePipes(new ValidationPipe())
    async createProduct(
        @Body() cartCreateDto: CartCreateDto
    ): Promise<CartEntity> {
        return await this.cartService.createCart(cartCreateDto);
    }
}
