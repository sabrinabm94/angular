import { Split } from "./Split.model";

export class Pix {
  expires_in: number = 0; //tempo em segundos
  expires_at?: Date = new Date; //data no formato YYYY-MM-DDThh:mm:ss
  amount: number = 0; //valor em centavos
  split: Split = new Split;
}
