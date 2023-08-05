export interface IAddress {
  country: string;
  state: string;
  city: string;
  neighborhood?: string;
  street?: string;
  number?: number;
  complement?: string;
  cep?: number;
}
