const columnDefs = [
  {
    field: "inquiryId",
    headerName: "Inquiry ID",
    filter: "agTextColumnFilter",
    tooltipField: "inquiryId",
    headerTooltip: "Inquiry ID",
  },
  {
    field: "eventName",
    headerName: "Event Name",
    filter: "agTextColumnFilter",
    tooltipField: "eventName",
    headerTooltip: "Event Name",
  },
  {
    field: "responseDeadline",
    headerName: "Response Deadline",
    minWidth: 215,
    filter: "agDateColumnFilter",
    filterParams: dateFilterParams,
    tooltipField: "responseDeadline",
    headerTooltip: "Response Deadline",
  },
  {
    field: "clientName",
    headerName: "Client Name",
    filter: "agTextColumnFilter",
    tooltipField: "clientName",
    headerTooltip: "Client Name",
  },
  {
    field: "startDate",
    headerName: "Start Date",
    minWidth: 215,
    filter: "agDateColumnFilter",
    filterParams: dateFilterParams,
    tooltipField: "startDate",
    headerTooltip: "Start Date",
  },
  {
    field: "endDate",
    headerName: "End Date",
    minWidth: 215,
    filter: "agDateColumnFilter",
    filterParams: dateFilterParams,
    tooltipField: "endDate",
    headerTooltip: "End Date",
  },
  {
    field: "budget",
    headerName: "Budget",
    filter: "agNumberColumnFilter",
    tooltipField: "budget",
    headerTooltip: "Budget",
  },
  {
    field: "inquiryStatus",
    headerName: "Inquiry Status",
    filter: "agTextColumnFilter",
    tooltipField: "inquiryStatus",
    headerTooltip: "Inquiry Status",
  },
  {
    field: "miceAgent",
    headerName: "Mice Agent",
    filter: "agTextColumnFilter",
    tooltipField: "miceAgent",
    headerTooltip: "Mice Agent",
  },
  {
    field: "note",
    headerName: "Note",
    filter: "agTextColumnFilter",
    tooltipField: "note",
    headerTooltip: "Note",
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
  },
  tooltipShowDelay: 500,
  pagination: true,
  paginationPageSize: 25,
  paginationPageSizeSelector: [25, 50, 100, 200, 500],
};

document.addEventListener("DOMContentLoaded", function () {
  const gridDiv = document.querySelector("#inquiriesGrid");
  gridApi = agGrid.createGrid(gridDiv, gridOptions);

  fetch("data/inquiries.json")
    .then((response) => response.json())
    .then((data) => {
      const filtered = data.filter((x) => x.venueId === 1); // ← only objects where venueId is 1
      gridApi.setGridOption("rowData", filtered);
    });
});

const onClick = (params) => {
  alert(params);
};

function actionButtonsRenderer(params) {
  const container = document.createElement("div");
  container.className = "d-flex gap-2";

  const respondBtn = document.createElement("button");
  respondBtn.className = "btn btn-sm btn-outline-secondary";
  respondBtn.textContent = "Respond";

  const rejectBtn = document.createElement("button");
  rejectBtn.className = "btn btn-sm btn-outline-secondary";
  rejectBtn.textContent = "Reject";

  respondBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openRespondModal(params.data);
  });

  rejectBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openRejectModal(params.data);
  });

  container.append(respondBtn, rejectBtn);
  return container;
}

function openRespondModal(data) {
  $("#actionModal .modal-title").text("RFP Response");
  const content = generateResponseModalBody(data);
  $("#actionModal .modal-body").html("");
  $("#actionModal .modal-body").html(content);
  $("#actionModal .modal-footer").html(`
    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary btn-sm" data-bs-dismiss="modal" onclick="confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      })">Respond</button>
       `);
  $("#actionModal").modal("show");
}

function openRejectModal(data) {
  $("#actionModal .modal-title").text("RFP Decline");
  $("#actionModal .modal-body").html("");
  const content = generateDeclineModalBody(data);
  $("#actionModal .modal-body").html(content);
  $("#actionModal .modal-footer").html(`
    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger btn-sm" data-bs-dismiss="modal" onclick="confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      })">Decline</button>
       `);
  $("#actionModal").modal("show");
}

function generateResponseModalBody(data) {
  return `
  <div class="modal-body pt-0">
   <div class="row mb-2 fw-bold">
  
        Inquiry ID: ${data.inquiryId}

       </div>
       <div class="row mb-3 fw-bold">
  
        Event Name: ${data.eventName}

       </div>
    <div class="row mb-3">
      <div class="card">
        <div class="card-body">
          <label class="form-label">Availability Status *</label>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radioDefault"
              id="radioDefault1"
              checked
            />
            <label class="form-check-label" for="radioDefault1">
              Available
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radioDefault"
              id="radioDefault2"
            />
            <label class="form-check-label" for="radioDefault2">
              Partially Available
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radioDefault"
              id="radioDefault3"
            />
            <label class="form-check-label" for="radioDefault3">
              Not Available
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="card">
        <div class="card-body">
          <div class="row mb-3">
            <div class="col-6 p-0">
              <label class="form-label">Quoted Amount *</label>
              <div class="input-group">
                <span class="input-group-text">$</span>
                <input
                  type="number"
                  class="form-control"
                  aria-label="Amount (to the nearest dollar)"
                />
                <span class="input-group-text">.00</span>
              </div>
            </div>
            <div class="col-6">
              <label class="form-label p-0">Pricing Type *</label>
              <select class="form-select" aria-label="Default select example">
                <option value="1">Lump sum</option>
                <option value="2">Per person</option>
                <option value="3">Per day</option>
              </select>
            </div>
          </div>
           <div class="row">

              <label for="exampleFormControlTextarea1" class="form-label p-0">Proposal Notes</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            

    </div>
        </div>
      </div>
    </div>

   
    
    </div>
    `;
}

function generateDeclineModalBody(data) {
  return `
  <div class="modal-body pt-0">
   <div class="row mb-2 fw-bold">
  
        Inquiry ID: ${data.inquiryId}

       </div>
       <div class="row mb-3 fw-bold">
  
        Event Name: ${data.eventName}

       </div>
    <div class="row mb-3">
      <div class="card">
        <div class="card-body">
          <label class="form-label">Decline Reason *</label>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radioDefault"
              id="radioDefault1"
              checked
            />
            <label class="form-check-label" for="radioDefault1">
             No availability
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radioDefault"
              id="radioDefault2"
            />
            <label class="form-check-label" for="radioDefault2">
              Budget mismatch
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radioDefault"
              id="radioDefault3"
            />
            <label class="form-check-label" for="radioDefault3">
              Dates not feasible
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radioDefault"
              id="radioDefault4"
            />
            <label class="form-check-label" for="radioDefault4">
              Other
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="card">
        <div class="card-body">
          
           <div class="row">
              <label for="exampleFormControlTextarea1" class="form-label p-0">Decline Notes</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
        </div>
      </div>
    </div>
    </div>
    `;
}
