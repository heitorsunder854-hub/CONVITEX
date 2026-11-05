/* =====================================================
   modelos.js — categorias, modelos e o "pincel" que
   desenha o convite em um <canvas>.
   O mesmo desenho serve para a miniatura da galeria,
   para a pré-visualização e para o PNG baixado.
   ===================================================== */

const FONTE_SCRIPT = '"Great Vibes", "Brush Script MT", cursive';
const FONTE_SERIF = '"Playfair Display", Georgia, serif';
const FONTE_SANS = 'Inter, Arial, sans-serif';

const CATEGORIAS = {
  aniversario: {
    nome: "Aniversário",
    titulo: "Você está convidado",
    rotuloNome: "Nome do aniversariante",
    usaIdade: true,
    exemploNome: "Maria",
    exemploIdade: "7",
    subtitulo: (d) =>
      d.idade ? `completa ${d.idade} ${Number(d.idade) === 1 ? "aninho" : "anos"}` : "está de aniversário",
    mensagemPadrao: "Venha comemorar comigo esse dia especial! Sua presença vai deixar a festa ainda mais bonita.",
  },
  casamento: {
    nome: "Casamento",
    titulo: "Convite de casamento",
    rotuloNome: "Nomes dos noivos",
    usaIdade: false,
    exemploNome: "Ana & Pedro",
    subtitulo: () => "convidam para a celebração do seu casamento",
    mensagemPadrao: "Com a bênção de Deus e de nossas famílias, teremos a alegria de receber você neste momento tão especial.",
  },
  quinze: {
    nome: "15 anos",
    titulo: "Meus 15 anos",
    rotuloNome: "Nome da debutante",
    usaIdade: false,
    exemploNome: "Isabela",
    subtitulo: () => "convida para a celebração dos seus 15 anos",
    mensagemPadrao: "Quinze anos de sonhos e alegrias. Quero dividir essa noite mágica com você!",
  },
  cha: {
    nome: "Chá de bebê",
    titulo: "Chá de bebê",
    rotuloNome: "Nome do bebê ou dos pais",
    usaIdade: false,
    exemploNome: "Baby Lucas",
    subtitulo: () => "vem aí! Venha celebrar com a gente",
    mensagemPadrao: "Estamos ansiosos pela chegada do nosso pequeno. Venha compartilhar esse momento de carinho conosco!",
  },
  formatura: {
    nome: "Formatura",
    titulo: "Convite de formatura",
    rotuloNome: "Nome do formando",
    usaIdade: false,
    exemploNome: "Rafael Souza",
    subtitulo: () => "convida para a sua formatura",
    mensagemPadrao: "Depois de muito estudo e dedicação, chegou o dia de celebrar essa conquista. Conto com a sua presença!",
  },
};

/* Modelos: criados só com cores e formas desenhadas por código,
   então não usam nenhuma imagem de terceiros (sem direitos autorais). */
const MODELOS = [
  { id: "aniv-festa", categoria: "aniversario", nome: "Festa Dourada", fundo: ["#fbf7ef", "#f0e4cf"], texto: "#2b2622", destaque: "#b08d57", moldura: "dupla", fonte: "script", plano: "essencial" },
  { id: "aniv-confete", categoria: "aniversario", nome: "Confete Suave", fundo: ["#fff8f1", "#f7e3d6"], texto: "#3a2a26", destaque: "#c0775a", moldura: "pontos", fonte: "serif", plano: "essencial" },
  { id: "cas-classico", categoria: "casamento", nome: "Clássico Marfim", fundo: ["#fdfbf6", "#efe6d6"], texto: "#2b2622", destaque: "#a8854e", moldura: "arco", fonte: "script", plano: "premium" },
  { id: "cas-noite", categoria: "casamento", nome: "Noite Elegante", fundo: ["#26211e", "#14110f"], texto: "#f4ece0", destaque: "#d4b06a", moldura: "dupla", fonte: "script", plano: "premium" },
  { id: "q15-rose", categoria: "quinze", nome: "Rosé Delicado", fundo: ["#fcf3ee", "#f2d9d0"], texto: "#3b2a2a", destaque: "#b4756b", moldura: "arco", fonte: "script", plano: "premium" },
  { id: "q15-champanhe", categoria: "quinze", nome: "Champanhe", fundo: ["#faf4e8", "#eadcc0"], texto: "#2b2622", destaque: "#9c7a3c", moldura: "cantos", fonte: "serif", plano: "essencial" },
  { id: "cha-nuvem", categoria: "cha", nome: "Céu de Algodão", fundo: ["#f6f8f6", "#e3eae3"], texto: "#2f3a33", destaque: "#7f9a86", moldura: "pontos", fonte: "script", plano: "essencial" },
  { id: "cha-areia", categoria: "cha", nome: "Areia Neutra", fundo: ["#faf5ec", "#eee2cd"], texto: "#3a322a", destaque: "#a98b5f", moldura: "simples", fonte: "serif", plano: "essencial" },
  { id: "form-gala", categoria: "formatura", nome: "Gala Preta", fundo: ["#1f1c1a", "#0f0d0c"], texto: "#f4ece0", destaque: "#c9a45c", moldura: "cantos", fonte: "serif", plano: "premium" },
  { id: "form-clara", categoria: "formatura", nome: "Honra Clara", fundo: ["#fbf8f2", "#ece2d0"], texto: "#2a2521", destaque: "#8a6d3b", moldura: "dupla", fonte: "serif", plano: "essencial" },
];

