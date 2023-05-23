import { StatementDescriptor } from "src/app/utils/enums/pagarme/StatementDescriptor";
import { Card } from "./Card.model";
import { NetworkToken } from "../NetworkToken.model";

export class CreditCard {
  operation_type: string = "auth_and_capture";
  installments: number = 1; //parcelas
  statement_descriptor: StatementDescriptor = StatementDescriptor.description
  card: Card = new Card;
  network_token: NetworkToken = new NetworkToken;
  card_id: number = 0;
  card_token: string = "";
}
