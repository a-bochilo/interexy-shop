import { HttpException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

// ========================== types ==========================
import { ProductsCategory } from "../enums/products-category.enum";

// ========================== services ==========================
import { ProductsService } from "../products.service";

// ========================== repositories ==========================
import { ProductsDetailsRepository } from "../repos/product-details.repository";
import { ProductsActiveViewRepository } from "../repos/products-active-view.repository";
import { ProductsRepository } from "../repos/products.repository";

// ========================== mocks ==========================
import {
  productActiveViewEntity,
  productCreateDto,
  productDetailsEntity,
  productEntity,
  productWithDetailsDto,
} from "./mocks/data.mocks";

jest.mock("nestjs-i18n", () => ({
  I18nContext: {
    current: () => ({
      t: () => "text",
    }),
  },
}));

describe("ProductsService", () => {
  let productsService: ProductsService;

  const mockedProductsRepository = {
    getProductsByName: jest.fn().mockResolvedValue([]),
    createProduct: jest.fn().mockResolvedValue(productEntity),
    getFiltredProducts: jest.fn().mockResolvedValue([productEntity]),
    getProductById: jest.fn().mockResolvedValue(productEntity),
    updateProduct: jest.fn().mockResolvedValue(productEntity),
  };

  const mockedProductsActiveViewRepository = {
    getProductsInCategory: jest
      .fn()
      .mockResolvedValue([productActiveViewEntity]),
    getAllProducts: jest.fn().mockResolvedValue([productActiveViewEntity]),
    getProductById: jest.fn().mockResolvedValue(productActiveViewEntity),
    getFiltredProducts: jest.fn().mockResolvedValue([productActiveViewEntity]),
  };

  const mockedProductsDetailsRepository = {
    createProductDetails: jest.fn().mockResolvedValue(productDetailsEntity),
    getProductDetailsById: jest.fn().mockResolvedValue(productDetailsEntity),
    updateProductDetails: jest.fn().mockResolvedValue(productDetailsEntity),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductsRepository,
          useValue: mockedProductsRepository,
        },
        {
          provide: ProductsActiveViewRepository,
          useValue: mockedProductsActiveViewRepository,
        },
        {
          provide: ProductsDetailsRepository,
          useValue: mockedProductsDetailsRepository,
        },
      ],
    }).compile();

    productsService = await module.get(ProductsService);
  });

  it("should be defined", () => {
    expect(productsService).toBeDefined();
  });

  describe("method 'createProduct'", () => {
    describe("should return product entity or throw error depends on if product already exist in db", () => {
      it("should return product entity", async () => {
        const result = await productsService.createProduct(productCreateDto);

        expect(result).toBeDefined();
        expect(result).toMatchObject(productEntity);
      });
      it("should return error because product already exist", async () => {
        mockedProductsRepository.getProductsByName = jest
          .fn()
          .mockResolvedValue([productEntity]);
        try {
          await productsService.createProduct(productCreateDto);
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException);
        }
      });
    });
  });

  describe("method 'getActiveProducts'", () => {
    it("in case there is no query it should return ProductActiveViewEntity[]", async () => {
      const result = await productsService.getActiveProducts();

      expect(result).toBeDefined();
      expect(result).toMatchObject([productActiveViewEntity]);
    });
    it("in case there is some query it should return ProductActiveViewEntity[]", async () => {
      const result = await productsService.getActiveProducts({
        category: ProductsCategory.shirts,
      });

      expect(result).toBeDefined();
      expect(result).toMatchObject([productActiveViewEntity]);
    });
  });

  describe("method 'getFiltredProducts'", () => {
    describe("should return ProductEntity[] or ProductActiveViewEntity[] depends on if filter isActive=true or false", () => {
      it("should return ProductActiveViewEntity[] because isActive filter isn't set", async () => {
        const result = await productsService.getFiltredProducts({
          brand: "brand",
        });

        expect(result).toBeDefined();
        expect(result).toMatchObject([productActiveViewEntity]);
      });
      it("should return ProductEntity[] because isActive filter is set to false", async () => {
        const result = await productsService.getFiltredProducts({
          brand: "brand",
          isActive: false,
        });

        expect(result).toBeDefined();
        expect(result).toMatchObject([productEntity]);
      });
    });
  });

  describe("method 'updateProduct'", () => {
    describe("should return ProductWithDetailsDto or throw error depends on if product does not exist in db or other product with supposed to be assigned name already exist in db", () => {
      it("should return ProductWithDetailsDto entity", async () => {
        mockedProductsRepository.getProductById = jest
          .fn()
          .mockResolvedValue(productEntity);

        const expectedResult = {
          ...productWithDetailsDto,
          color: "blue",
        };

        const result = await productsService.updateProduct("productId", {
          color: "blue",
        });

        expect(result).toBeDefined();
        expect(result).toMatchObject(expectedResult);
      });
      it("should return error because product does not exist in db", async () => {
        mockedProductsRepository.getProductById = jest
          .fn()
          .mockResolvedValue(null);
        try {
          await productsService.updateProduct("productId", {
            color: "blue",
          });
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException);
        }
      });
      it("should return error because other product with supposed to be assigned name already exist in db", async () => {
        mockedProductsRepository.getProductById = jest
          .fn()
          .mockResolvedValue(productEntity);

        const otherProductWithTheName = {
          ...productEntity,
          id: "some-other-id",
        };
        mockedProductsRepository.getProductsByName = jest
          .fn()
          .mockResolvedValue([otherProductWithTheName]);
        try {
          await productsService.updateProduct("productId", {
            name: productEntity.name,
          });
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException);
        }
      });
    });
  });

  describe("method 'deleteProduct'", () => {
    describe("should return ProductEntity with isActive: false, or throw error depends on if product does not exist in db", () => {
      it("should return ProductEntity with isActive: false", async () => {
        const expectedResult = {
          ...productEntity,
          isActive: false,
        };

        const result = await productsService.deleteProduct("productId");

        expect(result).toBeDefined();
        expect(result).toMatchObject(expectedResult);
      });
      it("should return error because product does not exist in db", async () => {
        mockedProductsRepository.getProductById = jest
          .fn()
          .mockResolvedValue(null);
        try {
          await productsService.deleteProduct("productId");
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException);
        }
      });
    });
  });

  describe("method 'getProductDetails'", () => {
    describe("should return ProductDetailsEntity", () => {
      it("s", async () => {
        mockedProductsRepository.getProductById = jest
          .fn()
          .mockResolvedValue(productEntity);

        const result = await productsService.getProductDetails("productId");

        expect(result).toBeDefined();
        expect(result).toMatchObject(productDetailsEntity);
      });
    });
  });
});
