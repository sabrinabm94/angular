export enum PaymentResponses {
  "Sucesso" = 200,
  "Requisição inválida" = 400,
  "Chave de API inválida" = 401,
  "IP ou Domínio bloqueado" = 403,
  "Não encontrado" = 404,
  "Os parâmetros são válidos mas a requisição falhou" = 412,
  "Parâmetros inválidos" = 422,
  "Houveram muitas requisições deste IP" = 429, //não pode haver mais que 50 requisições por minuto
  "Ocorreu um erro interno" = 500
}
