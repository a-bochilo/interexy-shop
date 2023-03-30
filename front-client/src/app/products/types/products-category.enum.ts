export enum ProductsCategory {
    trousers = "trousers",
    shirts = "shirts",
    shoes = "shoes",
}
export enum CategoriesSelector {
    all = "all",
    trousers = "trousers",
    shirts = "shirts",
    shoes = "shoes",
}
export interface ICategoriesSelector {
    all: CategoriesSelector.all;
    trousers: CategoriesSelector.trousers;
    shirts: CategoriesSelector.shirts;
    shoes: CategoriesSelector.shoes;
}
