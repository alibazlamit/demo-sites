// Header background on scroll
var hdr = document.getElementById("hdr");
if (hdr) {
  var onScroll = function () { hdr.classList.toggle("scrolled", window.scrollY > 20); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
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

// Contact form -> Facebook Messenger (the clinic is not on WhatsApp)
var CLINIC_FB = "https://m.me/Dr.NajlaGH";
function sendBooking(e) {
  e.preventDefault();
  var name = (document.getElementById("cf-name").value || "").trim();
  var phone = (document.getElementById("cf-phone").value || "").trim();
  var patientEl = document.getElementById("cf-patient");
  var patient = patientEl ? (patientEl.value || "").trim() : "";
  var service = document.getElementById("cf-service").value;
  var note = (document.getElementById("cf-note").value || "").trim();
  var lines = [
    "مرحباً، أرغب بحجز موعد في عيادة د. نجلاء الغلاييني لطب الأسنان.",
    "الاسم: " + name,
    "الهاتف: " + phone
  ];
  if (patient) lines.push("المريض: " + patient);
  lines.push("الخدمة: " + service);
  if (note) lines.push("ملاحظات: " + note);
  var msg = lines.join("\n");
  try { if (navigator.clipboard) { navigator.clipboard.writeText(msg); } } catch (err) {}
  alert("تم نسخ تفاصيل حجزكِ ✔\nسيتم تحويلكِ إلى صفحتنا على فيسبوك — الصقي الرسالة وأرسليها، أو اتصلي بنا على 0799686338.");
  window.open(CLINIC_FB, "_blank");
  return false;
}
