import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

// ========================== swagger ==========================
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

// ========================== dto's ==========================
import { ProductDto } from "./dtos/product.dto";
import { ProductWithDetailsDto } from "./dtos/product-with-details.dto";
import { ProductDetailsDto } from "./dtos/product-details.dto";
import { ProductsQueryDto } from "./dtos/products-query.dto";
import { ProductOptionalDto } from "./dtos/products-optional.dto";
import { ProductsFilterDto } from "./dtos/products-filter.dto";

// ========================== enums ==========================
import { UserPermissions } from "../../shared/types/user-permissions.enum";

// ========================== services ==========================
import { ProductsService } from "./products.service";

// ========================== security ==========================
import { AuthPermissionsGuard } from "../security/decorators/auth-permissions-guard.decorator";

@ApiTags("Products controller")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: "Create new product" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: ProductDto,
    isArray: false,
  })
  @Post()
  @AuthPermissionsGuard(UserPermissions.createProduct)
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
  @UsePipes(new ValidationPipe())
  async getAllProducts(
    @Query() query: ProductsQueryDto
  ): Promise<ProductDto[]> {
    const products = await this.productsService.getActiveProducts(query);

    return products.map((product) => ProductDto.fromEntity(product));
  }

  @Get("/filter")
  @UsePipes(new ValidationPipe())
  async getFiltredProducts(
    @Query() filter: ProductsFilterDto
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
  @UsePipes(new ValidationPipe())
  async getProductDetials(
    @Param("productId", ParseUUIDPipe) productId: string
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
  @AuthPermissionsGuard(UserPermissions.updateProduct)
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
  @AuthPermissionsGuard(UserPermissions.deleteProduct)
  @UsePipes(new ValidationPipe())
  async deleteProduct(
    @Param("productId") productId: string
  ): Promise<ProductDto> {
    const deletedProduct = await this.productsService.deleteProduct(productId);

    return ProductDto.fromEntity(deletedProduct);
  }
}
