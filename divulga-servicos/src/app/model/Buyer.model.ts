import { Address } from './Address.model';
import { Payment } from './Payment.model';
import { Service } from './Service.model';
import { User } from './User.model';

export class Buyer extends User {
  phone?: string;
  cellPhone: string;
  cnpj: string;
  service: Service;
  address: Address;
  payments?: Array<Payment>;
}
