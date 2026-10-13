/* =========================================================
   AIR CLEAN — scripts do site
   Tudo que você costuma editar está no bloco CONFIG abaixo.
   ========================================================= */
(function () {
  "use strict";

  /* ---------------- CONFIG ---------------- */
  var WHATSAPP = "5511986206439";
  var BASE = "Olá, vim pelo site da Air Clean e gostaria de ";

  // Mensagens automáticas de cada botão (atributo data-wa="chave" no HTML)
  var MENSAGENS = {
    geral: BASE + "solicitar um orçamento.",
    instalacao: BASE + "solicitar um orçamento para instalação de ar-condicionado.",
    higienizacao: BASE + "solicitar um orçamento para higienização e limpeza de ar-condicionado.",
    preventiva: BASE + "solicitar um orçamento para manutenção preventiva de ar-condicionado.",
    corretiva: BASE + "solicitar um orçamento para manutenção corretiva do meu ar-condicionado.",
    pmoc: BASE + "solicitar informações e um orçamento sobre PMOC.",
    residencial: BASE + "solicitar um orçamento para atendimento residencial.",
    comercial: BASE + "solicitar um orçamento para atendimento comercial.",
    especialista: BASE + "falar com um especialista sobre o meu ar-condicionado.",
    duvida: BASE + "tirar uma dúvida.",
    avaliacao: "Olá, já fui atendido pela Air Clean e gostaria de enviar uma avaliação."
  };


  /* ---------------- utilidades ---------------- */
  function waLink(texto) {
    return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto);
  }
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  document.documentElement.classList.add("js");

  /* ---------------- links de WhatsApp ---------------- */
  $$("[data-wa]").forEach(function (a) {
    var msg = MENSAGENS[a.getAttribute("data-wa")] || MENSAGENS.geral;
    a.setAttribute("href", waLink(msg));
  });

  /* ---------------- cabeçalho e botão flutuante ---------------- */
  var header = $(".site-header");
  var floatBtn = $("#wa-float");
  var hero = $("#inicio");
  var finalSec = $("#orcamento");
  var heroOut = false, finalIn = false;
  function updateFloat() { if (floatBtn) floatBtn.classList.toggle("is-hidden", !heroOut || finalIn); }
  window.addEventListener("scroll", function () {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e) { heroOut = !e[0].isIntersecting; updateFloat(); }, { rootMargin: "-40% 0px 0px 0px" }).observe(hero);
    new IntersectionObserver(function (e) { finalIn = e[0].isIntersecting; updateFloat(); }, { threshold: 0.25 }).observe(finalSec);
  } else if (floatBtn) {
    floatBtn.classList.remove("is-hidden");
  }

  /* ---------------- menu mobile ---------------- */
  var menu = $("#menu-mobile");
  var openBtn = $(".header-cta .menu-toggle");
  function setMenu(open) {
    menu.hidden = !open;
    openBtn.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
    if (open) { var f = $("a", menu); if (f) f.focus(); } else { openBtn.focus({ preventScroll: true }); }
  }
  openBtn.addEventListener("click", function () { setMenu(true); });
  $("[data-close-menu]", menu).addEventListener("click", function () { setMenu(false); });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) setMenu(false); });

  /* ---------------- revelação na rolagem ---------------- */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------------- brilho que segue o cursor ---------------- */
  $$("[data-glow], .btn-primary").forEach(function (el) {
    el.addEventListener("pointermove", function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (e.clientX - r.left) + "px");
      el.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });

  /* ---------------- galeria: filtros + ampliação ---------------- */
  var gal = $("#gallery"), moreBtn = $("#gallery-more"), expanded = false;
  moreBtn.addEventListener("click", function () { expanded = true; gal.classList.add("show-all"); moreBtn.parentElement.hidden = true; });
  var chips = $$(".chip");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var f = chip.getAttribute("data-filter");
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
      $$(".work").forEach(function (w) { w.hidden = !(f === "todos" || w.getAttribute("data-cat") === f); });
      gal.classList.toggle("show-all", f !== "todos" || expanded);
      moreBtn.parentElement.hidden = f !== "todos" || expanded;
    });
  });
  var lb = $("#lightbox");
  if (lb && typeof lb.showModal === "function") {
    $$(".work button").forEach(function (b) {
      b.addEventListener("click", function () {
        var img = $("img", b);
        $("img", lb).src = img.currentSrc || img.src;
        $("img", lb).alt = img.alt;
        $("p", lb).textContent = img.alt;
        lb.showModal();
      });
    });
    $(".lightbox-close", lb).addEventListener("click", function () { lb.close(); });
    lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
  }

  /* ---------------- formulário → WhatsApp ----------------
     O botão "Enviar" é um link de verdade para o WhatsApp. O endereço do link
     é atualizado a cada campo preenchido, então o clique abre a conversa
     em qualquer navegador, inclusive no celular, sem depender de pop-up. */
  var form = $("#quote-form");
  var sendBtn = $("#form-send");
  var campos = { nome: $("#f-nome"), servico: $("#f-servico"), tipo: $("#f-tipo"), local: $("#f-local"), msg: $("#f-msg") };

  function montarMensagem() {
    var linhas = [
      "Olá, vim pelo site da Air Clean e gostaria de solicitar um orçamento.",
      "",
      "Nome: " + campos.nome.value.trim(),
      "Serviço: " + (campos.servico.value || "a definir"),
      "Imóvel: " + campos.tipo.value,
      "Local: " + campos.local.value.trim()
    ];
    var det = campos.msg.value.trim();
    if (det) linhas.push("Detalhes: " + det);
    return linhas.join("\n");
  }
  function atualizarLink() { sendBtn.href = waLink(montarMensagem()); }
  function validar() {
    var faltando = [];
    [[campos.nome, "seu nome"], [campos.servico, "o serviço"], [campos.local, "a cidade e o bairro"]].forEach(function (p) {
      var vazio = !p[0].value.trim();
      p[0].setAttribute("aria-invalid", String(vazio));
      if (vazio) faltando.push(p[1]);
    });
    var err = $("#form-error");
    if (faltando.length) {
      err.textContent = "Preencha " + faltando.join(", ").replace(/, ([^,]*)$/, " e $1") + " para montar a mensagem.";
      ($("[aria-invalid='true']", form) || campos.nome).focus();
      return false;
    }
    err.textContent = "";
    return true;
  }
  form.addEventListener("input", function (e) {
    if (e.target.getAttribute("aria-invalid") === "true" && e.target.value.trim()) e.target.setAttribute("aria-invalid", "false");
    atualizarLink();
  });
  form.addEventListener("change", atualizarLink);
  sendBtn.addEventListener("click", function (e) {
    atualizarLink();
    if (!validar()) e.preventDefault();
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validar()) { atualizarLink(); sendBtn.click(); }
  });
  atualizarLink();

  var ano = $("#ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();
