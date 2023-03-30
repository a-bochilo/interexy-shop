import { ProductDetailsDto } from "../../app/products/types/product-details.dto";
import { ProductDto } from "../../app/products/types/product.dto";
import { ProductsCategory } from "../../app/products/types/products-category.enum";

test.skip("skip", () => {});

export const mockCartItem = {
    id: "string",
    productId: "c06cbc27-26ee-4455-8983-33fff83c8be8",
    quantity: 1,
};

export const mockCart = {
    id: "string",
    created: "string",
    updated: "string",
    items: [mockCartItem],
};

export const mockCartInfoTranslation = {
    pricePerPcs: "price per pcs",
    total: "Total",
    orderAmount: "Order amount",
    confirmOrder: "Confirm order",
    ordering: "Ordering",
    emptyCartStub: "Cart is empty",
};


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

export const mockProductDetails: ProductDetailsDto = {
    id: "c06cbc27-26ee-4455-8983-33fff83c8be8",
    color: "color",
    material: "material",
    size: "size",
    description: "description",
};

export const initialState = {
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
        cart: mockCart,
        pending: {
            cart: false,
        },
        errors: {
            cart: null,
        },
    },
    orders: {
        errors: {
            orders: null,
            orderItems: null,
        },
    },
};

