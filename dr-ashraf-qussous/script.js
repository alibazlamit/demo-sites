// Header background on scroll
var hdr = document.getElementById("hdr");
if (hdr) {
  var onScroll = function () { hdr.classList.toggle("scrolled", window.scrollY > 20); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// Mobile nav toggle
var burger = document.getElementById("burger");
var nav = document.getElementById("nav");
if (burger && nav) {
  burger.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

// Scroll-reveal (respects prefers-reduced-motion via CSS)
var reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && reveals.length) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e, i) {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = Math.min(i * 70, 210) + "ms";
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.14 });
  reveals.forEach(function (el) { io.observe(el); });
} else {
  reveals.forEach(function (el) { el.classList.add("in"); });
}

// Contact form -> WhatsApp with a pre-filled booking message
var CLINIC_WA = "962799814402";
function sendToWhatsApp(e) {
  e.preventDefault();
  var name = (document.getElementById("cf-name").value || "").trim();
  var phone = (document.getElementById("cf-phone").value || "").trim();
  var service = document.getElementById("cf-service").value;
  var note = (document.getElementById("cf-note").value || "").trim();
  var lines = [
    "مرحباً، أرغب بحجز موعد في عيادة الدكتور أشرف غازي القسوس لطب الأسنان.",
    "الاسم: " + name,
    "الهاتف: " + phone,
    "الخدمة: " + service
  ];
  if (note) lines.push("ملاحظات: " + note);
  window.open("https://wa.me/" + CLINIC_WA + "?text=" + encodeURIComponent(lines.join("\n")), "_blank");
  return false;
}
