import { ILink } from './ILink.interface';

export interface IFooter {
  phoneNumber: string;
  email: string;
  menu?: Array<ILink> | null;
  scripts?: string;
  copyright: string;
  images: {
    logo: {
      link: string;
      title: string;
      width: number;
      height: number;
    };
  };
}
