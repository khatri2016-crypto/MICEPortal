const columnDefs = [
  {
    field: "event",
    headerName: "Event",
    filter: "agTextColumnFilter",
    tooltipField: "event",
    headerTooltip: "Event",
    suppressAutoSize: true,
  },
  {
    field: "client",
    headerName: "Client",
    filter: "agTextColumnFilter",
    tooltipField: "client",
    headerTooltip: "Client",
    suppressAutoSize: true,
  },
  {
    field: "hotel",
    headerName: "Hotel",
    filter: "agTextColumnFilter",
    tooltipField: "hotel",
    headerTooltip: "Hotel",
    suppressAutoSize: true,
  },
  {
    field: "fromDate",
    headerName: "From",
    filter: "agDateColumnFilter",
    filterParams: dateFilterParams,
    tooltipField: "fromDate",
    headerTooltip: "From",
    width: 200,
    suppressAutoSize: true,
  },
  {
    field: "toDate",
    headerName: "To",
    filter: "agDateColumnFilter",
    filterParams: dateFilterParams,
    tooltipField: "toDate",
    headerTooltip: "To",
    width: 200,
    suppressAutoSize: true,
  },
  {
    field: "status",
    headerName: "Status",
    filter: "agNumberColumnFilter",
    tooltipField: "status",
    headerTooltip: "Status",
    suppressAutoSize: true,
  },
  {
    field: "contract",
    headerName: "Contract",
    filter: "agNumberColumnFilter",
    tooltipField: "contract",
    headerTooltip: "Contract",
    suppressAutoSize: true,
  },
  {
    field: "actions",
    headerName: "Actions",
    filter: false,
    floatingFilter: true,
    pinned: "right",
    lockPinned: true,
    suppressMovable: true,
    sortable: false,
    cellRenderer: actionButtonsRenderer,
    tooltipField: "actions",
    headerTooltip: "Actions",
  },
];

const gridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    filter: true,
    floatingFilter: true,
  },
  autoSizeStrategy: {
    type: "fitCellContents",
  },
  tooltipShowDelay: 500,
  pagination: true,
  paginationPageSize: 25,
  paginationPageSizeSelector: [25, 50, 100, 200, 500],
  onCellDoubleClicked: (params) => openviewBookingModal(params.data)
};

document.addEventListener("DOMContentLoaded", function () {
  const gridDiv = document.querySelector("#proposalsGrid");
  gridApi = agGrid.createGrid(gridDiv, gridOptions);

  fetch("data/bookings.json")
    .then((response) => response.json())
    .then((data) => {
      gridApi.setGridOption("rowData", data);
    });
});

function actionButtonsRenderer(params) {
  const container = document.createElement("div");
  container.className = "d-flex gap-2 mt-1";

  const viewBtn = document.createElement("button");
  viewBtn.className = "btn btn-sm btn-outline-secondary";
  viewBtn.innerHTML = '<i class="fa-regular fa-eye"></i>';

  const uploadContractBtn = document.createElement("button");
  uploadContractBtn.className = "btn btn-sm btn-outline-secondary";
  uploadContractBtn.innerHTML = "<i class='fa-solid fa-upload'></i>";

  const viewContractBtn = document.createElement("button");
  viewContractBtn.className = "btn btn-sm btn-outline-secondary";
  viewContractBtn.innerHTML = '<i class="fa-regular fa-file-pdf"></i>';

  const markAsCompletedBtn = document.createElement("button");
  markAsCompletedBtn.className = "btn btn-sm btn-outline-success";
  markAsCompletedBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

  const cancelBookingBtn = document.createElement("button");
  cancelBookingBtn.className = "btn btn-sm btn-outline-danger";
  cancelBookingBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

  viewBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openviewBookingModal(params.data);
  });

  if (params.data.status.toLowerCase() == "confirmed") {
    uploadContractBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openUploadContractModal();
    });
    cancelBookingBtn.setAttribute("disabled", true);
    markAsCompletedBtn.setAttribute("disabled", true);
    viewContractBtn.setAttribute("disabled", true);
  }

  if (params.data.status.toLowerCase() == "in progress") {
    viewContractBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openViewContractModal(params.data.contractFile);
    });

    markAsCompletedBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openCompleteBookingModal();
    });
    uploadContractBtn.setAttribute("disabled", true);
    cancelBookingBtn.setAttribute("disabled", true);
  }
  if (params.data.status.toLowerCase() == "completed") {
    cancelBookingBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openCancelBookingModal();
    });
    viewContractBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openViewContractModal(params.data.contractFile);
    });
    uploadContractBtn.setAttribute("disabled", true);
    markAsCompletedBtn.setAttribute("disabled", true);
  }
  container.append(
    viewBtn,
    uploadContractBtn,
    viewContractBtn,
    markAsCompletedBtn,
    cancelBookingBtn,
  );
  return container;
}

