import { Address } from "../Address.model";
import { CheckoutOrder } from "./CheckoutOrder.model";

export class Order extends CheckoutOrder {
  closed: boolean = false;
  //antifraud?: AntiFraud = new AntiFraud;
  billingAddress?: Address;
}
