import { ProductWithDetailsDto } from "../../app/products/types/product-with-details.dto";
import { ProductDto } from "../../app/products/types/product.dto";
import { ProductsCategory } from "../../app/products/types/products-category.enum";

test.skip("skip", () => {});

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
