import { PaymentMethod } from "src/app/utils/enums/pagarme/PaymentMethod";
import { PaymentStatus } from "src/app/utils/enums/pagarme/PaymentStatus";
import { StatementDescriptor } from "src/app/utils/enums/pagarme/StatementDescriptor";
import { SubscriptionInterval } from "src/app/utils/enums/pagarme/SubscriptionInterval";
import { BillingType } from "src/app/utils/enums/pagarme/SubscriptionInterval copy";
import { Buyer } from "../Buyer.model";
import { Discount } from "./Discount.model";
import { Increment } from "./Increment.model";
import { Item } from "./Item.model";
import { Card } from "./PaymentMethods/Card.model";
import { Split } from "./PaymentMethods/Split.model";

export class Subscription {
  id: string = ""; //formato sub_XXXXXXXXXXXXXXXX
  payment_method: PaymentMethod = PaymentMethod.credit_card; //aceita cartão de crédito, débito e boleto
  currency: string = "BRL";
  start_at: Date = new Date;
  interval: SubscriptionInterval = SubscriptionInterval.month;
  interval_count: number = 1; //a cada 1 mês - mensal
  billing_type: BillingType = BillingType.exact_day;
  current_cycle = {

  };
  next_billing_at: Date = new Date;
  Installments: number = 1; //parcelas
  statement_descriptor: StatementDescriptor = StatementDescriptor.description;
  costumer: Buyer = new Buyer;
  card?: Card = new Card;
  plan = {

  };
  discounts?:  Array<Discount> = [];
  increments?:  Array<Increment> = [];
  minimum_price: number = 20.00;
  itens: Array<Item> = [];
  status: PaymentStatus = PaymentStatus.active;
  created_at: Date = new Date;
  updated_at: Date = new Date;
  canceled_at: Date = new Date;
  gateway_affiliation_id: string = "";
  split: Split = new Split;
}
