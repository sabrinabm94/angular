import { IUser } from "./IUser.interface";

export interface ICompany extends IUser {
  cnpj: string;
}
