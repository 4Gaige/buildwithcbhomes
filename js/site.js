// CB Construction — shared site behavior
document.documentElement.classList.add("js");

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
