/* =====================================================
   galeria.js — monta os cartões de modelos.
   - Na página "modelos.html": grade com filtros.
   - Na página inicial: alguns destaques.
   ===================================================== */

(function () {
  var desenhos = [];

  function criarCard(m) {
    var cat = CATEGORIAS[m.categoria];
    var a = document.createElement("a");
    a.className = "card-modelo";
    a.href = "editor.html?modelo=" + m.id;
    a.setAttribute("aria-label", "Personalizar o modelo " + m.nome);
    a.innerHTML =
      '<div class="miniatura"><canvas></canvas></div>' +
      '<div class="card-info"><div><strong>' + m.nome + "</strong><span>" + cat.nome +
      '</span></div><em class="preco">R$ ' + CONFIG.precos[m.plano] + "</em></div>";
    var canvas = a.querySelector("canvas");
    var d = dadosExemplo(m);
    desenhos.push(function () { desenharConvite(canvas, m, d); });
    desenharConvite(canvas, m, d);
    return a;
  }

  function mostrar(container, lista) {
    container.innerHTML = "";
    desenhos = [];
    lista.forEach(function (m) { container.appendChild(criarCard(m)); });
  }

  var grade = document.getElementById("grade");
  var destaques = document.getElementById("destaques");

  if (grade) {
    var params = new URLSearchParams(location.search);
    var filtro = params.get("cat") || "todas";
    var botoes = document.querySelectorAll("[data-filtro]");

    function aplicar() {
      var lista = filtro === "todas" ? MODELOS : MODELOS.filter(function (m) { return m.categoria === filtro; });
      mostrar(grade, lista);
      botoes.forEach(function (b) {
        b.classList.toggle("ativo", b.getAttribute("data-filtro") === filtro);
      });
    }

    botoes.forEach(function (b) {
      b.addEventListener("click", function () {
        filtro = b.getAttribute("data-filtro");
        aplicar();
      });
    });
    aplicar();
  }

  if (destaques) {
    var ids = ["cas-classico", "aniv-festa", "q15-rose", "form-gala"];
    mostrar(destaques, ids.map(function (id) { return MODELOS.find(function (m) { return m.id === id; }); }));
  }

  aguardarFontes(function () { desenhos.forEach(function (f) { f(); }); });
})();
