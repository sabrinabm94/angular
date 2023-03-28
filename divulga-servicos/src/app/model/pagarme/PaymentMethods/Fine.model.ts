export class Fine {
  days: number = 0; //dias após a expiração do boleto para iniciar a contagem da multa
  type: string = 'percentage';
  amount: number = 0; //valor em porcentagem que será cobrada da multa
}
