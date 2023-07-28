import { PaymentStatus } from "src/app/utils/enums/pagarme/PaymentStatus";

export class Discount {
  id: string = ""; //formato dis_XXXXXXXXXXXXXXXX
  value: number = 0;
  discount_type: string = "percentage";
  cycles: number = 1;
  item_id: string = "";
  status: PaymentStatus = PaymentStatus.active; //active ou deleted
  created_at: Date = new Date;
}
