import { PaymentType } from "../../../utils/enums/pagarme/PaymentMethod";
import { Address } from "../../Address.model";

export class Checkout {
  expires_in: number = 0;
  default_payment_method: string = "";
  accepted_payment_methods: Array<PaymentType> = [];
  accepted_brands: string = "";
  accepted_multi_payment_methods: string = "";
  success_url: string = process.env.PAGARME_PAYMENT_SUCCESS_URL;
  skip_checkout_success_page: boolean = false;
  customer_editable: boolean = true;
  billing_address_editable: boolean = true;
  billing_address: Address = new Address;
}

//pegar o retorno desta request do campo payment-url
