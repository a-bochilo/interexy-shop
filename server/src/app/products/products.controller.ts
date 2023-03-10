import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";

// ========================== DTO's & Types ==========================
import { ProductDto } from "./dtos/product.dto";
import { UserPermissions } from "src/shared/types/user-permissions.enum";

// ========================== Services ==========================
import { ProductsService } from "./products.service";

// ========================== Security ==========================
import { AuthPermissionsGuard } from "../security/decorators/auth-permissions-guard.decorator";

// ========================== Entities ==========================

@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    // @AuthPermissionsGuard(UserPermissions.createProduct)
    @UsePipes(new ValidationPipe())
    async createProduct(@Body() productDto: ProductDto): Promise<ProductDto> {
        const createdProduct = await this.productsService.createProduct(
            productDto
        );

        return await ProductDto.fromEntity(createdProduct);
    }

    @Get()
    // @AuthPermissionsGuard(UserPermissions.getAllProducts)
    @UsePipes(new ValidationPipe())
    async getAllProducts(): Promise<ProductDto[]> {
        const allProducts = await this.productsService.getAllProducts();

        return allProducts.map((product) => ProductDto.fromEntity(product));
    }
}
