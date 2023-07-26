import { IBackgroundImage } from "./IBackgroundImage.interface";

export interface ISubcategories {
  id: string;
  name: string;
  description: string;
  link: string;
  slug: string;
  images: Array<IBackgroundImage>;
}
