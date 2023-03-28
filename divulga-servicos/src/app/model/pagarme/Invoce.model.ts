import { ChargeStatus } from "src/app/utils/enums/pagarme/ChargeStatus";
import { PaymentMethod } from "src/app/utils/enums/pagarme/PaymentMethod";
import { Buyer } from "../Buyer.model";
import { Item } from "./Item.model";

export class Invoice {
  id: string = ""; //formato ch_XXXXXXXXXXXXXXXX
  url: string = "";
  amount: number = 0;
  payment_method: PaymentMethod = PaymentMethod.bank_transfer;
  installments: number = 1; //parcelas
  status: ChargeStatus = ChargeStatus.pending;
  billing_at: Date = new Date;
  seen_at: Date = new Date;
  due_at: Date = new Date;
  created_at: Date = new Date;
  canceled_at: Date = new Date;
  period = {

  };
  item: Array<Item> = [];
  subscription: Subscription = new Subscription;
  customer: Buyer = new Buyer;
  total_discount: number = 0;
  total_increment: number = 0;
}
