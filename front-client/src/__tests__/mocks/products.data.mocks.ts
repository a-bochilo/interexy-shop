// ========================== types ==========================
import { ProductDetailsDto } from "../../app/products/types/product-details.dto";
import { ProductWithDetailsDto } from "../../app/products/types/product-with-details.dto";
import { ProductDto } from "../../app/products/types/product.dto";
import { ProductsCategory } from "../../app/products/types/products-category.enum";

test.skip("skip", () => {});

// ========================== mock product ==========================
export const mockProduct: ProductDto = {
  id: "c06cbc27-26ee-4455-8983-33fff83c8be8",
  created: 1679936346070,
  updated: 1679936346070,
  category: ProductsCategory.shirts,
  name: "name",
  brand: "brand",
  price: 10,
  image: "https://image.com",
  quantity: 10,
  isActive: true,
};

// ========================== mock product with details ==========================
export const mockProductWithDetails: ProductWithDetailsDto = {
  id: "c06cbc27-26ee-4455-8983-33fff83c8be8",
  created: 1679936346070,
  updated: 1679936346070,
  category: ProductsCategory.shirts,
  name: "name",
  brand: "brand",
  price: 10,
  image: "https://image.com",
  quantity: 10,
  isActive: true,
  color: "color",
  material: "material",
  size: "size",
  description: "description",
};

// ========================== initial state ==========================
export const initialState = {
  products: {
    products: [mockProduct],
    productDetails: undefined,
    pending: {
      products: false,
      productDetails: false,
      filter: false,
    },
    errors: {
      products: null,
      productDetails: null,
      filter: null,
    },
  },
};

// ========================== mock product details ==========================
export const mockProductDetails: ProductDetailsDto = {
  id: "c06cbc27-26ee-4455-8983-33fff83c8be8",
  color: "color",
  material: "material",
  size: "size",
  description: "description",
};

// ========================== not empty cart ==========================
export const nonEmptyCart = {
  id: "string",
  created: "string",
  updated: "string",
  items: [
    {
      id: "string",
      productId: "c06cbc27-26ee-4455-8983-33fff83c8be8",
      quantity: 5,
    },
  ],
};

// ========================== initial state with cart ==========================
export const initialStateWithCart = {
  products: {
    products: [mockProduct],
    filtredProducts: [mockProduct],
    productDetails: mockProductDetails,
    pending: {
      products: false,
      productDetails: false,
      filter: false,
    },
    errors: {
      products: null,
      productDetails: null,
      filter: null,
    },
  },
  cart: {
    cart: nonEmptyCart,
    pending: {
      cart: false,
    },
    errors: {
      cart: null,
    },
  },
};
