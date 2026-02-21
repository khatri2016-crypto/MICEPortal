const columnDefs = [
  {
    field: "eventName",
    headerName: "Event Name",
    filter: "agTextColumnFilter",
    tooltipField: "eventName",
    headerTooltip: "Event Name",
  },
  {
    field: "client",
    headerName: "Client",
    filter: "agNumberColumnFilter",
    tooltipField: "client",
    headerTooltip: "Client",
  },
  {
    field: "eventDate",
    headerName: "Event Date",
    filter: "agDateColumnFilter",
    filterParams: dateFilterParams,
    tooltipField: "eventDate",
    headerTooltip: "Event Date",
    width: 200,
  },
  {
    field: "deadline",
    headerName: "Deadline",
    filter: "agTextColumnFilter",
    tooltipField: "deadline",
    headerTooltip: "Deadline",
    width: 200,
  },
  {
    field: "hotelsInvited",
    headerName: "Hotels Invited",
    filter: "agTextColumnFilter",
    tooltipField: "hotelsInvited",
    headerTooltip: "Hotels Invited",
    width: 200,
  },
  {
    field: "proposal",
    headerName: "Proposal",
    filter: "agTextColumnFilter",
    tooltipField: "proposal",
    headerTooltip: "Proposal",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    filter: "agTextColumnFilter",
    tooltipField: "status",
    headerTooltip: "Status",
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
  const gridDiv = document.querySelector("#rfpsGrid");
  gridApi = agGrid.createGrid(gridDiv, gridOptions);

  fetch("data/rfps.json")
    .then((response) => response.json())
    .then((data) => gridApi.setGridOption("rowData", data));
});

function actionButtonsRenderer(params) {
  const container = document.createElement("div");
  container.className = "d-flex gap-2";

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-sm btn-outline-secondary";
  editBtn.textContent = "Edit";

  const viewBtn = document.createElement("button");
  viewBtn.className = "btn btn-sm btn-outline-secondary";
  viewBtn.textContent = "View";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-sm btn-outline-secondary";
  deleteBtn.textContent = "Delete";

  editBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showLoading()
    setTimeout(() => {
      location.href = `/mice/edit-rfp.html?id=${params.data.rfpId}`;
    }, 1000);
    });

  viewBtn.addEventListener("click", (e) => {
    showLoading()
    e.stopPropagation();
    setTimeout(() => {
    location.href = `/mice/detail-rfp.html?id=${params.data.rfpId}`;
  }, 1000);
  });

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openDeleteModal(params.data);
  });

  container.append(viewBtn, editBtn, deleteBtn);
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