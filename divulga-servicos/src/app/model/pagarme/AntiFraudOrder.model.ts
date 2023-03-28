import { Device } from "./Device.model";
import { Order } from "./Order.model";

export class AntiFraudOrder extends Order {
  device: Device = new Device;
  location: Location = new Location;
  ip: number = 0;
  sessionId: string = this.costumer.id + "_" + String(new Date());
  antifraud_enabled: boolean = true;
}
