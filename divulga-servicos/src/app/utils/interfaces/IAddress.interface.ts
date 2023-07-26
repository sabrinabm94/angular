export interface IAddress {
  state: string;
  city: string;
  neighborhood: string;
  street?: string;
  number?: number;
  complement?: string;
  cep?: number;
}
