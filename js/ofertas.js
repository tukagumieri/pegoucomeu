/* =========================================================
   OFERTAS DA SEMANA
   ---------------------------------------------------------
   Para atualizar as promoções: salve a arte em assets/ofertas/ e edite este arquivo:
   - validade: último dia das ofertas (AAAA-MM-DD).
     Deixe "" para mostrar "enquanto durarem os estoques".
   - cada item:
       nome       → nome do produto
       categoria  → usada nos filtros da página de ofertas
       por        → preço da oferta (use ponto: 11.99)
       leve       → para "2 por R$ 11,99" coloque 2 (deixe 1 se for preço unitário)
       de         → preço antigo (opcional; mostra o "de/por" e o % de desconto)
       unidade    → ex.: "cada", "kg", "pacote"
       imagem     → arte da oferta, salva em assets/ofertas/
       destaque   → true = aparece também na página inicial
   ========================================================= */
window.OFERTAS = {
  validade: "",
  itens: [
    { nome: "Lata decorada de Natal Santa Espuress", categoria: "Especial de Natal", por: 6.99,  leve: 1, unidade: "cada",   imagem: "assets/ofertas/lata-natal-santa-espuress.jpg",   destaque: true },
    { nome: "Pão de queijo Ludo Mix tradicional 1 kg", categoria: "Congelados",      por: 12.48, leve: 1, unidade: "pacote", imagem: "assets/ofertas/pao-de-queijo-ludo-mix.jpg",       destaque: true },
    { nome: "Pão Wickbold 43% integral 500 g",          categoria: "Padaria",         por: 11.99, leve: 3, unidade: "",       imagem: "assets/ofertas/pao-wickbold-integral.jpg",        destaque: true },
    { nome: "Iogurte Vigor morango 600 g (bandeja)",    categoria: "Frios e laticínios", por: 11.99, leve: 2, unidade: "",    imagem: "assets/ofertas/iogurte-vigor-morango.jpg",        destaque: true },
    { nome: "Dadinho de batata com bacon Bem Brasil 1,05 kg", categoria: "Congelados", por: 24.99, leve: 1, unidade: "pacote", imagem: "assets/ofertas/dadinho-batata-bacon-bem-brasil.jpg", destaque: false },
    { nome: "Batata palito corte tradicional Bem Brasil 1,05 kg", categoria: "Congelados", por: 20.99, leve: 1, unidade: "pacote", imagem: "assets/ofertas/batata-palito-bem-brasil.jpg", destaque: false },
    { nome: "Batata noisette Bem Brasil 1,05 kg",       categoria: "Congelados",      por: 17.76, leve: 1, unidade: "pacote", imagem: "assets/ofertas/batata-noisette-bem-brasil.jpg",   destaque: false },
    { nome: "Batata ondulada Bem Brasil 1,05 kg",       categoria: "Congelados",      por: 20.99, leve: 1, unidade: "pacote", imagem: "assets/ofertas/batata-ondulada-bem-brasil.jpg",   destaque: false },
    { nome: "Queijo tipo brie Polenghi 125 g",          categoria: "Frios e laticínios", por: 11.99, leve: 2, unidade: "",    imagem: "assets/ofertas/queijo-brie-polenghi.jpg",         destaque: false },
    { nome: "Bebida láctea Itambé morango 170 g",       categoria: "Frios e laticínios", por: 9.99,  leve: 4, unidade: "",    imagem: "assets/ofertas/bebida-lactea-itambe-morango.jpg", destaque: false }
  ]
};
