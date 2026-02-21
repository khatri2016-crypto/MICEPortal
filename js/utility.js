function toggleToast(type, message) {
  const toastHtml = `
    <div class="toast align-items-center text-bg-${type} border-0"" data-bs-delay="5000">
       <div class="d-flex">
    <div class="toast-body">
      ${message}.
    </div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
    </div>
  `;

  const container = $(".toast-container");
  const toastEl = $(toastHtml).appendTo(container)[0];
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
  toastEl.addEventListener("hidden.bs.toast", () => {
    toastEl.remove();
  });
}

$("#btnSettings")
  .off("click")
  .on("click", () => {
    $("#actionModal .modal-title").text("Settings");
    const modalBody = generateSettingsContent();
    $("#actionModal .modal-body").html(modalBody);
    $("#actionModal").modal("show");
  });

$("#logoutBtn")
  .off("click")
  .on("click", () => {
    $("#actionModal .modal-title").text("Logout");
    $("#actionModal .modal-body").html("Are you sure you want to logout?");
    const modalFooter = ` <button
    type="button"
    class="btn btn-secondary btn-sm"
    data-bs-dismiss="modal"
  >
    Cancel
  </button>
  <button
    type="button"
    onclick="logout()"
    class="btn btn-danger btn-sm"
    data-bs-dismiss="modal"
  >
    Logout
  </button>`;
    $("#actionModal .modal-footer").html(modalFooter);
    $("#actionModal").modal("show");
  });

// Show the loading screen
function showLoading() {
  $("#loadingScreen").fadeIn(200);
}

// Hide the loading screen
function hideLoading() {
  $("#loadingScreen").fadeOut(200);
}

$(".sidebar li.nav-item")
  .off("click")
  .on("click", () => {
    showLoading();
  });

function showToast(type, body) {
  const toastBg = type.toLowerCase() == "success" ? "bg-success" : "bg-danger";
  $(".toast").removeClass(["bg-success", "bg-danger"]).addClass(toastBg);
  $(".toast-body").text(body);
  $(".toast").toast("show");
}

