import { IBackgroundImage } from "./IBackgroundImage.interface";

export interface ISubcategories {
  name: string;
  description: string;
  link: string;
  images: Array<IBackgroundImage>;
}
