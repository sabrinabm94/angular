export class Split {
  amount: number = 0; //valor ao destinatário
  recipient_id: string = ""; //formato rp_XXXXXXXXXXXXXXXX - recebedor
  type: string = "flat";
  options = {
    charge_processing_fee: false, //indica se o recebedor será cobrado pelas taxas da transação
    charge_remainder_fee: false, //indica se o recebedor irá receber o restante dos recebíveis após uma divisão
    liable: false //indica se o recebedor é responsável pela transação em caso de chargeback.
  };
}
