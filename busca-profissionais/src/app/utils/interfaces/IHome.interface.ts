import { ICategory } from "./ICategory.interface";
import { IImage } from "./IImage.interface";

export interface IHome {
  images: Array<IImage>;
  bestCategories: Array<ICategory>;
}
