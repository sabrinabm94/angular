import { IBackgroundImage } from "./IBackgroundImage.interface";

export interface ISubcategories {
  name: string;
  description: string;
  images: Array<IBackgroundImage>;
}
