import { Address } from './Address.model';
import { Order } from './pagarme/Order.model';
import { Phone } from './Phone.model';
import { Service } from './Service.model';
import { User } from './User.model';

export class Buyer extends User {
  type: string = "individual";
  service: Service = new Service;
  home_phone?: Phone = new Phone;
  mobile_phone: Phone = new Phone;
  address: Address = new Address;
  orders?: Array<Order>;
}
