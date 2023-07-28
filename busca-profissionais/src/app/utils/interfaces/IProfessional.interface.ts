import { ServiceType } from "../enums/ServiceType";
import { IAddress } from "./IAddress.interface";
import { IBackgroundImage } from "./IBackgroundImage.interface";
import { ICategory } from "./ICategory.interface";
import { ISocialNetworks } from "./ISocialNetworks.interface";

export interface IProfessional {
  id: string;
  name: string;
  description: string;
  link: string;
  slug: string;
  localization: IAddress;
  serviceArea: IAddress;
  serviceType: ServiceType | string;
  images: Array<IBackgroundImage>;
  socialNetworks: Array<ISocialNetworks>;
  categories: Array<ICategory>;
}
