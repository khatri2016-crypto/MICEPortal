const columnDefs = [
  {
    field: "venueName",
    headerName: "Hotel Name",
    filter: "agTextColumnFilter",
    tooltipField: "venueName",
    headerTooltip: "Hotel Name",
  },
  {
    field: "eventName",
    headerName: "Event Name",
    filter: "agTextColumnFilter",
    tooltipField: "eventName",
    headerTooltip: "Event Name",
  },
  {
    field: "status",
    headerName: "Status",
    filter: "agNumberColumnFilter",
    tooltipField: "status",
    headerTooltip: "Status",
  },
  {
    field: "submittedAt",
    headerName: "Submitted Date",
    filter: "agDateColumnFilter",
    filterParams: dateFilterParams,
    tooltipField: "submittedAt",
    headerTooltip: "Submitted Date",
    width: 200,
  },
  {
    field: "proposedAmount",
    headerName: "Proposed Amount",
    filter: "agTextColumnFilter",
    tooltipField: "proposedAmount",
    headerTooltip: "Proposed Amount",
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
    width: 150,
  },
];

const gridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    filter: true,
    floatingFilter: true,
  },
  rowSelection: {
    mode: "multiRow",
    headerCheckbox: false,
  },
  tooltipShowDelay: 500,
  pagination: true,
  paginationPageSize: 25,
  paginationPageSizeSelector: [25, 50, 100, 200, 500],
  onSelectionChanged,
};

document.addEventListener("DOMContentLoaded", function () {
  const gridDiv = document.querySelector("#proposalsGrid");
  gridApi = agGrid.createGrid(gridDiv, gridOptions);

  fetch("data/proposals.json")
    .then((response) => response.json())
    .then((data) => {
      if (id !== undefined) {
        gridApi.setGridOption(
          "rowData",
          data.filter((x) => x.rfpId == id),
        );
      } else {
        gridApi.setGridOption("rowData", data);
      }

      proposals = data;
    });
});

function actionButtonsRenderer(params) {
  const container = document.createElement("div");
  container.className = "d-flex gap-2";

  const viewBtn = document.createElement("button");
  viewBtn.className = "btn btn-sm btn-outline-secondary";
  viewBtn.textContent = "View";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-sm btn-outline-secondary";
  deleteBtn.textContent = "Delete";

  viewBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showLoading();
    setTimeout(() => {
      location.href = `/mice/detail-proposal.html?id=${params.data.proposalId}`;
    }, 1000);
  });

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openDeleteModal(params.data);
  });

  container.append(viewBtn, deleteBtn);
  return container;
}

function onSelectionChanged(event) {
  selectedProposalIds = [];
  const selectedRows = event.api.getSelectedRows();
  if (selectedRows) {
    selectedRows.forEach((row) => {
      selectedProposalIds.push(row.proposalId);
    });
  }
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
