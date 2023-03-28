import { Buyer } from './Buyer.model';

export class Professional extends Buyer {
  isMei: boolean = false;
  cpf: string = "";
  document: string = this.cpf;
}
