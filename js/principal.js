/* =====================================================
   principal.js — comportamento comum a todas as páginas:
   menu no celular, link ativo, animações ao rolar,
   ano do rodapé e e-mail de contato.
   ===================================================== */

(function () {
  var btn = document.getElementById("menuBtn");
  var menu = document.getElementById("menu");
  if (btn && menu) {
    btn.addEventListener("click", function () {
      var aberto = menu.classList.toggle("aberto");
      btn.setAttribute("aria-expanded", aberto ? "true" : "false");
    });
  }

  var atual = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a:not(.btn)").forEach(function (a) {
    var h = a.getAttribute("href");
    if (h === atual || (atual === "editor.html" && h === "modelos.html")) {
      a.setAttribute("aria-current", "page");
    }
  });

  var els = document.querySelectorAll(".revelar");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("visivel");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("visivel"); });
  }

  document.querySelectorAll("[data-ano]").forEach(function (e) {
    e.textContent = new Date().getFullYear();
  });

  document.querySelectorAll("[data-email]").forEach(function (e) {
    e.textContent = CONFIG.emailContato;
    e.href = "mailto:" + CONFIG.emailContato;
  });

  document.querySelectorAll("[data-preco]").forEach(function (e) {
    e.textContent = "R$ " + CONFIG.precos[e.getAttribute("data-preco")];
  });
})();
