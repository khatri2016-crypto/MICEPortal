$("#addClientBtn").on("click", () => {
  $("#actionModal .modal-title").text("Add New Client");
  $("#actionModal .modal-dialog").addClass("modal-lg");
  $("#actionModal .modal-body").html(`
        <div class="mb-3">
              <label class="form-label fw-medium">Company Name <span class="text-danger">*</span></label>
              <input type="text" class="form-control" placeholder="e.g. TechCorp Ltd" />
            </div>
            <div class="row g-3 mb-3">
              <div class="col-6">
                <label class="form-label fw-medium">Contact Person</label>
                <input type="text" class="form-control" placeholder="Full name" />
              </div>
              <div class="col-6">
                <label class="form-label fw-medium">Designation</label>
                <input type="text" class="form-control" placeholder="e.g. Event Manager" />
              </div>
            </div>
            <div class="row g-3 mb-3">
              <div class="col-6">
                <label class="form-label fw-medium">Email</label>
                <input type="email" class="form-control" placeholder="contact@company.com" />
              </div>
              <div class="col-6">
                <label class="form-label fw-medium">Phone</label>
                <input type="tel" class="form-control" placeholder="+977 98XXXXXXXX" />
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label fw-medium">Industry</label>
              <select class="form-select">
              <option value="">Select industry</option>
              <option>Technology</option>
              <option>Events & DMC</option>
              <option>Conglomerate</option>
              <option>Banking & Finance</option>
              <option>Non-Profit / Education</option>
              <option>Trading & Commerce</option>
              <option>Telecommunications</option>
              <option>Tourism & Government</option>
              <option>Investment & Holdings</option>
              <option>Other</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label fw-medium">Notes</label>
              <textarea class="form-control" rows="2" placeholder="Any additional details about the client..."></textarea>
            </div>
        `);
  $("#actionModal .modal-footer")
    .html(`<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" onclick="saveClient()">Save Client
            </button>`);
  $("#actionModal").modal("show");
});

function saveClient() {
  showLoading();
  setTimeout(() => {
    $("#actionModal").modal("hide")
    showToast("success", "Client has been added.");
    hideLoading();
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
  }, 1000);
}
