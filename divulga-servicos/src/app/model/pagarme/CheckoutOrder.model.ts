import { Buyer } from "../Buyer.model";
import { Item } from "./Item.model";
import { Payment } from "./Payment.model";

export class CheckoutOrder {
  id: string = ""; //or_XXXXXXXXXXXXXXXX
  code: number = 0;
  items: Array<Item> = [];
  costumer_id?: string = "";
  costumer: Buyer = new Buyer;
  payments: Payment = new Payment;
}
