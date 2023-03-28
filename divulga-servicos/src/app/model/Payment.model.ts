import { PaymentStatus } from "../utils/enums/PaymentStatus";
import { PaymentType } from "../utils/enums/PaymentType";
import { User } from "./User.model";

export class Payment {
  id: number;
  createAt: Date;
  paymentAt: Date;
  validUntil: Date;
  value: number;
  paymentType: PaymentType;
  status: PaymentStatus;
  BankSlipId?: string; //todo transformar em objetos de acordo com a forma de pagamento escolhida
  CreditCardId?: string;
  BankTransferId?: string;
  PixId?: string;
  user: User;
}
