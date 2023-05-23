import { BoletoType } from "src/app/utils/enums/pagarme/BoletoType";
import { Fine } from "./Fine.model";
import { Interest } from "./Interest.model";

export class Boleto {
  bank: number = 0;
  instructions: string = "";
  due_at: number = 0;
  nosso_numero: number = 0;
  type: BoletoType = BoletoType.BDP;
  document_number: number = 0;
  interest: Interest = new Interest; //configuração de juros
  fine: Fine = new Fine;
}
