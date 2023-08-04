import { IBackgroundImage } from "./IBackgroundImage.interface";
import { ISubcategories } from "./ISubcategories.interface";
import { IProfessional } from "./IProfessional";

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
