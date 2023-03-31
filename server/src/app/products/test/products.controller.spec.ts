import { Test, TestingModule } from "@nestjs/testing";

// ========================== security ==========================
import { JwtAuthGuard } from "../../security/guards/jwt-auth.guard";
import { RolesGuard } from "../../security/guards/roles.guard";

// ========================== services & controllers ==========================
import { ProductsController } from "../products.controller";
import { ProductsService } from "../products.service";

// ========================== mocks ==========================
import {
  productCreateDto,
  productDetailsDto,
  productDetailsEntity,
  productDto,
  productEntity,
  productWithDetailsDto,
} from "./mocks/data.mocks";

describe("CartController", () => {
  let controller: ProductsController;

  const mockedProductsService = {
    createProduct: jest.fn().mockResolvedValue(productEntity),
    getActiveProducts: jest
      .fn()
      .mockResolvedValue([productEntity, productEntity]),
    getFiltredProducts: jest
      .fn()
      .mockResolvedValue([productEntity, productEntity]),
    getProductDetails: jest.fn().mockResolvedValue(productDetailsEntity),
    updateProduct: jest.fn().mockResolvedValue(productWithDetailsDto),
    deleteProduct: jest.fn().mockResolvedValue(productEntity),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockedProductsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(true)
      .overrideGuard(RolesGuard)
      .useValue(true)
      .compile();
    controller = module.get<ProductsController>(ProductsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("on post request on '/products'", () => {
    it("should return productDto", async () => {
      const createProduct = await controller.createProduct(productCreateDto);
      expect(createProduct).toBeDefined();
      expect(createProduct).toMatchObject(productDto);
    });
  });

  describe("on get request on '/products'", () => {
    it("should return productDto[]", async () => {
      const createProductArr = await controller.getAllProducts(null);

      expect(createProductArr).toBeDefined();
      expect(createProductArr).toMatchObject([productDto, productDto]);
    });
  });

  describe("on get request on '/products/filter'", () => {
    it("should return productDto[]", async () => {
      const filtredProductArr = await controller.getFiltredProducts({
        brand: "brand",
      });

      expect(filtredProductArr).toBeDefined();
      expect(filtredProductArr).toMatchObject([productDto, productDto]);
    });
  });

  describe("on get request on '/productId'", () => {
    it("should return productDetailsDto", async () => {
      const productDetails = await controller.getProductDetials("id");

      expect(productDetails).toBeDefined();
      expect(productDetails).toMatchObject(productDetailsDto);
    });
  });

  describe("on put request on '/productId'", () => {
    it("should return productWithDetailsDto", async () => {
      const productWithDetails = await controller.updateProduct(
        { brand: "brand" },
        "proudctId"
      );

      expect(productWithDetails).toBeDefined();
      expect(productWithDetails).toMatchObject(productWithDetailsDto);
    });
  });

  describe("on delete request on '/productId'", () => {
    it("should return productDto", async () => {
      const deleteProduct = await controller.deleteProduct("proudctId");

      expect(deleteProduct).toBeDefined();
      expect(deleteProduct).toMatchObject(productDto);
    });
  });
});
