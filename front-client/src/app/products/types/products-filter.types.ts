import { ProductFilterDto } from "./product-filter.dto";
import { CategoriesSelector } from "./products-category.enum";

export type FilterKeysType = keyof ProductFilterDto;

export interface IFilterKeysTranslation extends ProductFilterDto {
  formTitle: string;
  selectCategory: string;
  filterButtonTitle: string;
  resetButtonTitle: string;
  categories: {
    all: CategoriesSelector.all;
    trousers: CategoriesSelector.trousers;
    shirts: CategoriesSelector.shirts;
    shoes: CategoriesSelector.shoes;
  };
}
