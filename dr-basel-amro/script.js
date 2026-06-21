// Header on scroll
var hdr = document.getElementById("hdr");
window.addEventListener("scroll", function () {
  if (hdr) hdr.classList.toggle("scrolled", window.scrollY > 24);
});

// Mobile nav
var burger = document.getElementById("burger");
var nav = document.getElementById("nav");
if (burger && nav) {
  burger.addEventListener("click", function () { nav.classList.toggle("open"); });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { nav.classList.remove("open"); });
  });
}

// Scroll reveal
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

// Before / after slider
var cmp = document.getElementById("cmp");
if (cmp) {
  var drag = false;
  function setSplit(x) {
    var r = cmp.getBoundingClientRect();
    var p = (x - r.left) / r.width;
    p = Math.max(0.03, Math.min(0.97, p));
    cmp.style.setProperty("--split", (p * 100) + "%");
  }
  cmp.addEventListener("pointerdown", function (e) { drag = true; setSplit(e.clientX); });
  window.addEventListener("pointermove", function (e) { if (drag) setSplit(e.clientX); });
  window.addEventListener("pointerup", function () { drag = false; });
}

// Gallery lightbox
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
