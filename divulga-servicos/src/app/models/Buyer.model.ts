import { Order } from './pagarme/Order.model';
import { User } from './User.model';

export class Buyer extends User {
  orders?: Array<Order>;
}
