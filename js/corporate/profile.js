const editBtn = document.getElementById("btnEditProfile");
const editControls = document.getElementById("editControls");
const viewElements = document.querySelectorAll(".view-mode");
const editElements = document.querySelectorAll(".edit-mode");

// Store original values for cancel
const originalValues = {};

function enterEditMode() {
  viewElements.forEach((el) => el.classList.add("d-none"));
  editElements.forEach((el) => el.classList.remove("d-none"));

  editControls.innerHTML = `
      <button class="btn btn-outline-secondary me-2" id="btnCancel">
        <i class="fa-solid fa-times me-2"></i> Cancel
      </button>
      <button class="btn btn-success px-4" id="btnSave">
        <i class="fa-solid fa-check me-2"></i> Save Changes
      </button>
    `;

  // Save original values
  document.querySelectorAll('[id^="display"]').forEach((el) => {
    const inputId = el.id.replace("display", "input");
    const input = document.getElementById(inputId);
    if (input) {
      originalValues[inputId] = input.value;
    }
  });

  // Re-attach event listeners
  document.getElementById("btnCancel")?.addEventListener("click", exitEditMode);
  document.getElementById("btnSave")?.addEventListener("click", saveChanges);
}

function exitEditMode() {
  viewElements.forEach((el) => el.classList.remove("d-none"));
  editElements.forEach((el) => el.classList.add("d-none"));

  editControls.innerHTML = `
      <button class="btn btn-secondary px-4" id="btnEditProfile">
        <i class="fa-solid fa-pen me-2"></i> Edit Profile
      </button>
    `;

  // Restore original values on cancel
  Object.keys(originalValues).forEach((id) => {
    const input = document.getElementById(id);
    if (input) input.value = originalValues[id];
  });

  document
    .getElementById("btnEditProfile")
    ?.addEventListener("click", enterEditMode);
}

function saveChanges() {
  // Collect data
  const updatedData = {
    email: document.getElementById("inputEmail")?.value,
    phone: document.getElementById("inputPhone")?.value,
    company: document.getElementById("inputCompany")?.value,
    industry: document.getElementById("inputIndustry")?.value,
    size: document.getElementById("inputSize")?.value,
    website: document.getElementById("inputWebsite")?.value,
  };

  showLoading();
  setTimeout(() => {
    hideLoading();
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
    showToast("success", "Profile updated successfully.");
    exitEditMode();

    // Update view values
    document.getElementById("displayEmail").textContent = updatedData.email;
    document.getElementById("displayPhone").textContent = updatedData.phone;
    document.getElementById("displayCompany").textContent = updatedData.company;
    document.getElementById("displayIndustry").textContent =
      updatedData.industry;
    document.getElementById("displaySize").textContent = updatedData.size;
    document.getElementById("displayWebsite").textContent = updatedData.website;
    document.getElementById("displayWebsite").href = updatedData.website;
  }, 1500);
}

// Initial listener
document
  .getElementById("btnEditProfile")
  ?.addEventListener("click", enterEditMode);

$("#changeProfileBtn")
  .off("click")
  .on("click", () => openUploadModal());