function generateSettingsContent() {
  return `
  <!-- Tabs Navigation -->
  <ul class="nav nav-tabs mb-4 border-bottom" id="settingsTabs" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active fw-medium" id="general-tab" data-bs-toggle="tab" data-bs-target="#general" type="button" role="tab">
        General
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link fw-medium" id="notifications-tab" data-bs-toggle="tab" data-bs-target="#notifications" type="button" role="tab">
        Notifications
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link fw-medium" id="appearance-tab" data-bs-toggle="tab" data-bs-target="#appearance" type="button" role="tab">
        Appearance
      </button>
    </li>
  </ul>

  <!-- Tab Content -->
  <div class="tab-content" id="settingsTabContent">

    <!-- 1. General Tab -->
    <div class="tab-pane fade show active" id="general" role="tabpanel">
      <h6 class="fw-semibold mb-3 text-muted">General Preferences</h6>

      <div class="mb-4">
        <label class="form-label fw-medium">Language</label>
        <select class="form-select form-select-lg" aria-label="Language selection">
          <option selected>English</option>
          <option>Nepali</option>
          <option>Hindi</option>
          <option>Chinese (Simplified)</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
        <div class="form-text text-muted mt-1">Interface language (some content may still be in English)</div>
      </div>

      <div class="mb-4">
        <label class="form-label fw-medium">Time Zone</label>
        <select class="form-select form-select-lg">
          <option selected>(GMT+5:45) Kathmandu, Nepal</option>
          <option>(GMT+5:30) New Delhi, Mumbai</option>
          <option>(GMT+8:00) Beijing, Singapore</option>
          <option>(GMT+1:00) Paris, Berlin</option>
          <option>(GMT-5:00) New York, Toronto</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="form-label fw-medium">Date Format</label>
        <div class="d-flex gap-3 flex-wrap">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="dateFormat" id="ddmmyyyy" checked>
            <label class="form-check-label" for="ddmmyyyy">DD/MM/YYYY</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="dateFormat" id="mmddyyyy">
            <label class="form-check-label" for="mmddyyyy">MM/DD/YYYY</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="dateFormat" id="yyyymmdd">
            <label class="form-check-label" for="yyyymmdd">YYYY-MM-DD</label>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Notifications Tab -->
    <div class="tab-pane fade" id="notifications" role="tabpanel">
      <h6 class="fw-semibold mb-3 text-muted">Notification Preferences</h6>

      <div class="list-group">
        <div class="list-group-item d-flex justify-content-between align-items-center py-3">
          <div>
            <div class="fw-medium">New RFP Received</div>
            <small class="text-muted">When an agency sends you a new RFP</small>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" checked>
          </div>
        </div>

        <div class="list-group-item d-flex justify-content-between align-items-center py-3">
          <div>
            <div class="fw-medium">Proposal Accepted / Booking Confirmed</div>
            <small class="text-muted">When a proposal is accepted or booking is finalized</small>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" checked>
          </div>
        </div>

        <div class="list-group-item d-flex justify-content-between align-items-center py-3">
          <div>
            <div class="fw-medium">New Message</div>
            <small class="text-muted">In-platform messages from agencies or corporates</small>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" checked>
          </div>
        </div>

        <div class="list-group-item d-flex justify-content-between align-items-center py-3">
          <div>
            <div class="fw-medium">Email Notifications</div>
            <small class="text-muted">Receive summary emails for important updates</small>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch">
          </div>
        </div>
      </div>
    </div>

    <!-- 4. Appearance Tab (your original request enhanced) -->
    <div class="tab-pane fade" id="appearance" role="tabpanel">
      <h6 class="fw-semibold mb-3 text-muted">Appearance & Theme</h6>

      <div class="mb-5">
        <label class="form-label fw-medium d-block mb-3">Theme Mode</label>
        <div class="d-flex gap-4 flex-wrap">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="theme" id="themeLight" checked>
            <label class="form-check-label d-flex align-items-center gap-2" for="themeLight">
              <i class="bi bi-sun-fill fs-4"></i> Light
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="theme" id="themeDark">
            <label class="form-check-label d-flex align-items-center gap-2" for="themeDark">
              <i class="bi bi-moon-stars-fill fs-4"></i> Dark
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="theme" id="themeSystem" checked>
            <label class="form-check-label d-flex align-items-center gap-2" for="themeSystem">
              <i class="bi bi-laptop fs-4"></i> System / Device
            </label>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label fw-medium">Font Size</label>
        <select class="form-select form-select-lg">
          <option>Small</option>
          <option selected>Default</option>
          <option>Large</option>
          <option>Extra Large</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="form-label fw-medium">Density</label>
        <select class="form-select form-select-lg">
          <option>Comfortable</option>
          <option selected>Default</option>
          <option>Compact</option>
        </select>
      </div>

    </div>

  </div>
  `;
}

function logout() {
  window.location.href = "../../login.html";
}

function redirectTo(domain, page, parameter) {
  if (domain == "owner")
    window.location.href = `../../corporate/${page}?${parameter}`;
}

// Example: mark as read when clicked (simulate)
document.querySelectorAll(".list-group-item-action").forEach((item) => {
  item.addEventListener("click", function (e) {
    if (!this.classList.contains("unread")) return;

    // Remove unread style
    this.classList.remove("unread");

    // Update badge count (simple demo - in real app use real data)
    const badge = document.querySelector("#notificationsDropdown .badge");
    let count = parseInt(badge.textContent) || 0;
    if (count > 0) {
      count--;
      badge.textContent = count || "";
      if (count === 0) badge.classList.add("d-none");
    }
  });
});

// Put this once (e.g. at the end of <body> or after DOM is ready)
document.addEventListener("DOMContentLoaded", () => {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]',
  );
  [...tooltipTriggerList].forEach((el) => new bootstrap.Tooltip(el));
});

function formattedDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function daysBetween(dateStr1, dateStr2, format = "YYYY-MM-DD") {
  const parseDate = (str) => {
    if (format === "YYYY-MM-DD") {
      return new Date(str);
    }
    throw new Error("Unsupported date format");
  };

  const date1 = parseDate(dateStr1);
  const date2 = parseDate(dateStr2);

  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    return "Invalid date(s)";
  }

  const diffTime = Math.abs(date2 - date1);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}