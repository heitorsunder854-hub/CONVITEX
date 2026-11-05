# ConviteX

Site de criação de convites digitais personalizados (aniversário, casamento, 15 anos, chá de bebê e formatura).

É um site **estático**: só HTML, CSS e JavaScript. Não precisa instalar nada, não tem servidor e não usa nenhum serviço pago.

## Estrutura

```
convitex/
├── index.html        Página inicial
├── modelos.html      Galeria de modelos (com filtro por categoria)
├── editor.html       Editor com pré-visualização e download em PNG
├── precos.html       Página de preços
├── contato.html      Contato, suporte e perguntas frequentes
├── css/
│   └── estilo.css    Todo o visual (cores, fontes, responsividade)
├── js/
│   ├── config.js     Configurações públicas (e-mail, preços, pagamento)
│   ├── modelos.js    Categorias, modelos e o desenho do convite
│   ├── principal.js  Menu do celular e animações
│   ├── galeria.js    Cartões da galeria
│   ├── editor.js     Editor, pré-visualização e download
│   └── contato.js    Formulário de contato
├── .gitignore
└── README.md
```

## Antes de publicar

1. Abra `js/config.js` e troque `contato@seudominio.com` pelo seu e-mail real.
2. Nunca escreva senhas ou chaves secretas nos arquivos do site. Tudo aqui fica público.

## Testar no seu computador

Dê dois cliques em `index.html`. O site abre no navegador.
(As fontes do Google só aparecem com internet; sem ela, o site usa fontes parecidas do próprio aparelho.)

## Publicar no GitHub

1. Crie uma conta gratuita em https://github.com
2. Clique em **New repository**, dê o nome `convitex` e deixe **Public** (ou Private, se preferir).
3. Clique em **uploading an existing file**.
4. Arraste para lá **o conteúdo** da pasta `convitex` (os arquivos e as pastas `css` e `js`, não a pasta de fora).
5. Clique em **Commit changes**.

## Publicar na Vercel (gratuito)

1. Crie uma conta em https://vercel.com usando **Continue with GitHub**.
2. Clique em **Add New → Project** e escolha o repositório `convitex`.
3. Em **Framework Preset** deixe **Other**. Não precisa preencher nada de build nem variáveis.
4. Clique em **Deploy**. Em cerca de um minuto o site terá um endereço `.vercel.app`.

Sempre que você alterar um arquivo no GitHub, a Vercel atualiza o site sozinha.

## Pagamentos (ainda desligados)

- `pagamentoAtivo` em `js/config.js` está `false`.
- Com ele desligado, o site **não cobra nada e não simula compras**. O PNG baixado leva a marca "ConviteX • demonstração".
- Quando houver um responsável ajudando com a conta e a configuração de um provedor de pagamento, a cobrança deverá ser feita por um servidor (a confirmação do pagamento não pode ser decidida só no navegador) e as chaves secretas ficam nas variáveis de ambiente da Vercel, nunca no código.

## Imagens e direitos autorais

Os modelos são desenhados por código (cores, linhas e fontes livres do Google Fonts). Nenhuma imagem de terceiros é usada.
