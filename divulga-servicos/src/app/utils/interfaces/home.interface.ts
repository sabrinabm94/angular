import { IBackgroundImage } from "./IBackgroundImage.interface";
import { IImage } from "./image.interface";

export interface IHome {
  images: Array<IImage>;
  backgroundImages: Array<IBackgroundImage>;
}
