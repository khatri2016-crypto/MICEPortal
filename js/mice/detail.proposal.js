const params = new URLSearchParams(window.location.search);
const id = params.get("id");

$("#rejectBtn").on("click", () => {
  $("#confirmationModal .modal-title").text(
    "Are you sure you want to reject the proposal?",
  );
  $("#confirmationModal .modal-footer #confirmRejectBtn").text("Reject");
  $("#confirmationModal").modal("show");
});

$("#acceptBtn").on("click", () => {
  showLoading();
  setTimeout(() => {
    showToast("success", "Proposal has been accepted successfully.");
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
    hideLoading();
    $("#acceptBtn").text("Accepted").prop("disabled", true);
    $("#rejectBtn").remove();
    $("#requestRevisionBtn").remove();
  }, 1000);
});

$("#confirmRejectBtn").on("click", () => {
  showToast("success", "Proposal has been rejected.");
  $("#rejectBtn").text("Rejected").prop("disabled", true);
  $("#acceptBtn").remove();
  $("#requestRevisionBtn").remove();
});

// Quick template buttons – insert text when clicked
document.querySelectorAll(".template-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const templateType = btn.dataset.template;
    const textarea = document.getElementById("revisionRequestText");
    let text = textarea.value.trim();

    const templates = {
      rate: "Can you please reduce the peak night rate to around NPR 17,800–18,000? This would make your offer more competitive.",
      rooms:
        "We need at least 100 rooms available on the peak night (currently only 92 offered). Can you release additional rooms or confirm availability?",
      breakfast:
        "Please include complimentary breakfast for all delegates (approximately 150 pax) as part of the package.",
      av: "The current AV package is missing 2 extra wireless microphones and a backup projector. Can you include these at no extra cost?",
      concessions:
        "Can you offer more concessions or upgrades? For example: complimentary early check-in, free parking, or additional meeting space?",
    };

    const suggestion = templates[templateType] || "";

    // Append (don't replace) so user can combine multiple templates
    if (text) {
      if (btn.classList.contains("active")) {
        textarea.value = text.replace(suggestion, "");
        btn.classList.remove("active");
      } else {
        textarea.value = text + "\n\n" + suggestion;
        btn.classList.add("active");
      }
    } else {
      textarea.value = suggestion;
      btn.classList.add("active");
    }
    // Focus textarea
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
  });
});

$("#sendRevisionBtn").on("click", () => {
  showLoading();
  setTimeout(() => {
    $("#revisionRequestModal").modal("hide");
    showToast("success", "Proposal Revision has been requested successfully.");
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
    hideLoading();
  }, 1000);
});

let proposals;
let rfps;
let hotels;
async function loadRfps() {
  const response = await fetch("../../mice/data/rfps.json"); // ← one level up + into data/
  rfps = await response.json();
}

async function loadProposals() {
  const response = await fetch("../../mice/data/proposals.json"); // ← one level up + into data/
  proposals = await response.json();
  renderViewPage(proposals);
}

async function loadHotels() {
  const response = await fetch("../../mice/data/hotels.json"); // ← one level up + into data/
  hotels = await response.json();
}
document.addEventListener("DOMContentLoaded", function () {
  loadRfps();
  loadProposals();
});
async function renderViewPage(proposals) {
  await loadHotels();

  const proposal = proposals.find((x) => x.proposalId == id);
  const rfp = rfps.find((x) => x.rfpId == proposal.rfpId);
  const hotel = hotels.find((x) => x.name == proposal.venueName);

  $("#ddDeadline").text(rfp.deadline);
  $("#ddEventDate").text(rfp.eventDate);
  $("#ddEventName").text(rfp.eventName);
  $("#amount").text(proposal.proposedAmount);
  $("#hotelName").text(
    proposal.venueName +
      " " +
      hotel.address.split(",").at(-2)?.trim().split(/\s+/)[0],
  );
  $("#bcHotelName").text(proposal.venueName);
  $("#messageHotelName").text(proposal.venueName);
  $("#bcEventName").text(rfp.eventName);
  $("#bcEventName").prop("href", `detail-rfp.html?id=${rfp.rfpId}`);
  $("#status").text(proposal.status);

  if (proposal.status.toLowerCase() == "rejected") {
    $("#acceptBtn").remove();
    $("#requestRevisionBtn").remove();
    $("#rejectBtn").remove();
  } else if (proposal.status.toLowerCase() == "accepted") {
    $("#rejectBtn").remove();
    $("#requestRevisionBtn").remove();
    $("#acceptBtn").remove();
  }
}

$("#replyBtn").on("click", () => {
  const message = $("#message").val();
  if (message.trim().length < 1) {
    showToast("danger", "Message cannot be empty.");
    return;
  }
  const item = document.createElement("div");
  item.className = "list-group-item px-4 py-3 bg-light";
  item.innerHTML = `
<div class="d-flex">
      <div class="flex-shrink-0 me-3">
        <div class="bg-primary text-white rounded-circle p-2">
        <i class="fas fa-user-tie"></i>
        </div>
      </div>
      <div class="flex-grow-1">
        <p class="mb-1 fw-medium">You (Sachin)</p>
        <small
          >${message}</small
        >
        <div class="mt-1">
          <small class="text-muted">Today 10:45</small>
        </div>
      </div>
    </div>
`;

  document.querySelector("#messageList").appendChild(item);
  $("#message").val("");
});
