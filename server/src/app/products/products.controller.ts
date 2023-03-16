import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

// ========================== DTO's ==========================
import { ProductDto } from "./dtos/product.dto";
import { ProductWithDetailsDto } from "./dtos/product-with-details.dto";
import { ProductDetailsDto } from "./dtos/product-details.dto";
import { ProductsQueryDto } from "./dtos/products-query.dto";
import { ProductOptionalDto } from "./dtos/products-optional.dto";

// ========================== Enums ==========================
import { UserPermissions } from "../../shared/types/user-permissions.enum";

// ========================== Services ==========================
import { ProductsService } from "./products.service";

// ========================== Security ==========================
import { AuthPermissionsGuard } from "../security/decorators/auth-permissions-guard.decorator";

@ApiTags("Products controller")
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
    async createProduct(
        @Body() productCreateDto: ProductWithDetailsDto
    ): Promise<ProductDto> {
        const createdProduct = await this.productsService.createProduct(
            productCreateDto
        );

        return await ProductDto.fromEntity(createdProduct);
    }

    @ApiOperation({ summary: "Get active products list" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: ProductDto,
        isArray: true,
    })
    @Get()
    // @AuthPermissionsGuard(UserPermissions.getAllProducts)
    @UsePipes(new ValidationPipe())
    async getAllProducts(
        @Query() query: ProductsQueryDto
    ): Promise<ProductDto[]> {
        const products = await this.productsService.getActiveProducts(query);

        return products.map((product) => ProductDto.fromEntity(product));
    }

    @Get("/filter")
    // @AuthPermissionsGuard(UserPermissions.getFiltredProducts)
    @UsePipes(new ValidationPipe())
    async getFiltredProducts(
        @Body() filter: ProductOptionalDto
    ): Promise<ProductDto[]> {
        const products = await this.productsService.getFiltredProducts(filter);

        return products.map((product) => ProductDto.fromEntity(product));
    }

    @ApiOperation({ summary: "Get product details by product id" })
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

    @ApiOperation({ summary: "Update product" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: ProductWithDetailsDto,
        isArray: false,
    })
    @Put("/:productId")
    // @AuthPermissionsGuard(UserPermissions.updateProduct)
    @UsePipes(new ValidationPipe())
    async updateProduct(
        @Body() productUpdateDto: ProductOptionalDto,
        @Param("productId") productId: string
    ): Promise<ProductWithDetailsDto> {
        return await this.productsService.updateProduct(
            productId,
            productUpdateDto
        );
    }

    @ApiOperation({ summary: "Delete product" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: ProductDto,
        isArray: false,
    })
    @Delete("/:productId")
    // @AuthPermissionsGuard(UserPermissions.deleteProduct)
    @UsePipes(new ValidationPipe())
    async deleteProduct(
        @Param("productId") productId: string
    ): Promise<ProductDto> {
        const deletedProduct = await this.productsService.deleteProduct(
            productId
        );

        return ProductDto.fromEntity(deletedProduct);
    }
}
