import { PaymentMethod } from "src/app/utils/enums/pagarme/PaymentMethod";
import { Checkout } from "./PaymentMethods/Checkout.model";

export class Payment {
  amount: number = 0;
  payment_method: PaymentMethod = PaymentMethod.checkout;
  checkout: Checkout = new Checkout;
}
