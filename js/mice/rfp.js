const select = document.getElementById("hotelMultiSelect");
const badge = document.getElementById("selectedCountBadge");
const searchInput = document.getElementById("hotelSearchInput");

function updateCount() {
  const count = select.selectedOptions.length;
  badge.textContent = count === 0 ? "0 selected" : `${count} selected`;
  badge.className =
    count === 0
      ? "badge bg-secondary-subtle text-secondary px-3 py-2 fs-6"
      : "badge bg-success-subtle text-success px-3 py-2 fs-6";
}

// Simple client-side search filter
searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase().trim();
  Array.from(select.options).forEach((opt) => {
    opt.style.display = opt.textContent.toLowerCase().includes(term)
      ? ""
      : "none";
  });
});

select.addEventListener("change", updateCount);
updateCount(); // initial

$("#createRfpBtn").on("click", () => {
  showLoading();
  setTimeout(() => {
    showToast("success", "Rfp has been sent successfully.");
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
    hideLoading();
  }, 1000);
});

$("#draftRfpBtn").on("click", () => {
  showLoading();
  setTimeout(() => {
    showToast("success", "Rfp has been saved as draft successfully.");
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
    hideLoading();
  }, 1000);
});

async function loadHotels() {
  const response = await fetch("../../mice/data/hotels.json"); // ← one level up + into data/
  hotels = await response.json();
  hotels.forEach((h) => {
    const opt = document.createElement("option");
    opt.value = h.venueId;
    opt.textContent = `${h.name} (${h.address.split(",").at(-2)?.trim().split(/\s+/)[0] ?? ""}, ${h.star}★)`;
    select.appendChild(opt);
  });
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let rfp;

// Initial render
document.addEventListener("DOMContentLoaded", () => {
  loadHotels();
  if (id) {
    loadRfps();
  }
});

async function loadRfps() {
  const response = await fetch("../../mice/data/rfps.json"); // ← one level up + into data/
  const rfps = await response.json();
  rfp = rfps.find((x) => x.rfpId == id);
  initializeRfp(rfp);
}

function initializeRfp(rfp) {
  $("#eventName").val(rfp.eventName);
  $("#clientName").val(rfp.client);
  $("#eventDate").val(rfp.eventDate);
  let selectedHotels = rfp.hotelsInvited.split(",").map((name) => name.trim());

  selectedHotels = hotels.filter((x) => selectedHotels.includes(x.name));
  const selectedVenueIds = selectedHotels.map((hotel) => hotel.venueId);
  $("#hotelMultiSelect").val(selectedVenueIds);
  updateCount();
}

$("#updateRfpBtn").on("click", () => {
  showLoading();
  setTimeout(() => {
    showToast("success", "Rfp has been updated successfully.");
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
    hideLoading();
  }, 1000);
});
