export class Interest {
  days: number = 0; //dias após a expiração do boleto para iniciar a contagem de juros
  type: string = 'percentage';
  amount: number = 0; //valor em porcentagem da taxa de juros mensal
}
