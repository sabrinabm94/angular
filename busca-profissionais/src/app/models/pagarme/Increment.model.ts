export class Increment {
  id: string = ""; //formato inc_XXXXXXXXXXXXXXXX
  value: number = 0;
  increment_type: string = "percentage";
  cycles: number = 1;
  item_id: string = "";
  status: PaymentStatus = PaymentStatus.active; //active ou deleted
  created_at: Date = new Date;
}
