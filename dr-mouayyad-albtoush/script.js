// ===== Header background on scroll =====
var hdr = document.getElementById("hdr");
window.addEventListener("scroll", function () {
  if (hdr) hdr.classList.toggle("scrolled", window.scrollY > 24);
});

// ===== Mobile nav =====
var burger = document.getElementById("burger");
var nav = document.getElementById("nav");
if (burger && nav) {
  burger.addEventListener("click", function () { nav.classList.toggle("open"); });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { nav.classList.remove("open"); });
  });
}

// ===== Scroll reveal =====
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

// ===== Animated stat counters =====
function animateCount(el) {
  var target = parseFloat(el.getAttribute("data-count"));
  var suffix = el.getAttribute("data-suffix") || "";
  var dur = 1500, start = null;
  function step(ts) {
    if (!start) start = ts;
    var p = Math.min((ts - start) / dur, 1);
    var eased = 1 - Math.pow(1 - p, 3);
    var val = target * eased;
    var shown = target >= 1000 ? Math.floor(val).toLocaleString("en-US") : Math.floor(val);
    el.textContent = shown + suffix;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = (target >= 1000 ? target.toLocaleString("en-US") : target) + suffix;
  }
  requestAnimationFrame(step);
}
var statIO = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { animateCount(e.target); statIO.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll(".num[data-count]").forEach(function (el) { statIO.observe(el); });

// ===== Gallery lightbox =====
var lb = document.getElementById("lightbox");
var lbImg = document.getElementById("lbImg");
var lbClose = document.getElementById("lbClose");
document.querySelectorAll(".gal-item").forEach(function (item) {
  item.addEventListener("click", function () {
    var src = item.getAttribute("data-src");
    if (src && lb && lbImg) { lbImg.src = src; lb.classList.add("open"); }
  });
});
function closeLb() { if (lb) lb.classList.remove("open"); }
if (lbClose) lbClose.addEventListener("click", closeLb);
if (lb) lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });
