// Add the shop's country code and WhatsApp number, using digits only.
const shopWhatsApp = "";

const menu = document.querySelector("#cut-menu");

document.addEventListener("click", (event) => {
  if (!menu.contains(event.target) || event.target.closest("a")) {
    menu.open = false;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.open) {
    menu.open = false;
    menu.querySelector("summary").focus();
  }
});

const form = document.querySelector("#booking-form");
const preview = document.querySelector("#request-preview");

if (shopWhatsApp) {
  document.querySelector("#booking-button").textContent = "Open WhatsApp";
  document.querySelector("#booking-note").textContent = "Review and send your request in WhatsApp.";
  const phoneLink = document.createElement("a");
  phoneLink.href = "tel:+" + shopWhatsApp;
  phoneLink.textContent = "+" + shopWhatsApp;
  document.querySelector("#contact-number").replaceChildren(phoneLink);
}

form.addEventListener("input", () => {
  preview.hidden = true;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = new FormData(form);
  const name = fields.get("name").trim();
  if (!name) {
    form.elements.name.focus();
    return;
  }

  const message = [
    "Hi The Cut Room! I'd like to request an appointment.",
    "Name: " + name,
    "Service: " + fields.get("service"),
    "Preferred time (Bangladesh): " + fields.get("time"),
  ];
  const preferredDate = fields.get("date").trim();
  if (preferredDate) message.splice(3, 0, "Preferred date: " + preferredDate);
  const requestMessage = message.join("\n");

  if (shopWhatsApp) {
    window.location.href = "https://wa.me/" + shopWhatsApp + "?text=" + encodeURIComponent(requestMessage);
    return;
  }

  preview.textContent = requestMessage;
  preview.hidden = false;
});
