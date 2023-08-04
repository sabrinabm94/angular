import { ServiceType } from '../enums/ServiceType';
import { IAddress } from './IAddress.interface';
import { IBackgroundImage } from './IBackgroundImage.interface';
import { ICategory } from './ICategory.interface';
import { ISocialNetworks } from './ISocialNetworks.interface';

export interface IUser {
  id?: string;
  name: string;
  link: string;
  slug: string;
  localization: IAddress;
  serviceArea: IAddress;
  images: Array<IBackgroundImage>;
  socialNetworks: Array<ISocialNetworks>;
  categories: Array<ICategory>;
  serviceDescription: string;
  serviceType: ServiceType[] | any;
  email: string;
  emailConfirmation: string;
  lastname: string;
  password: string;
  passwordConfirmation: string;
}
