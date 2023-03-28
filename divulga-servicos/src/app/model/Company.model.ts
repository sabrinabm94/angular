import { Buyer } from "./Buyer.model";

export class Company extends Buyer {
  cnpj: string = "";
  document: string = this.cnpj;
}
