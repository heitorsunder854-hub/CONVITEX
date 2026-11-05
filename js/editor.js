/* =====================================================
   editor.js — personalização em tempo real e download PNG.
   ===================================================== */

(function () {
  var canvas = document.getElementById("previa");
  var selModelo = document.getElementById("modelo");
  var campos = {
    nome: document.getElementById("nome"),
    idade: document.getElementById("idade"),
    data: document.getElementById("data"),
    hora: document.getElementById("hora"),
    endereco: document.getElementById("endereco"),
    mensagem: document.getElementById("mensagem"),
  };
  var rotuloNome = document.getElementById("rotuloNome");
  var blocoIdade = document.getElementById("blocoIdade");
  var status = document.getElementById("status");
  var aviso = document.getElementById("avisoPagamento");

  var params = new URLSearchParams(location.search);
  var modelo = MODELOS.find(function (m) { return m.id === params.get("modelo"); }) || MODELOS[0];
  var exemplo = dadosExemplo(modelo);

  // lista de modelos agrupada por categoria
  Object.keys(CATEGORIAS).forEach(function (chave) {
    var grupo = document.createElement("optgroup");
    grupo.label = CATEGORIAS[chave].nome;
    MODELOS.filter(function (m) { return m.categoria === chave; }).forEach(function (m) {
      var o = document.createElement("option");
      o.value = m.id;
      o.textContent = m.nome + " — R$ " + CONFIG.precos[m.plano];
      grupo.appendChild(o);
    });
    selModelo.appendChild(grupo);
  });
  selModelo.value = modelo.id;

  function preencher(dados) {
    Object.keys(campos).forEach(function (k) { campos[k].value = dados[k] || ""; });
  }

  function ajustarCategoria() {
    var cat = CATEGORIAS[modelo.categoria];
    rotuloNome.textContent = cat.rotuloNome;
    blocoIdade.hidden = !cat.usaIdade;
  }

  function ler() {
    return {
      nome: campos.nome.value.trim(),
      idade: campos.idade.value.trim(),
      data: campos.data.value,
      hora: campos.hora.value,
      endereco: campos.endereco.value.trim(),
      mensagem: campos.mensagem.value.trim(),
    };
  }

  function desenhar() {
    desenharConvite(canvas, modelo, ler(), { marca: !CONFIG.pagamentoAtivo });
  }

  Object.keys(campos).forEach(function (k) {
    campos[k].addEventListener("input", desenhar);
  });

  selModelo.addEventListener("change", function () {
    var novo = MODELOS.find(function (m) { return m.id === selModelo.value; });
    var exemploNovo = dadosExemplo(novo);
    // troca só os campos que ainda estão com o texto de exemplo
    Object.keys(campos).forEach(function (k) {
      if (campos[k].value === (exemplo[k] || "")) campos[k].value = exemploNovo[k] || "";
    });
    modelo = novo;
    exemplo = exemploNovo;
    ajustarCategoria();
    desenhar();
  });

  document.getElementById("limpar").addEventListener("click", function () {
    Object.keys(campos).forEach(function (k) { campos[k].value = ""; });
    desenhar();
    campos.nome.focus();
  });

  document.getElementById("baixar").addEventListener("click", function () {
    if (CONFIG.pagamentoAtivo) {
      // Segurança: a cobrança real ainda não foi construída.
      // Nada é liberado como "pago" por aqui.
      status.textContent = "A cobrança ainda não foi configurada. Não é possível liberar o download pago.";
      return;
    }
    desenhar();
    canvas.toBlob(function (blob) {
      if (!blob) {
        status.textContent = "Não foi possível gerar a imagem. Tente de novo.";
        return;
      }
      var base = (campos.nome.value || "convite").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "convite";
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "convitex-" + base + ".png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
      status.textContent = "PNG de demonstração baixado. Confira a pasta de downloads.";
    }, "image/png");
  });

  if (aviso) aviso.hidden = CONFIG.pagamentoAtivo;

  preencher(exemplo);
  ajustarCategoria();
  desenhar();
  aguardarFontes(desenhar);
})();
