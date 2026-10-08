/* =========================================================
   PEGOU COMEU — interações
   ========================================================= */
(function () {
  const L = window.LOJA || {};
  const O = window.OFERTAS || { itens: [] };
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---------- Preenche dados da loja ---------- */
  const whatsLink = (msg) =>
    `https://wa.me/${L.whatsapp}${msg ? "?text=" + encodeURIComponent(msg) : ""}`;

  $$("[data-cfg]").forEach((el) => {
    const k = el.dataset.cfg;
    if (k === "endereco") el.textContent = L.endereco + (L.cep ? " · CEP " + L.cep : "");
    if (k === "telefone") el.textContent = L.telefoneExibicao;
    if (k === "instagramUser") el.textContent = L.instagramUser;
    if (k === "horarios") {
      el.innerHTML = (L.horarios || [])
        .map((h) => `<div class="hours-line"><span>${h.dias}</span><span>${h.horas}</span></div>`)
        .join("");
    }
    if (k === "horarioCurto" && L.horarios && L.horarios[0]) el.textContent = L.horarios[0].horas;
  });
  $$("[data-link]").forEach((el) => {
    const k = el.dataset.link;
    if (k === "whats") el.href = whatsLink(el.dataset.msg || "Olá, Pegou Comeu! Vim pelo site.");
    if (k === "maps") el.href = L.mapsLink;
    if (k === "instagram") el.href = L.instagram;
    el.target = "_blank";
    el.rel = "noopener";
  });
  $$("[data-ano]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Header ---------- */
  const header = $(".site-header");
  const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = $(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open);
    });
    $$(".nav-links a").forEach((a) =>
      a.addEventListener("click", () => document.body.classList.remove("nav-open"))
    );
  }

  /* ---------- Ofertas ---------- */
  const brl = (v) => v.toFixed(2).replace(".", ",");
  const offerCard = (p, i) => {
    const leve = p.leve > 1 ? p.leve : 0;
    const off = p.de > p.por ? Math.round((1 - p.por / p.de) * 100) : 0;
    const [int, cent] = brl(p.por).split(",");
    const media = p.imagem
      ? `<button class="offer-zoom" type="button" data-zoom="${p.imagem}" data-cap="${p.nome}" aria-label="Ampliar arte: ${p.nome}"><img src="${p.imagem}" alt="Arte da oferta: ${p.nome}" loading="lazy"></button>`
      : `<span class="emoji" aria-hidden="true">${p.emoji || "🛒"}</span>`;
    const precoTxt = `${leve ? leve + " por " : ""}R$ ${brl(p.por)}`;
    const msg = `Olá, Pegou Comeu! Quero reservar: ${p.nome} — ${precoTxt}`;
    return `
      <article class="offer fade-in${p.imagem ? " has-art" : ""}" style="animation-delay:${Math.min(i, 12) * 50}ms">
        <div class="offer-media">
          ${off ? `<span class="offer-off">-${off}%</span>` : ""}
          ${leve && !p.imagem ? `<span class="offer-off">Leve ${leve}</span>` : ""}
          ${media}
        </div>
        <div class="offer-cat">${p.categoria}</div>
        <h3 class="offer-name">${p.nome}</h3>
        <div class="offer-prices">
          ${p.de > p.por ? `<span class="offer-old">R$ ${brl(p.de)}</span>` : ""}
          ${leve ? `<span class="offer-qty">${leve} por</span>` : ""}
          <span class="offer-new"><sup>R$</sup>${int},${cent}</span>
          ${p.unidade ? `<span class="offer-unit">/${p.unidade}</span>` : ""}
        </div>
        <a class="offer-reserve" href="https://wa.me/${L.whatsapp}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener"><span>Reservar<span class="long"> no WhatsApp</span></span></a>
      </article>`;
  };

  // validade
  const fmtData = (iso) => {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("pt-BR", { day: "2-digit", month: "long" });
  };
  $$("[data-validade]").forEach((el) => {
    if (!O.validade) { el.textContent = el.dataset.semData || "Válidas enquanto durarem os estoques"; return; }
    const [y, m, d] = O.validade.split("-").map(Number);
    const fim = new Date(y, m - 1, d, 23, 59, 59);
    const dias = Math.ceil((fim - new Date()) / 86400000);
    let txt = `Ofertas válidas até ${fmtData(O.validade)}`;
    if (dias === 1) txt += " · último dia!";
    else if (dias > 1 && dias <= 7) txt += ` · faltam ${dias} dias`;
    el.textContent = txt;
  });

  // home: destaques
  const destaques = $("#ofertas-destaque");
  if (destaques) {
    const itens = O.itens.filter((p) => p.destaque);
    destaques.innerHTML = (itens.length ? itens : O.itens.slice(0, 4)).map(offerCard).join("");
  }

  // página de ofertas: todos + filtros
  const grid = $("#ofertas-todas");
  if (grid) {
    const filtros = $("#filtros");
    const cats = ["Todas", ...new Set(O.itens.map((p) => p.categoria))];
    filtros.innerHTML = cats
      .map((c, i) => `<button class="chip" type="button" aria-pressed="${i === 0}" data-cat="${c}">${c}</button>`)
      .join("");
    const render = (cat) => {
      const lista = cat === "Todas" ? O.itens : O.itens.filter((p) => p.categoria === cat);
      grid.innerHTML = lista.map(offerCard).join("");
    };
    filtros.addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      $$(".chip", filtros).forEach((c) => c.setAttribute("aria-pressed", c === b));
      render(b.dataset.cat);
    });
    // permite abrir já filtrado: ofertas.html#Hortifrúti
    const hash = decodeURIComponent(location.hash.slice(1));
    const inicial = cats.includes(hash) ? hash : "Todas";
    $$(".chip", filtros).forEach((c) => c.setAttribute("aria-pressed", c.dataset.cat === inicial));
    render(inicial);
  }

  /* ---------- Faixa animada: duplica conteúdo para loop contínuo ---------- */
  $$(".ticker-track").forEach((t) => (t.innerHTML += t.innerHTML));

  /* ---------- Revelar ao rolar ---------- */
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal, .hl, .timeline li").forEach((el) => io.observe(el));
  // atraso em cascata para grupos
  $$("[data-stagger]").forEach((g) =>
    [...g.children].forEach((c, i) => {
      c.classList.add("reveal");
      c.style.setProperty("--d", `${i * 0.08}s`);
      io.observe(c);
    })
  );

  /* ---------- Linha do tempo: barra acompanha o scroll ---------- */
  const tl = $(".timeline");
  if (tl) {
    const upd = () => {
      const r = tl.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.7 - r.top) / r.height));
      tl.style.setProperty("--progress", p.toFixed(3));
    };
    upd();
    window.addEventListener("scroll", upd, { passive: true });
  }
})();

