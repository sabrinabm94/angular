import { ItemStatus } from "src/app/utils/enums/pagarme/ItemStatus";
import { Order } from "./Order.model";

export class Item {
  id: string = ""; //formato oi_XXXXXXXXXXXXXXXX
  code: number = 0;
  amount: number = 0;
  description: string = "";
  quantity: number = 0;
  category?: string = "";
  status: ItemStatus = ItemStatus.active;
  created_at: Date = new Date;
  updated_at: Date = new Date;
  deleted_at: Date = new Date;
  order: Order = new Order;
}
