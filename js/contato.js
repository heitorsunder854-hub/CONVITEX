/* =====================================================
   contato.js — formulário de contato sem servidor.
   Ao enviar, abre o app de e-mail do visitante com a
   mensagem pronta (mailto:). Nenhum dado é guardado.
   ===================================================== */

(function () {
  var form = document.getElementById("formContato");
  if (!form) return;
  var status = document.getElementById("statusContato");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nome = form.nome.value.trim();
    var email = form.email.value.trim();
    var assunto = form.assunto.value;
    var msg = form.mensagem.value.trim();
    if (!nome || !email || !msg) {
      status.textContent = "Preencha nome, e-mail e mensagem.";
      return;
    }
    var corpo = "Nome: " + nome + "\nE-mail: " + email + "\n\n" + msg;
    var link =
      "mailto:" + CONFIG.emailContato +
      "?subject=" + encodeURIComponent("[ConviteX] " + assunto) +
      "&body=" + encodeURIComponent(corpo);
    status.textContent = "Abrindo seu app de e-mail com a mensagem pronta. Basta apertar em enviar.";
    window.location.href = link;
  });
})();