/* ---------- Etiqueta do hero: mostra a 1ª oferta em destaque ---------- */
(function () {
  const el = document.querySelector("[data-sticker-oferta]");
  const O = window.OFERTAS;
  if (!el || !O || !O.itens.length) return;
  const p = O.itens.find((i) => i.destaque) || O.itens[0];
  const nomeCurto = p.curto || p.nome.split(" ").slice(0, 3).join(" ");
  el.innerHTML = `<small>${nomeCurto}</small><span class="price">${p.leve > 1 ? p.leve + " por " : ""}R$ ${p.por.toFixed(2).replace(".", ",")}</span>`;
})();

/* ---------- Ampliar fotos (galeria da loja e artes das ofertas) ---------- */
(function () {
  if (typeof HTMLDialogElement !== "function") return;
  let lb = document.querySelector(".lightbox");
  if (!lb) {
    lb = document.createElement("dialog");
    lb.className = "lightbox";
    lb.setAttribute("aria-label", "Imagem ampliada");
    lb.innerHTML = `<button class="lb-close" type="button" aria-label="Fechar">×</button>
      <button class="lb-nav lb-prev" type="button" aria-label="Anterior">‹</button>
      <figure><img alt=""><figcaption></figcaption></figure>
      <button class="lb-nav lb-next" type="button" aria-label="Próxima">›</button>`;
    document.body.appendChild(lb);
  }
  const img = lb.querySelector("img"), cap = lb.querySelector("figcaption");
  let itens = [], i = 0;
  const coletar = (el) => {
    const grupo = el.closest(".gallery") ? ".gallery figure" : "[data-zoom]";
    return [...document.querySelectorAll(grupo)].map((x) => {
      const im = x.querySelector("img");
      return {
        src: x.dataset.zoom || im.src,
        alt: im ? im.alt : "",
        cap: x.dataset.cap || x.querySelector("figcaption")?.textContent || ""
      };
    });
  };
  const show = (n) => {
    i = (n + itens.length) % itens.length;
    img.src = itens[i].src; img.alt = itens[i].alt; cap.textContent = itens[i].cap;
    lb.querySelectorAll(".lb-nav").forEach((b) => (b.hidden = itens.length < 2));
  };
  const abrir = (el) => {
    itens = coletar(el);
    const lista = el.closest(".gallery") ? [...document.querySelectorAll(".gallery figure")] : [...document.querySelectorAll("[data-zoom]")];
    show(lista.indexOf(el));
    lb.showModal();
  };
  document.querySelectorAll(".gallery figure").forEach((f) => (f.tabIndex = 0));
  document.addEventListener("click", (e) => {
    const el = e.target.closest(".gallery figure, [data-zoom]");
    if (el) abrir(el);
  });
  document.addEventListener("keydown", (e) => {
    const el = e.target.closest && e.target.closest(".gallery figure");
    if (el && e.key === "Enter") abrir(el);
  });
  lb.querySelector(".lb-close").onclick = () => lb.close();
  lb.querySelector(".lb-prev").onclick = () => show(i - 1);
  lb.querySelector(".lb-next").onclick = () => show(i + 1);
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(i - 1);
    if (e.key === "ArrowRight") show(i + 1);
  });
})();

/* ---------- Mascote: segue o mouse e pula ao clicar ---------- */
(function () {
  const wrap = document.querySelector(".mascot-wrap");
  const btn = document.querySelector(".mascot");
  if (!wrap || !btn) return;
  const calmo = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!calmo && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", (e) => {
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const y = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      wrap.style.setProperty("--ry", (x * 18).toFixed(2) + "deg");
      wrap.style.setProperty("--rx", (-y * 12).toFixed(2) + "deg");
    }, { passive: true });
  }
  btn.addEventListener("click", () => {
    if (calmo) return;
    btn.classList.remove("jump"); void btn.offsetWidth; btn.classList.add("jump");
  });
  btn.addEventListener("animationend", (e) => { if (e.animationName === "bigJump") btn.classList.remove("jump"); });
})();