function openCancelBookingModal() {
  $("#actionModal .modal-title").text("Cancel Booking");
  $("#actionModal .modal-body").html(`
    <label class="form-label">Cancellation Note</label>
    <textarea class="form-control" rows="5"></textarea>
    `);
  $("#actionModal .modal-footer").html(
    `<button
type="button"
class="btn btn-secondary btn-sm"
data-bs-dismiss="modal"
>
Cancel
</button>
<button
type="button"
class="btn btn-danger btn-sm"
>
Cancel Booking
</button>`,
  );
  $("#actionModal .modal-footer .btn-danger").on("click", () => {
    showLoading();
    setTimeout(() => {
      $("#actionModal").modal("hide");
      hideLoading();
      showToast("success", "Booking has been cancelled.");
    }, 1000);
  });
  $("#actionModal").modal("show");
}

function openCompleteBookingModal() {
  $("#actionModal .modal-title").text("Complete Booking");
  $("#actionModal .modal-body").html(`
    <label class="form-label">Note</label>
    <textarea class="form-control" rows="5"></textarea>
    `);
  $("#actionModal .modal-footer").html(
    `<button
type="button"
class="btn btn-secondary btn-sm"
data-bs-dismiss="modal"
>
Cancel
</button>
<button
type="button"
class="btn btn-success btn-sm"
>
Mark As Complete
</button>`,
  );
  $("#actionModal .modal-footer .btn-success").on("click", () => {
    showLoading();
    setTimeout(() => {
      $("#actionModal").modal("hide");
      hideLoading();
      showToast("success", "Booking has been completed.");
    }, 1000);
  });
  $("#actionModal").modal("show");
}

function openUploadContractModal() {
  $("#actionModal .modal-title").text("Upload Contract");
  $("#actionModal .modal-body").html(`
    <label class="form-label fw-semibold">Contract File</label>
  
  <!-- Drag & Drop Zone -->
  <div id="dropZone" class="border border-2 border-dashed rounded-3 p-5 text-center bg-light-subtle position-relative"
       style="min-height: 180px; cursor: pointer; transition: all 0.2s;">
    
    <!-- Default / empty state -->
    <div id="uploadPrompt">
      <i class="fas fa-cloud-upload-alt fa-3x text-primary mb-3"></i>
      <p class="mb-1 fw-medium">Drag & drop your contract file here</p>
      <p class="text-muted small mb-3">or click to browse (PDF, DOCX, max 10MB)</p>
      <button type="button" class="btn btn-outline-primary btn-sm px-4">
        <i class="fas fa-folder-open me-2"></i>Browse Files
      </button>
    </div>

    <!-- File preview / selected state -->
    <div id="filePreview" class="d-none">
      <div class="d-flex align-items-center justify-content-between p-3 bg-white rounded border">
        <div class="d-flex align-items-center">
          <i class="fas fa-file-pdf fa-2x text-danger me-3"></i>
          <div>
            <div class="fw-medium" id="fileName">contract_techcorp_2026.pdf</div>
            <small class="text-muted" id="fileSize">2.4 MB • Uploaded just now</small>
          </div>
        </div>
        <button type="button" class="btn btn-sm btn-outline-danger rounded-circle" id="removeFile" title="Remove file">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>

    <!-- Hidden real input -->
    <input type="file" id="contractFileInput" class="d-none" accept=".pdf,.doc,.docx" />
  </div>

  <!-- Help text -->
  <div class="form-text text-muted mt-2">
    Supported formats: PDF, Word (.doc/.docx). Max size: 10 MB.
  </div>
    `);
  $("#actionModal .modal-footer").html(
    `<button
type="button"
class="btn btn-secondary btn-sm"
data-bs-dismiss="modal"
>
Cancel
</button>
<button
type="button"
class="btn btn-success btn-sm"
>
Upload
</button>`,
  );
  $("#actionModal .modal-footer .btn-success").on("click", () => {
    showLoading();
    setTimeout(() => {
      $("#actionModal").modal("hide");
      hideLoading();
      showToast("success", "Contract has been uploaded.");
    }, 1000);
  });
  $("#actionModal").modal("show");
}

