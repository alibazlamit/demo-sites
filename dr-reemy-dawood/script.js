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

// Subtle hero parallax
var heroImg = document.querySelector(".hero-frame img");
if (heroImg && window.matchMedia("(min-width:900px)").matches) {
  window.addEventListener("scroll", function () {
    var y = Math.min(window.scrollY, 600);
    heroImg.style.transform = "translateY(" + (y * 0.06) + "px) scale(1.04)";
  });
}

// Lightbox (gallery + cases)
var lb = document.getElementById("lightbox");
var lbImg = document.getElementById("lbImg");
var lbClose = document.getElementById("lbClose");
document.querySelectorAll("[data-src]").forEach(function (item) {
  item.addEventListener("click", function () {
    var src = item.getAttribute("data-src");
    if (src && lb && lbImg) { lbImg.src = src; lb.classList.add("open"); }
  });
});
function closeLb() { if (lb) lb.classList.remove("open"); }
if (lbClose) lbClose.addEventListener("click", closeLb);
if (lb) lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });
