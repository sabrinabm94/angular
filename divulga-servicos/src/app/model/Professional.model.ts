import { Buyer } from './Buyer.model';

export class Professional extends Buyer {
  isMei: boolean;
  cpf?: string | null;
}
