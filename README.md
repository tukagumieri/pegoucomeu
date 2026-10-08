# Site Pegou Comeu

Site estático (HTML + CSS + JS puro), pronto para GitHub + Vercel. Não precisa de build.

## Páginas
- `index.html` — Início (apresentação, destaques de ofertas, sobre, categorias, visite)
- `ofertas.html` — Todas as ofertas, com filtro por categoria
- `historia.html` — Nossa história (linha do tempo)
- `missao.html` — Missão, visão e valores

## Como atualizar as promoções (toda semana)
Edite só o arquivo **`js/ofertas.js`**:
- `validade`: último dia das ofertas (`AAAA-MM-DD`)
- cada produto: `nome`, `categoria`, `de` (preço antigo), `por` (preço da oferta), `unidade`, `emoji`
- `imagem`: opcional — coloque a foto em `assets/produtos/` e escreva o caminho, ex.: `"assets/produtos/arroz.png"`
- `destaque: true` faz o produto aparecer também na página inicial

## Dados da loja
Endereço, WhatsApp, horários e Instagram ficam em **`js/config.js`** — muda lá e atualiza no site todo.

## Textos para completar
A página de história já está preenchida (fundada em 2024 por Arthur e Magnelson).

## Publicar
1. Crie um repositório no GitHub e envie esta pasta.
2. Na Vercel: *Add New → Project* → importe o repositório → *Deploy* (Framework: **Other**, sem comando de build).
3. Cada `git push` atualiza o site automaticamente.
