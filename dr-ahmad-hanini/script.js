// Header shadow on scroll
var hdr = document.getElementById("hdr");
if (hdr) {
  var onScroll = function () { hdr.classList.toggle("scrolled", window.scrollY > 16); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// Mobile nav toggle
var navToggle = document.getElementById("nav-toggle");
var nav = document.getElementById("nav");
if (navToggle && nav) {
  navToggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    document.body.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("open");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
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
var CLINIC_WA = "962797241601";
function sendToWhatsApp(e) {
  e.preventDefault();
  var name = (document.getElementById("cf-name").value || "").trim();
  var phone = (document.getElementById("cf-phone").value || "").trim();
  var service = document.getElementById("cf-service").value;
  var time = (document.getElementById("cf-time").value || "").trim();
  var note = (document.getElementById("cf-note").value || "").trim();
  var lines = [
    "مرحباً، أرغب بحجز موعد في عيادة الدكتور أحمد الحنيني لطب الأسنان.",
    "الاسم: " + name,
    "الهاتف: " + phone,
    "الخدمة: " + service
  ];
  if (time) lines.push("الوقت المفضل: " + time);
  if (note) lines.push("ملاحظات: " + note);
  window.open("https://wa.me/" + CLINIC_WA + "?text=" + encodeURIComponent(lines.join("\n")), "_blank");
  return false;
}
