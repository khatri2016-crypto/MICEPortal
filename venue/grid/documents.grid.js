const columnDefs = [
  {
    field: "documentName",
    headerName: "Document Name",
    filter: "agTextColumnFilter",
  },
  {
    field: "documentType",
    headerName: "Document Type",
    filter: "agTextColumnFilter",
  },
  {
    field: "uploadedBy",
    headerName: "Uploaded By",
    filter: "agTextColumnFilter",
  },
  {
    field: "uploadedOn",
    headerName: "Uploaded On",
    minWidth: 215,
    filter: "agDateColumnFilter",
    filterParams: dateFilterParams,
  },
  {
    field: "visibility",
    headerName: "Visibility",
    filter: "agTextColumnFilter",
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
    minWidth: 150,
    filter: true,
    floatingFilter: true,
    suppressHeaderMenuButton: true,
  },
  pagination: true,
  paginationPageSize: 25,
  paginationPageSizeSelector: [25, 50, 100, 200, 500],
};

document.addEventListener("DOMContentLoaded", function () {
  const gridDiv = document.querySelector("#documentsGrid");
  gridApi = agGrid.createGrid(gridDiv, gridOptions);

  fetch("data/documents.json")
    .then((response) => response.json())
    .then((data) => {
      const filtered = data.filter((x) => x.venueId === 1); // ← only objects where venueId is 1
      gridApi.setGridOption("rowData", filtered);
    });
});

function actionButtonsRenderer(params) {
  const container = document.createElement("div");
  container.className = "d-flex gap-2";

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-sm btn-outline-secondary";
  editBtn.innerHTML = "<i class='fa-regular fa-pen-to-square'></i>";

  const previewBtn = document.createElement("button");
  previewBtn.className = "btn btn-sm btn-outline-secondary";
  previewBtn.innerHTML = "<i class='fa-regular fa-eye'></i>";

  const downloadBtn = document.createElement("button");
  downloadBtn.className = "btn btn-sm btn-outline-secondary";
  downloadBtn.innerHTML = "<i class='fa-solid fa-download'></i>";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-sm btn-outline-secondary";
  deleteBtn.innerHTML = "<i class='fa-regular fa-trash-can'></i>";

  editBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openEditModal(params.data);
  });
  previewBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openPreviewModal(params.data);
  });
  downloadBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showToast("success", "File downloaded successfully.");
  });

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openDeleteModal(params.data);
  });

  container.append(editBtn, previewBtn, downloadBtn, deleteBtn);
  return container;
}

function openDeleteModal() {
  $("#confirmationModal .modal-title").text("Are you sure you want to delete?");
  $("#confirmationModal .modal-footer .btn-danger")
    .off("click")
    .on("click", () => {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      });
    });
  $("#confirmationModal").modal("show");
}

function openPreviewModal(data) {
  $("#informativeModal .modal-dialog").addClass("modal-xl");
  $("#informativeModal .modal-title").text(data.documentName);
  const content = `<img src='${data.documentLink}' class='w-100' height="500px">`;
  $("#informativeModal .modal-body").html("");
  $("#informativeModal .modal-body").html(content);

  $("#informativeModal").modal("show");
}

function openEditModal(data) {
  $("#actionModal .modal-title").text("Edit Document");
  const content = generateEditModalBody(data);
  $("#actionModal .modal-body").html("");
  $("#actionModal .modal-body").html(content);
   $("#actionModal .modal-footer").html(`
    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary btn-sm" data-bs-dismiss="modal" onclick="confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      })">Update</button>
       `);
  $("#actionModal").modal("show");
}

const generateEditModalBody = (data) => {
  return `
    <div class="mb-4">
      <label for="documentName" class="form-label fw-bold">Document Name <span class="text-danger">*</span></label>
      <input 
        type="text" 
        class="form-control" 
        id="documentName" 
        name="documentName"
        placeholder="e.g. Service Agreement 2025"
        required
        value="${data.documentName || ''}"
      >
    </div>

    <div class="mb-4">
      <label for="documentType" class="form-label fw-bold">Document Type <span class="text-danger">*</span></label>
      <input 
        type="text" 
        class="form-control" 
        id="documentType" 
        name="documentType"
        placeholder="e.g. Contract, Invoice, Proposal, NDA, Report"
        list="documentTypes"
        required
        value="${data.documentType || ''}"
      >
      <datalist id="documentTypes">
        <option value="Contract">
        <option value="Invoice">
        <option value="Proposal">
        <option value="NDA">
        <option value="Report">
        <option value="Policy">
        <option value="Presentation">
      </datalist>
    </div>

    <div class="mb-4">
      <label for="documentLink" class="form-label fw-bold">Upload Document <span class="text-danger">*</span></label>
      <input 
        type="file" 
        class="form-control" 
        id="documentLink" 
        name="documentLink"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.png"
        ${data.documentLink ? 'required' : ''}
      >
      <div class="form-text text-muted">
        ${data.documentLink ? 'Current file: ' + (data.documentName || 'existing file') + ' — upload new file to replace' : 'Supported formats: PDF, Word, Excel, PowerPoint, images, text'}
      </div>
    </div>

    <div class="mb-4">
      <label for="visibility" class="form-label fw-bold">Visibility <span class="text-danger">*</span></label>
      <select class="form-select" id="visibility" name="visibility" required>
        <option value="" disabled ${!data.visibility ? 'selected' : ''}>Select visibility level</option>
        <option value="internal"  ${data.visibility === 'Internal'  ? 'selected' : ''}>Internal (Company only)</option>
        <option value="client"    ${data.visibility === 'Client'    ? 'selected' : ''}>Client / Partner</option>
        <option value="public"    ${data.visibility === 'Public'    ? 'selected' : ''}>Public</option>
      </select>
    </div>
  `;
};