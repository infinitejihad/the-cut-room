// Add the shop's country code and WhatsApp number using digits only.
const shopWhatsApp = "";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");
const bookingForm = document.querySelector("#booking-form");

function closeMenu(returnFocus) {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("is-open");
  if (returnFocus) menuButton.focus();
}

menuButton.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isExpanded));
  menuButton.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu(true);
  }
});

function whatsappUrl(message) {
  const recipient = shopWhatsApp ? shopWhatsApp : "";
  return "https://wa.me/" + recipient + "?text=" + encodeURIComponent(message);
}

document.querySelectorAll(".whatsapp-link").forEach((link) => {
  const defaultMessage = link.classList.contains("contact-number")
    ? "Hi BRAIRCUT! I'd like to get in touch."
    : "Hi BRAIRCUT! I'd like to book an appointment.";
  link.href = whatsappUrl(defaultMessage);
  if (shopWhatsApp && link.classList.contains("contact-number")) {
    link.textContent = "+" + shopWhatsApp;
  }
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = new FormData(bookingForm);
  const message = [
    "Hi BRAIRCUT! I'd like to request an appointment.",
    fields.get("name") ? "Name: " + fields.get("name").trim() : "",
    fields.get("service") ? "Service: " + fields.get("service") : "",
    fields.get("date") ? "Preferred date: " + fields.get("date") : "",
    fields.get("time") ? "Preferred time (Bangladesh): " + fields.get("time") : "",
  ].filter(Boolean).join("\n");

  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
});

const year = document.querySelector("#current-year");
year.textContent = String(new Date().getFullYear());

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
