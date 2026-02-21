function editProfile(name) {
  const generateModalContent = generateModalBody(name);
  $("#informativeModal .modal-title").text(generateModalContent.title);

  $("#informativeModal .modal-body").html(generateModalContent.body);
  const modalFooter = ` <button
    type="button"
    class="btn btn-secondary btn-sm"
    data-bs-dismiss="modal"
  >
    Cancel
  </button>
  <button
    type="button"
    onclick="showToast('success', '${generateModalContent.message}')"
    class="btn btn-primary btn-sm"
    data-bs-dismiss="modal"
  >
    Save
  </button>`;
  $("#informativeModal .modal-footer").html(modalFooter);
  $("#informativeModal .modal-footer").removeClass("justify-content-center");
  $("#informativeModal").modal("show");
}
function generateModalBody(name) {
  let content;
  let message;
  let title;
  switch (name) {
    case "name":
      title = "Update Hotel Name";
      content = generateNameBody();
      message = "Name updated successfully.";
      break;

    case "address":
      title = "Update Address";
      content = generateAddressBody();
      message = "Address updated successfully.";
      break;

    case "email":
      title = "Update Email";
      content = generateEmailBody();
      message = "Email updated successfully.";
      break;

    case "phone":
      title = "Update Phone";
      content = generatePhoneBody();
      message = "Phone updated successfully.";
      break;

    case "website":
      title = "Update Website";
      content = generateWebsiteBody();
      message = "Website updated successfully.";
      break;

    case "description":
      title = "Update Description";
      content = generateDescriptionBody();
      message = "Description updated successfully.";
      break;

    case "amenities":
      title = "Update Amenities";
      content = generateAmenitiesBody();
      message = "Amenities updated successfully.";
      break;

    default:
      break;
  }
  return { body: content, message: message, title: title };
}

function generateNameBody() {
  return `
  <div class="px-3">
    <input type="text" class="form-control" value="Grand Horizon Hotel & Conference Center">
    </div>
    `;
}
function generateAddressBody() {
  return `
  <div class="px-3">
  <div class="row mb-3">
  <label class="p-0 mb-2">Street</label>
    <input type="text" class="form-control" value="Thamel Marg">
    </div>
    <div class="row mb-3">
    <label class="p-0 mb-2">City</label>
    <input type="text" class="form-control" value="Kathmandu">
    </div>
    <div class="row mb-3">
    <label class="p-0 mb-2">Postal Code</label>
    <input type="text" class="form-control" value="44600">
    </div>
    <div class="row mb-3">
    <label class="p-0 mb-2">Country</label>
    <input type="text" class="form-control" value="Nepal">
    </div>
    </div>
    `;
}

function generateEmailBody() {
  return `
    <input type="email" class="form-control" value="info@grandhorizon.com.np">
    `;
}

function generatePhoneBody() {
  return `
  <div class="px-3">
  <div class="row mb-3">
  <label class="p-0 mb-2">Main</label>
    <input type="text" class="form-control" value="+977 1-4221234">
    </div>
    <div class="row mb-3">
    <label class="p-0 mb-2">Reservations</label>
    <input type="text" class="form-control" value="+977 980-1234567">
    </div>
    </div>
    `;
}

function generateWebsiteBody() {
  return `
    <input type="text" class="form-control" value="grandhorizon.com.np">
    `;
}

function generateDescriptionBody() {
  return `
    <textarea rows="6" class="form-control">Luxury 5-star hotel in the heart of Thamel with 180 rooms, 8 meeting rooms, rooftop pool, spa, and multiple dining options. Ideal for corporate events, conferences, and MICE activities.</textarea>
    `;
}

function generateAmenitiesBody() {
  return `
  <div class="d-flex flex-wrap gap-2" id="amenitiesContainer">
  <span
  class="bg-primary-subtle amenity-badge position-relative pe-4"
  >Free WiFi
  <button
    type="button"
    class="btn-close btn-close-sm position-absolute top-50 end-0 translate-middle-y me-2"
    style="font-size: 0.65rem"
    onclick="confirmDelete('Free WiFi')"
  ></button>
</span>
<span class="bg-primary-subtle amenity-badge position-relative pe-4"
                        >Secure Parking
                        <button
    type="button"
    class="btn-close btn-close-sm position-absolute top-50 end-0 translate-middle-y me-2"
    style="font-size: 0.65rem"
    onclick="confirmDelete('Secure Parking')"
  ></button></span
                      >
                      <span class="bg-primary-subtle amenity-badge position-relative pe-4"
                        >Rooftop Pool
                        <button
    type="button"
    class="btn-close btn-close-sm position-absolute top-50 end-0 translate-middle-y me-2"
    style="font-size: 0.65rem"
    onclick="confirmDelete('Rooftop Pool')"
  ></button></span
                      >
                      <span class="bg-primary-subtle amenity-badge position-relative pe-4"
                        >Spa & Gym
                        <button
    type="button"
    class="btn-close btn-close-sm position-absolute top-50 end-0 translate-middle-y me-2"
    style="font-size: 0.65rem"
    onclick="confirmDelete('Spa & Gym')"
  ></button></span
                      >
                      <span class="bg-primary-subtle amenity-badge position-relative pe-4"
                        >24/7 Room Service
                        <button
    type="button"
    class="btn-close btn-close-sm position-absolute top-50 end-0 translate-middle-y me-2"
    style="font-size: 0.65rem"
    onclick="confirmDelete('24/7 Room Service')"
  ></button></span
                      >
                      <span class="bg-primary-subtle amenity-badge position-relative pe-4"
                        >Airport Shuttle
                        <button
    type="button"
    class="btn-close btn-close-sm position-absolute top-50 end-0 translate-middle-y me-2"
    style="font-size: 0.65rem"
    onclick="confirmDelete('Airport Shuttle')"
  ></button></span
                      >
                      <span class="bg-primary-subtle amenity-badge position-relative pe-4"
                        >Conference Facilities
                        <button
    type="button"
    class="btn-close btn-close-sm position-absolute top-50 end-0 translate-middle-y me-2"
    style="font-size: 0.65rem"
    onclick="confirmDelete('Conference Facilities')"
  ></button></span
                      >
                      <span class="bg-primary-subtle amenity-badge position-relative pe-4"
                        >Multi-Cuisine Restaurant
                        <button
    type="button"
    class="btn-close btn-close-sm position-absolute top-50 end-0 translate-middle-y me-2"
    style="font-size: 0.65rem"
    onclick="confirmDelete('Multi-Cuisine Restaurant')"
  ></button></span
                      >
</div>
<div class="row my-3 px-3">
<input type="text" class="form-control" placeholder="Add new amenity">
</div>
    `;
}

function confirmDelete(amenity) {
  $("#confirmationModal .modal-title").html(
    `Are you sure you want to remove <span class="fw-bold">${amenity}</span>`,
  );
  $("#confirmationModal").modal("show");
  $("#informativeModal").modal("hide");
  $("#deleteBtn")
    .off("click")
    .on("click", () => {
      $("#informativeModal").modal("show");
      showToast("success", `${amenity} removed successfully`);
    });

  $("#confirmationModal").on("hidden.bs.modal", function () {
    $("#informativeModal").modal("show");
  });
}

$("#changeProfileBtn")
  .off("click")
  .on("click", () => openUploadModal());
