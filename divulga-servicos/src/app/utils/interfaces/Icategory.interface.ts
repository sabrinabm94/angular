import { IBackgroundImage } from "./IBackgroundImage.interface";
import { ISubcategories } from "./Isubcategories.interface";

export interface ICategory {
  name: string;
  description: string;
  link: string;
  images: Array<IBackgroundImage>;
  subcategories?: Array<ISubcategories>;
}
