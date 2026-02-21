const columnDefs = [
  {
    field: "spaceName",
    headerName: "Space Name",
    filter: "agTextColumnFilter",
    tooltipField: "spaceName",
    headerTooltip: "Space Name",
  },
  {
    field: "capacity",
    headerName: "Capacity",
    filter: "agNumberColumnFilter",
    tooltipField: "capacity",
    headerTooltip: "Capacity",
  },
  {
    field: "description",
    headerName: "Description",
    filter: "agTextColumnFilter",
    tooltipField: "description",
    headerTooltip: "Description",
    suppressAutoSize: true,
    width: 200,
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
  autoSizeStrategy: {
    type: "fitCellContents",
  },
  defaultColDef: {
    flex: 1,
    filter: true,
    floatingFilter: true,
  },
  tooltipShowDelay: 500,
  pagination: true,
  paginationPageSize: 25,
  paginationPageSizeSelector: [25, 50, 100, 200, 500],
};

document.addEventListener("DOMContentLoaded", function () {
  const gridDiv = document.querySelector("#eventSpaceGrid");
  gridApi = agGrid.createGrid(gridDiv, gridOptions);

  fetch("data/event-spaces.json")
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

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-sm btn-outline-secondary";
  editBtn.textContent = "Edit";

  const viewCalendarBtn = document.createElement("button");
  viewCalendarBtn.className = "btn btn-sm btn-outline-secondary";
  viewCalendarBtn.textContent = "View Calendar";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-sm btn-outline-secondary";
  deleteBtn.textContent = "Delete";

  editBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openEditModal(params.data);
  });

  viewCalendarBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openViewCalendarModal(params.data);
  });

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openDeleteModal(params.data);
  });

  container.append(editBtn, viewCalendarBtn, deleteBtn);
  return container;
}

function openEditModal(data) {
  $("#actionModal .modal-title").text("Edit Event Space");
  const content = generateModalBody(data);
  $("#actionModal .modal-body").html("");
  $("#actionModal .modal-body").html(content);
  $("#actionModal .modal-footer").html(`
    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary btn-sm" data-bs-dismiss="modal" onclick="confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      })">Save</button>
       `);
  $("#actionModal").modal("show");
}

function openViewCalendarModal(data) {
  $("#actionModal .modal-title").text("Event Dates For Space");
  $("#actionModal .modal-body").html("");
  $("#actionModal .modal-body").text("Need calendar here");
  $("#actionModal .modal-footer").html(`
    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
       `);
  $("#actionModal").modal("show");
}

function openDeleteModal(data) {
  $("#actionModal .modal-title").text("Delete Event Space");
  $("#actionModal .modal-body").html("");
  $("#actionModal .modal-body").html("Are you sure you want to delete?");
  $("#actionModal .modal-footer").html(`
    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-danger btn-sm" data-bs-dismiss="modal" onclick="confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      })">Delete</button>
       `);
  $("#actionModal").modal("show");
}

function generateModalBody(data) {
  return `
 <div class="row">
          <div class="col-sm-12 mb-3">
              <label class="form-label p-0">Event Space Name *</label>
              <input type="text" class="form-control" value="${data.spaceName}" />
          </div>
          <div class="col-sm-12 mb-3">
              <label class="form-label p-0">Capacity *</label>
              <input type="number" class="form-control" value="${data.capacity}"/>
          </div>
        <div class="col-sm-12">
          <label for="exampleFormControlTextarea1" class="form-label p-0">Description</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3">${data.description}</textarea>
        </div>
        </div>`;
}
