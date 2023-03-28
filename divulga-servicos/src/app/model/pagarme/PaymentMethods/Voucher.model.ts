import { StatementDescriptor } from "src/app/utils/enums/pagarme/StatementDescriptor";
import { Card } from "./Card.model";

export class Voucher {
  statement_descriptor: StatementDescriptor = StatementDescriptor.description;
  card: Card = new Card;
  card_id: number = 0;
  card_token: string = "";
}
