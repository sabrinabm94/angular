import { IBackgroundImage } from "./IBackgroundImage.interface";
import { ISubcategories } from "./Isubcategories.interface";

export interface ICategories {
  name: string;
  description: string;
  images: Array<IBackgroundImage>;
  subcategories: Array<ISubcategories>;
}
