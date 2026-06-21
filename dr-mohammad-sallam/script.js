// Header background on scroll
var hdr = document.getElementById("hdr");
if (hdr) {
  var onScroll = function () { hdr.classList.toggle("scrolled", window.scrollY > 20); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// Mobile hamburger nav
var burger = document.getElementById("burger");
if (burger) {
  burger.addEventListener("click", function () {
    document.body.classList.toggle("menu-open");
    burger.setAttribute("aria-expanded", document.body.classList.contains("menu-open"));
  });
  // close the drawer after tapping a link
  document.querySelectorAll(".mobile-nav a").forEach(function (a) {
    a.addEventListener("click", function () { document.body.classList.remove("menu-open"); });
  });
}

// Scroll-reveal (respects prefers-reduced-motion via CSS)
var reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && reveals.length) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e, i) {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = Math.min(i * 60, 180) + "ms";
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
var CLINIC_WA = "962799532868";
function sendToWhatsApp(e) {
  e.preventDefault();
  var name = (document.getElementById("cf-name").value || "").trim();
  var phone = (document.getElementById("cf-phone").value || "").trim();
  var service = document.getElementById("cf-service").value;
  var note = (document.getElementById("cf-note").value || "").trim();
  var lines = [
    "مرحباً، أرغب بحجز موعد في عيادة الدكتور محمد سلّام لطب الأسنان.",
    "الاسم: " + name,
    "الهاتف: " + phone,
    "الخدمة: " + service
  ];
  if (note) lines.push("ملاحظات: " + note);
  window.open("https://wa.me/" + CLINIC_WA + "?text=" + encodeURIComponent(lines.join("\n")), "_blank");
  return false;
}
