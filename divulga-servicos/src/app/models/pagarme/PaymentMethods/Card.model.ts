import { Address } from "../../Address.model";

export class Card {
  number: number = 0;
  holder_name: string = "";
  holder_document: string = "";
  exp_month: number = 0;
  exp_year: number = 0;
  cvv: number = 0;
  brand: string = "";
  label: string = "";
  billing_address: Address = new Address;
}
