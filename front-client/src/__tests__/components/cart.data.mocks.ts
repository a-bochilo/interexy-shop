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
