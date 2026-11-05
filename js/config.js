/* =====================================================
   config.js — configurações do ConviteX
   Aqui ficam só informações PÚBLICAS. Nunca coloque
   senhas, chaves secretas ou tokens neste arquivo,
   porque ele fica visível para qualquer visitante.
   ===================================================== */

const CONFIG = {
  nomeSite: "ConviteX",

  // TROQUE pelo seu e-mail real antes de publicar.
  // O formulário de contato abre o app de e-mail do visitante
  // com a mensagem pronta para enviar para este endereço.
  emailContato: "contato@seudominio.com",

  // Preços iniciais (em reais). Você pode ajustar quando quiser.
  precos: {
    essencial: 10,
    premium: 15,
  },

  // PAGAMENTO — deixe "false" por enquanto.
  // Enquanto estiver false, o site NÃO cobra e NÃO finge vender nada:
  // o PNG baixado sai com a marca "ConviteX • demonstração".
  // Quando existir um responsável ajudando com a conta do provedor
  // de pagamento (ex.: Mercado Pago, Stripe, Pix), a cobrança será
  // feita por um servidor (a confirmação do pagamento NUNCA pode ser
  // decidida só aqui no navegador) e só então este valor muda.
  pagamentoAtivo: false,
};
