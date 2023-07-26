import { IBackgroundImage } from "./IBackgroundImage.interface";
import { ISubcategories } from "./Isubcategories.interface";

export interface ICategory {
  id: string;
  name: string;
  description: string;
  link: string;
  slug: string;
  images: Array<IBackgroundImage>;
  subcategories?: Array<ISubcategories>;
  relatedCategories?: Array<ICategory>;
}