function dadosExemplo(modelo) {
  const c = CATEGORIAS[modelo.categoria];
  return {
    nome: c.exemploNome,
    idade: c.exemploIdade || "",
    data: "2027-03-20",
    hora: "18:00",
    endereco: "Rua das Flores, 123 - Centro",
    mensagem: c.mensagemPadrao,
  };
}

function formatarData(iso) {
  if (!iso) return "";
  const [a, m, d] = iso.split("-").map(Number);
  if (!a || !m || !d) return "";
  const dt = new Date(Date.UTC(a, m - 1, d));
  const s = dt.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatarHora(hora) {
  if (!hora) return "";
  const [h, m] = hora.split(":");
  return "às " + Number(h) + "h" + (m && m !== "00" ? m : "");
}

/* ---------- ferramentas de desenho ---------- */

function quebrarTexto(ctx, texto, larguraMax) {
  const palavras = texto.split(/\s+/).filter(Boolean);
  const linhas = [];
  let atual = "";
  for (const p of palavras) {
    const teste = atual ? atual + " " + p : p;
    if (ctx.measureText(teste).width > larguraMax && atual) {
      linhas.push(atual);
      atual = p;
    } else {
      atual = teste;
    }
  }
  if (atual) linhas.push(atual);
  return linhas;
}

function ajustarFonte(ctx, texto, familia, tamanhoMax, larguraMax, estilo) {
  let t = tamanhoMax;
  while (t > 30) {
    ctx.font = `${estilo || ""} ${t}px ${familia}`.trim();
    if (ctx.measureText(texto).width <= larguraMax) break;
    t -= 2;
  }
  return t;
}

function espaco(ctx, valor) {
  if ("letterSpacing" in ctx) ctx.letterSpacing = valor;
}

function ornamento(ctx, cx, y, cor) {
  ctx.save();
  ctx.strokeStyle = cor;
  ctx.fillStyle = cor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - 170, y);
  ctx.lineTo(cx - 24, y);
  ctx.moveTo(cx + 24, y);
  ctx.lineTo(cx + 170, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, y - 10);
  ctx.lineTo(cx + 10, y);
  ctx.lineTo(cx, y + 10);
  ctx.lineTo(cx - 10, y);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function desenharMoldura(ctx, W, H, m) {
  ctx.save();
  ctx.strokeStyle = m.destaque;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  if (m.moldura === "dupla") {
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 50, W - 100, H - 100);
    ctx.lineWidth = 1.5;
    ctx.strokeRect(74, 74, W - 148, H - 148);
  } else if (m.moldura === "simples") {
    ctx.lineWidth = 3;
    ctx.strokeRect(60, 60, W - 120, H - 120);
  } else if (m.moldura === "pontos") {
    ctx.lineWidth = 6;
    ctx.setLineDash([1, 16]);
    ctx.strokeRect(58, 58, W - 116, H - 116);
  } else if (m.moldura === "cantos") {
    ctx.lineWidth = 5;
    const o = 60, c = 130;
    const cantos = [
      [o, o, 1, 1],
      [W - o, o, -1, 1],
      [o, H - o, 1, -1],
      [W - o, H - o, -1, -1],
    ];
    for (const [x, y, dx, dy] of cantos) {
      ctx.beginPath();
      ctx.moveTo(x + dx * c, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + dy * c);
      ctx.stroke();
    }
  } else if (m.moldura === "arco") {
    ctx.lineWidth = 4;
    const raio = W / 2 - 90;
    ctx.beginPath();
    ctx.moveTo(90, H - 80);
    ctx.lineTo(90, 520);
    ctx.arc(W / 2, 520, raio, Math.PI, 0, false);
    ctx.lineTo(W - 90, H - 80);
    ctx.closePath();
    ctx.stroke();
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(112, H - 102);
    ctx.lineTo(112, 520);
    ctx.arc(W / 2, 520, raio - 22, Math.PI, 0, false);
    ctx.lineTo(W - 112, H - 102);
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();
}

/* ---------- o desenho principal ---------- */

function desenharConvite(canvas, modelo, dados, opcoes) {
  opcoes = opcoes || {};
  const W = 1080, H = 1350;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  const cat = CATEGORIAS[modelo.categoria];
  const cx = W / 2;

  // fundo
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, modelo.fundo[0]);
  g.addColorStop(1, modelo.fundo[1]);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  desenharMoldura(ctx, W, H, modelo);

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  let y = modelo.moldura === "arco" ? 250 : 210;

  // rótulo no topo
  ctx.fillStyle = modelo.destaque;
  ctx.font = `600 28px ${FONTE_SANS}`;
  espaco(ctx, "6px");
  ctx.fillText(cat.titulo.toUpperCase(), cx, y);
  espaco(ctx, "0px");

  // nome
  const nome = dados.nome || cat.exemploNome;
  const familia = modelo.fonte === "script" ? FONTE_SCRIPT : FONTE_SERIF;
  const tamanho = ajustarFonte(ctx, nome, familia, modelo.fonte === "script" ? 150 : 100, 740, modelo.fonte === "script" ? "" : "700");
  y += 40 + tamanho;
  ctx.fillStyle = modelo.texto;
  ctx.fillText(nome, cx, y);

  // subtítulo
  ctx.font = `italic 500 38px ${FONTE_SERIF}`;
  ctx.fillStyle = modelo.texto;
  y += 30;
  const sub = cat.subtitulo(dados);
  for (const linha of quebrarTexto(ctx, sub, 700)) {
    y += 52;
    ctx.fillText(linha, cx, y);
  }

  // mensagem
  y += 50;
  ornamento(ctx, cx, y, modelo.destaque);
  if (dados.mensagem) {
    ctx.font = `italic 500 34px ${FONTE_SERIF}`;
    ctx.fillStyle = modelo.texto;
    y += 30;
    for (const linha of quebrarTexto(ctx, dados.mensagem, 680).slice(0, 6)) {
      y += 50;
      ctx.fillText(linha, cx, y);
    }
    y += 40;
    ornamento(ctx, cx, y, modelo.destaque);
  }

  // data, hora, endereço
  const dataTxt = formatarData(dados.data);
  const horaTxt = formatarHora(dados.hora);
  if (dataTxt) {
    ctx.font = `700 40px ${FONTE_SERIF}`;
    ctx.fillStyle = modelo.destaque;
    y += 80;
    for (const linha of quebrarTexto(ctx, dataTxt, 760)) {
      ctx.fillText(linha, cx, y);
      y += 50;
    }
    y -= 50;
  }
  if (horaTxt) {
    ctx.font = `500 36px ${FONTE_SERIF}`;
    ctx.fillStyle = modelo.texto;
    y += 55;
    ctx.fillText(horaTxt, cx, y);
  }
  if (dados.endereco) {
    ctx.font = `400 30px ${FONTE_SANS}`;
    ctx.fillStyle = modelo.texto;
    y += 30;
    for (const linha of quebrarTexto(ctx, dados.endereco, 720).slice(0, 3)) {
      y += 44;
      ctx.fillText(linha, cx, y);
    }
  }

  // marca d'água (enquanto o pagamento não existe)
  if (opcoes.marca) {
    ctx.save();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = modelo.destaque;
    ctx.font = `600 22px ${FONTE_SANS}`;
    espaco(ctx, "3px");
    ctx.fillText("CONVITEX • DEMONSTRAÇÃO", cx, H - 105);
    ctx.restore();
  }
}

/* Redesenha depois que as fontes do Google terminarem de carregar. */
function aguardarFontes(callback) {
  if (!document.fonts || !document.fonts.load) return;
  Promise.all([
    document.fonts.load('80px "Great Vibes"'),
    document.fonts.load('700 40px "Playfair Display"'),
    document.fonts.load('italic 500 34px "Playfair Display"'),
    document.fonts.load('600 28px Inter'),
  ]).then(callback).catch(function () {});
}
