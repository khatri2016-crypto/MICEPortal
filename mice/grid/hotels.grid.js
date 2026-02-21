const columnDefs = [
  {
    field: "name",
    headerName: "Name",
    filter: "agTextColumnFilter",
    tooltipField: "name",
    headerTooltip: "Name",
    suppressAutoSize: true,
  },
  {
    field: "address",
    headerName: "Address",
    filter: "agTextColumnFilter",
    tooltipField: "address",
    headerTooltip: "Address",
    suppressAutoSize: true,
  },
  {
    field: "star",
    headerName: "Star",
    filter: "agNumberColumnFilter",
    tooltipField: "star",
    headerTooltip: "Star",
    cellRenderer: starRenderer,
    suppressAutoSize: true,
  },
  {
    field: "contactEmail",
    headerName: "Contact Email",
    filter: "agTextColumnFilter",
    tooltipField: "contactEmail",
    headerTooltip: "Contact Email",
    suppressAutoSize: true,
    },
  {
    field: "phoneNumbers",
    headerName: "Phone Numbers",
    filter: "agTextColumnFilter",
    tooltipField: "phoneNumbers",
    headerTooltip: "Phone Numbers",
    cellRenderer: phoneNumbersRenderer,
    autoHeight: true,
  },
  {
    field: "website",
    headerName: "Website",
    filter: "agTextColumnFilter",
    tooltipField: "website",
    headerTooltip: "Website",
    cellRenderer: websiteRenderer,
    suppressAutoSize: true,
  },
  {
    field: "keyAmenities",
    headerName: "Amenities",
    filter: "agTextColumnFilter",
    tooltipField: "keyAmenities",
    headerTooltip: "Amenities",
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
  autoSizeStrategy: {
    type: "fitCellContents",
  },
  tooltipShowDelay: 500,
  pagination: true,
  paginationPageSize: 25,
  paginationPageSizeSelector: [25, 50, 100, 200, 500],
  onCellDoubleClicked: (params) => openViewClientModal(params.data),
};

document.addEventListener("DOMContentLoaded", function () {
  const gridDiv = document.querySelector("#hotelsGrid");
  gridApi = agGrid.createGrid(gridDiv, gridOptions);

  fetch("data/hotels.json")
    .then((response) => response.json())
    .then((data) => {
      gridApi.setGridOption("rowData", data);
    });
});

function actionButtonsRenderer(params) {
  const container = document.createElement("div");
  container.className = "d-flex gap-2 mt-1";
  const isShortListed = params.data.isShortListed
  const shortListBtn = document.createElement("button");
  shortListBtn.className = `btn btn-sm ${isShortListed ? "btn-danger" : "btn-outline-secondary"}`;
  shortListBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';

  const viewBtn = document.createElement("button");
  viewBtn.className = "btn btn-sm btn-outline-secondary";
  viewBtn.innerHTML = '<i class="fa-regular fa-eye"></i>';

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-sm btn-outline-secondary";
  editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-sm btn-outline-secondary";
  deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

  viewBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openViewClientModal(params.data);
  });

  editBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openEditClientModal(params.data);
  });

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openDeleteClientModal();
  });

  container.append(shortListBtn, viewBtn, editBtn, deleteBtn);
  return container;
}
function starRenderer(params) {
  const repeatA = (num) =>
    '<i class="fa-regular fa-star text-warning"></i>'.repeat(num);
  return repeatA(params.data.star);
}

function websiteRenderer(params) {
  return `<a href="${params.data.website}" target="_blank">${new URL(params.data.website).hostname.replace("www.", "")}</a>`;
}

function phoneNumbersRenderer(params) {
  const container = document.createElement("div");
  container.className = "d-flex mt-1 flex-column";
  params.data.phoneNumbers.forEach((phone) => {
    const phoneBtn = document.createElement("a");
    phoneBtn.setAttribute("href", `tel:${phone}`)
    phoneBtn.text = phone;
    container.append(phoneBtn);
  });
  return container;
}
