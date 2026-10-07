/* Sprachumschalter EN/DE, Bildbetrachter, Kopier-Knoepfe. Kein Tracking, keine Cookies, keine Fremdanfragen. */
(function () {
  "use strict";
  var KEY = "stickshot_site_lang";

  function safeGet() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function safeSet(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-de]"));
  nodes.forEach(function (n) { n.setAttribute("data-en", n.innerHTML); });
  var meta = document.querySelector('meta[name="description"]');
  var metaEn = meta ? meta.content : "";

  function setLang(l) {
    nodes.forEach(function (n) { n.innerHTML = n.getAttribute(l === "de" ? "data-de" : "data-en"); });
    document.documentElement.lang = l;
    if (meta && meta.dataset.de) meta.content = l === "de" ? meta.dataset.de : metaEn;
    var t = document.documentElement.dataset["title" + (l === "de" ? "De" : "En")];
    if (t) document.title = t;
    Array.prototype.forEach.call(document.querySelectorAll(".lang button"), function (b) {
      b.setAttribute("aria-pressed", b.dataset.l === l ? "true" : "false");
    });
    safeSet(l);
  }

  var start = safeGet();
  if (start !== "de" && start !== "en") start = (navigator.language || "en").toLowerCase().indexOf("de") === 0 ? "de" : "en";
  if (document.documentElement.dataset.titleEn === undefined) document.documentElement.dataset.titleEn = document.title;
  Array.prototype.forEach.call(document.querySelectorAll(".lang button"), function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.l); });
  });
  if (nodes.length) setLang(start);

  /* Bildbetrachter */
  var lb = document.getElementById("lb");
  if (lb) {
    var shots = Array.prototype.slice.call(document.querySelectorAll(".shot"));
    var img = lb.querySelector("img"), cur = 0;
    var show = function (i) {
      cur = (i + shots.length) % shots.length;
      img.src = shots[cur].dataset.full;
      img.alt = shots[cur].querySelector("img").alt;
    };
    shots.forEach(function (s, i) {
      s.addEventListener("click", function () { show(i); if (lb.showModal) lb.showModal(); else lb.setAttribute("open", ""); });
    });
    lb.querySelector(".x").addEventListener("click", function () { lb.close(); });
    lb.querySelector(".nv:not(.r)").addEventListener("click", function () { show(cur - 1); });
    lb.querySelector(".nv.r").addEventListener("click", function () { show(cur + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.open) return;
      if (e.key === "ArrowLeft") show(cur - 1);
      if (e.key === "ArrowRight") show(cur + 1);
    });
  }

  /* Text kopieren (Presskit) */
  Array.prototype.forEach.call(document.querySelectorAll("[data-copy]"), function (b) {
    b.addEventListener("click", function () {
      var src = document.getElementById(b.dataset.copy);
      var txt = Array.prototype.map.call(src.querySelectorAll("p"), function (p) { return p.textContent.trim(); }).join("\n\n");
      var done = function () {
        var o = b.innerHTML; b.textContent = document.documentElement.lang === "de" ? "KOPIERT" : "COPIED";
        setTimeout(function () { b.innerHTML = o; }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, done);
      else done();
    });
  });
})();