document
  .getElementById("actionModal")
  .addEventListener("shown.bs.modal", () => {
    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("contractFileInput");
    const prompt = document.getElementById("uploadPrompt");
    const preview = document.getElementById("filePreview");
    const fileNameEl = document.getElementById("fileName");
    const fileSizeEl = document.getElementById("fileSize");
    const removeBtn = document.getElementById("removeFile");

    // Click anywhere on drop zone → trigger file input
    dropZone.addEventListener("click", (e) => {
      if (
        e.target.tagName !== "BUTTON" &&
        !preview.classList.contains("d-none")
      )
        return;
      fileInput.click();
    });

    // File selected via input or drop
    function handleFile(file) {
      if (!file) return;

      // Basic validation (you can expand: type, size)
      if (file.size > 10 * 1024 * 1024) {
        alert("File too large (max 10 MB)");
        return;
      }

      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Only PDF and Word documents are allowed");
        return;
      }

      // Show preview
      prompt.classList.add("d-none");
      preview.classList.remove("d-none");
      fileNameEl.textContent = file.name;
      fileSizeEl.textContent =
        (file.size / 1024 / 1024).toFixed(1) + " MB • Just now";

      // Optional: store file for later upload (e.g. FormData)
      window.selectedContractFile = file;
    }

    // Browse button click
    dropZone.querySelector("button")?.addEventListener("click", (e) => {
      e.stopPropagation();
      fileInput.click();
    });

    // File input change
    fileInput.addEventListener("change", (e) => {
      handleFile(e.target.files[0]);
    });

    // Drag & drop support
    ["dragover", "dragenter"].forEach((event) => {
      dropZone.addEventListener(event, (e) => {
        e.preventDefault();
        dropZone.classList.add("border-primary", "bg-primary-subtle");
      });
    });

    ["dragleave", "drop"].forEach((event) => {
      dropZone.addEventListener(event, (e) => {
        e.preventDefault();
        dropZone.classList.remove("border-primary", "bg-primary-subtle");
      });
    });

    dropZone.addEventListener("drop", (e) => {
      handleFile(e.dataTransfer.files[0]);
    });

    // Remove file
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      fileInput.value = "";
      preview.classList.add("d-none");
      prompt.classList.remove("d-none");
      window.selectedContractFile = null;
    });
  });

function openViewContractModal(contractFile) {
  $("#informativeModal .modal-title").text(contractFile);
  $("#informativeModal .modal-dialog").addClass("modal-fullscreen");
  $("#informativeModal .modal-body").addClass("overflow-hidden");
  $("#informativeModal .modal-body").html(`
  <iframe src="../../contracts/${contractFile}" class="w-100 h-100"></iframe>
  `);
  $("#informativeModal").modal("show");
}

function openviewBookingModal(booking) {
  $("#informativeModal .modal-dialog").addClass("modal-lg");
  $("#informativeModal .modal-title").text("Booking Details");
  $("#informativeModal .modal-body").html(generateModalBody(booking));
  $("#informativeModal").modal("show");
}

function generateModalBody(booking){
  return `
          <div class="col-sm-12">
                <dl class="row g-3 mb-0">
                  <dt class="col-sm-4 text-muted">Event Name</dt>
                  <dd class="col-sm-8 fw-medium" id="modalEventName">${booking.event}</dd>

                  <dt class="col-sm-4 text-muted">Client</dt>
                  <dd class="col-sm-8" id="modalClientName">${booking.client}</dd>

                  <dt class="col-sm-4 text-muted">Hotel Name</dt>
                  <dd class="col-sm-8" id="modalHotelName">${booking.hotel}</dd>

                  <dt class="col-sm-4 text-muted">Dates</dt>
                  <dd class="col-sm-8" id="modalDates">${formattedDate(booking.fromDate)} to ${formattedDate(booking.toDate)} <span class="fst-italic fw-bold">(${daysBetween(booking.toDate, booking.fromDate) == 0 ? 1 : daysBetween(booking.toDate, booking.fromDate)} day/s)</span></dd>

                  <dt class="col-sm-4 text-muted">Pax / Rooms</dt>
                  <dd class="col-sm-8" id="modalPaxRooms">2</dd>

                  <dt class="col-sm-4 text-muted">Special Requests</dt>
                  <dd class="col-sm-8" id="modalNotes"></dd>
                </dl>
              </div>
  `
}