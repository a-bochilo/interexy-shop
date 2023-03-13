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
import { CartDto } from "./dtos/cart.dto";

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
        type: CartDto,
        isArray: false,
    })
    @Post()
    // @AuthPermissionsGuard(UserPermissions.createCart)
    @UsePipes(new ValidationPipe())
    async createProduct(@Body() cartCreateDto: CartDto): Promise<string> {
        return await "hello";
    }
}
