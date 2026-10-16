// CB Construction — shared site behavior
document.documentElement.classList.add("js");

// GA4: capture-phase tel: clicks for the business number
document.addEventListener("click", function (e) {
  var a = e.target.closest && e.target.closest('a[href^="tel:"]');
  if (!a) return;
  var href = (a.getAttribute("href") || "").replace(/[\s\-\(\)]/g, "").toLowerCase();
  if (href.indexOf("2053837177") === -1) return;
  if (typeof gtag === "function") {
    gtag("event", "tel_click", {
      link_url: a.getAttribute("href"),
      method: "tel_link"
    });
  }
}, true);

document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var header = document.querySelector(".site-header");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-mobile-open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Scroll reveal
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("visible"); });
  }

  var prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Generic rotator: cycles .active among children matching selector.
  // Autoplay is disabled for reduced-motion users and paused while hovered.
  function makeRotator(container, slideSelector, opts) {
    opts = opts || {};
    var slides = container ? Array.prototype.slice.call(container.querySelectorAll(slideSelector)) : [];
    if (slides.length < 2) return null;
    var idx = Math.max(0, slides.findIndex(function (s) { return s.classList.contains("active"); }));
    var autoMs = prefersReducedMotion ? 0 : opts.autoMs;
    function show(n) {
      slides[idx].classList.remove("active");
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add("active");
      if (opts.onChange) opts.onChange(idx, slides.length);
    }
    var timer = null;
    function stop() { clearInterval(timer); }
    function restart() {
      if (!autoMs) return;
      stop();
      timer = setInterval(function () { show(idx + 1); }, autoMs);
    }
    if (autoMs) {
      container.addEventListener("mouseenter", stop);
      container.addEventListener("mouseleave", restart);
    }
    restart();
    return {
      next: function () { show(idx + 1); restart(); },
      prev: function () { show(idx - 1); restart(); },
    };
  }

  // Hero slider (arrows + touch swipe)
  var heroEl = document.querySelector(".hero-slider");
  if (heroEl) {
    var hero = makeRotator(heroEl, ".hero-slide", { autoMs: 6000 });
    if (hero) {
      var prev = heroEl.querySelector(".slider-arrow--prev");
      var next = heroEl.querySelector(".slider-arrow--next");
      if (prev) prev.addEventListener("click", hero.prev);
      if (next) next.addEventListener("click", hero.next);
      var touchX = null;
      heroEl.addEventListener("touchstart", function (e) {
        touchX = e.touches[0].clientX;
      }, { passive: true });
      heroEl.addEventListener("touchend", function (e) {
        if (touchX === null) return;
        var dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 45) (dx < 0 ? hero.next : hero.prev)();
        touchX = null;
      }, { passive: true });
    }
  }

  // Testimonial rotator
  document.querySelectorAll("[data-quotes]").forEach(function (block) {
    makeRotator(block, ".quote-slide", { autoMs: 9000 });
  });

  // Galleries carousel (counter advances on click)
  document.querySelectorAll("[data-carousel]").forEach(function (car) {
    var counter = car.querySelector(".gal-counter-num");
    var rot = makeRotator(car, ".gal-slide", {
      autoMs: 7000,
      onChange: function (i, n) {
        if (counter) counter.textContent = String(i + 1).padStart(2, "0") + "/" + String(n).padStart(2, "0");
      },
    });
    var advance = car.querySelector(".gal-counter");
    if (advance && rot) advance.addEventListener("click", rot.next);
  });

  // ---- Lightbox for portfolio/gallery tiles ----
  function openOverlay(buildContent) {
    var backdrop = document.createElement("div");
    backdrop.className = "overlay-backdrop";
    backdrop.setAttribute("role", "dialog");
    backdrop.setAttribute("aria-modal", "true");

    var panel = document.createElement("div");
    panel.className = "overlay-panel";

    var close = document.createElement("button");
    close.className = "overlay-close";
    close.setAttribute("aria-label", "Close");
    close.innerHTML = "&times;";

    panel.appendChild(close);
    buildContent(panel);
    backdrop.appendChild(panel);
    document.body.appendChild(backdrop);

    function destroy() {
      document.body.removeChild(backdrop);
      document.removeEventListener("keydown", onKey);
    }
    function onKey(e) { if (e.key === "Escape") destroy(); }
    close.addEventListener("click", destroy);
    backdrop.addEventListener("click", function (e) { if (e.target === backdrop) destroy(); });
    document.addEventListener("keydown", onKey);
    close.focus();
  }

  document.querySelectorAll("[data-lightbox]").forEach(function (tile) {
    tile.addEventListener("click", function (e) {
      e.preventDefault();
      var img = tile.querySelector("img");
      var title = tile.querySelector(".tile-title, h3");
      if (!img) return;
      openOverlay(function (panel) {
        var big = document.createElement("img");
        big.src = img.currentSrc || img.getAttribute("src");
        big.alt = img.getAttribute("alt") || "";
        panel.appendChild(big);
        if (title) {
          var cap = document.createElement("div");
          cap.className = "overlay-caption caps";
          cap.textContent = title.textContent;
          panel.appendChild(cap);
        }
      });
    });
  });

  // ---- Demo form handler ----
  // Only binds form[data-demo-form] (journal newsletter on blog.html).
  // Contact posts to Formspree; do not preventDefault on forms without the attribute.
  document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var scope = form.parentElement || document;
      var msg = scope.querySelector(".form-success") || document.querySelector(".form-success");
      if (msg) {
        // Honest preview note: drop data-demo-form when the form is wired (see README.md).
        if (!msg.querySelector(".demo-note")) {
          var note = document.createElement("p");
          note.className = "form-note mt-1 demo-note";
          note.textContent = "(Preview note: this form isn't connected to a backend yet, so nothing was sent. See README.md to activate it.)";
          msg.appendChild(note);
        }
        msg.hidden = false;
        form.hidden = true;
        msg.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });
});

