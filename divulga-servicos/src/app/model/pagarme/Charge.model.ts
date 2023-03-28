import { ChargeStatus } from "src/app/utils/enums/pagarme/ChargeStatus";
import { PaymentMethod } from "src/app/utils/enums/pagarme/PaymentMethod";
import { Buyer } from "../Buyer.model";
import { Invoice } from "./Invoce.model";

export class Charge {
  id: string = ""; //formato ch_XXXXXXXXXXXXXXXX
  code: string = "";
  gateway_id: string = "";
  amount: number = 0;
  payment_method: PaymentMethod = PaymentMethod.bank_transfer;
  status: ChargeStatus = ChargeStatus.pending;
  due_at: Date = new Date;
  created_at: Date = new Date;
  updated_at: Date = new Date;
  customer: Buyer = new Buyer;
  invoice: Invoice = new Invoice;
  last_transaction: Charge = new Charge;
}
