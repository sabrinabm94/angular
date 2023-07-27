import { IBackgroundImage } from "./IBackgroundImage.interface";
import { IProfessional } from "./IProfessional.interface";
import { ISubcategories } from "./ISubcategories.interface";

export interface ICategory {
  id: string;
  name: string;
  description: string;
  link: string;
  slug: string;
  images: Array<IBackgroundImage>;
  subcategories?: Array<ISubcategories>;
  relatedCategories?: Array<ICategory>;
  professionals?: Array<IProfessional>;
}