// ---- Lead attribution + CB CRM intake ----
// 1) On every page load, capture gclid/fbclid/utm_* from the URL and persist
//    them (sessionStorage + 90-day first-party cookie) so they survive
//    navigation from a landing page to the contact form.
// 2) Fill matching hidden fields on every Formspree form (creates them if absent).
// 3) On submit, also POST the lead to the CB CRM public intake, then let the
//    normal Formspree submit continue (email to info@ + #leads unchanged).
//    The CRM post is best-effort: any failure or a 2.5s timeout never blocks
//    the Formspree submission.
(function () {
  // CRM hookup is OFF by default. Leave blank until Gaige confirms the CRM
  // intake is ready, then set to the CB Built Homes workspace id
  // ("cmv6frmxd0000rep2oggnnoqb") to enable. Blank = no CRM post; hidden
  // attribution fields still fill and Formspree is unchanged.
  var CRM_WORKSPACE_ID = "";
  var CRM_API_URL = "https://api.buildwithcbhomes.com/api/public/leads";
  var KEYS = ["gclid", "fbclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  var STORE = "cb_attr";

  function readStored() {
    try {
      var s = sessionStorage.getItem(STORE);
      if (s) return JSON.parse(s);
    } catch (e) {}
    try {
      var m = document.cookie.match(/(?:^|;\s*)cb_attr=([^;]+)/);
      if (m) return JSON.parse(decodeURIComponent(m[1]));
    } catch (e) {}
    return {};
  }

  function save(attr) {
    var json = JSON.stringify(attr);
    try { sessionStorage.setItem(STORE, json); } catch (e) {}
    try {
      document.cookie = STORE + "=" + encodeURIComponent(json) +
        ";max-age=" + 60 * 60 * 24 * 90 + ";path=/;SameSite=Lax" +
        (location.protocol === "https:" ? ";Secure" : "");
    } catch (e) {}
  }

  var attr = readStored();
  try {
    var params = new URLSearchParams(window.location.search);
    var fresh = {};
    var hit = false;
    KEYS.forEach(function (k) {
      var v = params.get(k);
      if (v) { fresh[k] = v.slice(0, 200); hit = true; }
    });
    // A new ad click / campaign link replaces the previous touch as a set.
    if (hit) {
      fresh.landing_page = (location.origin + location.pathname).slice(0, 500);
      fresh.landing_referrer = (document.referrer || "").slice(0, 500);
      attr = fresh;
      save(attr);
    }
  } catch (e) {}

  var forms = document.querySelectorAll('form[action*="formspree.io"]');
  forms.forEach(function (form) {
    KEYS.forEach(function (k) {
      var el = form.querySelector('input[name="' + k + '"]');
      if (!el) {
        el = document.createElement("input");
        el.type = "hidden";
        el.name = k;
        form.appendChild(el);
      }
      if (attr[k]) el.value = attr[k];
    });

    if (!CRM_WORKSPACE_ID) return;

    form.addEventListener("submit", function (ev) {
      if (form.dataset.crmSent === "1") return; // second pass: native submit
      if (typeof form.checkValidity === "function" && !form.checkValidity()) return;
      ev.preventDefault();
      form.dataset.crmSent = "1";

      function val(name) {
        var el = form.querySelector('[name="' + name + '"]');
        return el && el.value ? String(el.value).trim() : "";
      }
      var lines = [];
      [["project-type", "Project"], ["address", "Address"], ["budget", "Budget"],
       ["timeline", "Timeline"], ["referral-source", "Heard about us"]].forEach(function (p) {
        var v = val(p[0]);
        if (v) lines.push(p[1] + ": " + v);
      });
      var details = val("details");
      if (details) lines.push("", details);

      var slug = location.pathname.replace(/^\/|\/$|\.html$/g, "").replace(/[^a-z0-9]+/gi, "_") || "home";
      var payload = { workspaceId: CRM_WORKSPACE_ID, source: ("site_" + slug).slice(0, 50) };
      if (val("name")) payload.name = val("name").slice(0, 200);
      if (val("email")) payload.email = val("email").slice(0, 320);
      if (val("phone")) payload.phone = val("phone").slice(0, 30);
      if (lines.length) payload.message = lines.join("\n").slice(0, 2000);
      if (val("_gotcha")) payload._hp = val("_gotcha");
      payload.pageUrl = (location.origin + location.pathname).slice(0, 500);
      var ref = attr.landing_referrer || document.referrer;
      if (ref) payload.referrer = ref.slice(0, 500);
      var map = { utm_source: "utmSource", utm_medium: "utmMedium", utm_campaign: "utmCampaign",
                  utm_term: "utmTerm", utm_content: "utmContent", gclid: "gclid", fbclid: "fbclid" };
      Object.keys(map).forEach(function (k) {
        var v = val(k) || attr[k];
        if (v) payload[map[k]] = String(v).slice(0, 200);
      });

      var done = false;
      function proceed() {
        if (done) return;
        done = true;
        HTMLFormElement.prototype.submit.call(form); // Formspree, as before
      }
      setTimeout(proceed, 2500);
      try {
        fetch(CRM_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true
        }).then(proceed, proceed);
      } catch (e) { proceed(); }
    });
  });
})();
