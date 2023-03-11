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
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

// ========================== DTO's & Types ==========================
import { ProductDto } from "./dtos/product.dto";
import { ProductDetailsDto } from "./dtos/product-details.dto";
import { UserPermissions } from "src/shared/types/user-permissions.enum";

// ========================== Services ==========================
import { ProductsService } from "./products.service";

// ========================== Security ==========================
import { AuthPermissionsGuard } from "../security/decorators/auth-permissions-guard.decorator";

@ApiTags("users")
@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @ApiOperation({ summary: "Add new product" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: ProductDto,
        isArray: false,
    })
    @Post()
    // @AuthPermissionsGuard(UserPermissions.createProduct)
    @UsePipes(new ValidationPipe())
    async createProduct(@Body() productDto: ProductDto): Promise<ProductDto> {
        const createdProduct = await this.productsService.createProduct(
            productDto
        );

        return await ProductDto.fromEntity(createdProduct);
    }

    @ApiOperation({ summary: "Get products list" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: ProductDto,
        isArray: true,
    })
    @Get()
    // @AuthPermissionsGuard(UserPermissions.getAllProducts)
    @UsePipes(new ValidationPipe())
    async getAllProducts(): Promise<ProductDto[]> {
        const allProducts = await this.productsService.getAllProducts();

        return allProducts.map((product) => ProductDto.fromEntity(product));
    }

    @ApiOperation({ summary: "Get product details" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: ProductDetailsDto,
        isArray: false,
    })
    @Get("/:productId")
    // @AuthPermissionsGuard(UserPermissions.getProductDetials)
    @UsePipes(new ValidationPipe())
    async getProductDetials(
        @Param("productId") productId: string
    ): Promise<ProductDetailsDto> {
        const productDetails = await this.productsService.getProductDetails(
            productId
        );

        return ProductDetailsDto.fromEntity(productDetails);
    }
}
