// ===== Header background on scroll =====
var hdr = document.getElementById("hdr");
if (hdr) {
  var onScroll = function () { hdr.classList.toggle("scrolled", window.scrollY > 20); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// ===== Mobile menu (hamburger) =====
var burger = document.getElementById("burger");
var mnav = document.getElementById("mnav");
function toggleMenu(open) {
  if (!mnav || !burger) return;
  mnav.classList.toggle("open", open);
  burger.classList.toggle("open", open);
  document.body.style.overflow = open ? "hidden" : "";
}
if (burger) burger.addEventListener("click", function () { toggleMenu(!mnav.classList.contains("open")); });
if (mnav) {
  mnav.addEventListener("click", function (e) {
    if (e.target === mnav || e.target.closest("a") || e.target.classList.contains("close")) toggleMenu(false);
  });
}

// ===== Scroll-reveal (respects prefers-reduced-motion via CSS) =====
var reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && reveals.length) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e, i) {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = Math.min(i * 60, 200) + "ms";
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.14 });
  reveals.forEach(function (el) { io.observe(el); });
} else {
  reveals.forEach(function (el) { el.classList.add("in"); });
}

// ===== Contact form -> WhatsApp with a pre-filled booking message =====
var CLINIC_WA = "962790959195";
function sendToWhatsApp(e) {
  e.preventDefault();
  var name = (document.getElementById("cf-name").value || "").trim();
  var phone = (document.getElementById("cf-phone").value || "").trim();
  var service = document.getElementById("cf-service").value;
  var note = (document.getElementById("cf-note").value || "").trim();
  var lines = [
    "مرحباً، أرغب بحجز موعد في عيادة الدكتور مؤيد البطوش لتجميل وزراعة الأسنان.",
    "الاسم: " + name,
    "الهاتف: " + phone,
    "الخدمة: " + service
  ];
  if (note) lines.push("ملاحظات: " + note);
  var msg = lines.join("\n");
  window.open("https://wa.me/" + CLINIC_WA + "?text=" + encodeURIComponent(msg), "_blank");
  return false;
}
