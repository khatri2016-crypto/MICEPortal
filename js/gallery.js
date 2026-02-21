function openUploadModal() {
  $("#actionModal .modal-title").text("Upload Multiple Images");
  $("#actionModal .modal-body").html("");
  $("#actionModal .modal-body").html(`
  <label for="imageInput" class="upload-area d-block mb-4" id="dropZone">
          <i class="bi bi-cloud-arrow-up-fill d-block mb-3"></i>
          <h6 class="mb-1">Click or drag & drop images here</h6>
          <small class="text-muted">PNG, JPG, WebP — up to 10 files</small>
        </label>
        <input 
          type="file" 
          id="imageInput" 
          class="hidden-input" 
          accept="image/jpeg,image/png,image/webp" 
          multiple
        >
        <div id="previewGrid" class="preview-grid"></div>
  `);
  $("#actionModal .modal-footer").html(`
   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="uploadBtn">Upload Now</button>`);
  $("#actionModal").modal("show");

  // ────────────────────────────────────────────────
  const modal = document.getElementById("actionModal");
  const imageInput = document.getElementById("imageInput");
  const dropZone = document.getElementById("dropZone");
  const previewGrid = document.getElementById("previewGrid");
  const uploadBtn = document.getElementById("uploadBtn");

  let fakeUploadTimeouts = [];
  let selectedFiles = [];

  // Reset when modal is closed
  modal.addEventListener("hidden.bs.modal", () => {
    previewGrid.innerHTML = "";
    selectedFiles = [];
    uploadBtn.disabled = true;
    fakeUploadTimeouts.forEach(clearTimeout);
    fakeUploadTimeouts = [];
  });

  // ─── Open file dialog on click ──────────────────
  dropZone.addEventListener("click", () => imageInput.click());

  // ─── Drag & Drop ────────────────────────────────
  ["dragover", "dragenter"].forEach((evt) => {
    dropZone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropZone.classList.add("dragover");
    });
  });

  ["dragleave", "drop"].forEach((evt) => {
    dropZone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropZone.classList.remove("dragover");
    });
  });

  dropZone.addEventListener("drop", (e) => {
    handleFiles(e.dataTransfer.files);
  });

  // ─── File input change ──────────────────────────
  imageInput.addEventListener("change", () => {
    if (imageInput.files.length) handleFiles(imageInput.files);
  });

  // ─── Main handler ───────────────────────────────
  function handleFiles(fileList) {
    if (fileList.length > 10) {
      $(".toast .toast-body").text("Maximum 10 images allowed.");
      $(".toast").css("z-index", "2000");
      $(".toast").removeClass("text-bg-primary").addClass("text-bg-danger");
      $(".toast").toast("show");
      return;
    }

    previewGrid.innerHTML = "";
    fakeUploadTimeouts.forEach(clearTimeout);
    fakeUploadTimeouts = [];
    selectedFiles = Array.from(fileList); // keep reference

    uploadBtn.disabled = fileList.length === 0;

    Array.from(fileList).forEach((file, index) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const item = document.createElement("div");
        item.className = "preview-item";
        item.innerHTML = `
        <img src="${e.target.result}" alt="preview">
        <div class="progress-overlay">
          <div class="progress-bar-bg">
            <div class="progress-fill" id="progress-${index}"></div>
          </div>
          <span id="percent-${index}">0%</span>
        </div>
      `;
        previewGrid.appendChild(item);

        simulateUpload(index);
      };
      reader.readAsDataURL(file);
    });
  }

  // ─── Fake progress animation ────────────────────
  function simulateUpload(index) {
    let progress = 0;
    const bar = document.getElementById(`progress-${index}`);
    const label = document.getElementById(`percent-${index}`);

    const interval = setInterval(
      () => {
        progress += Math.random() * 12 + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setTimeout(() => {
            const overlay = bar?.closest(".progress-overlay");
            if (overlay) overlay.style.opacity = "0";
          }, 900);
        }
        if (bar) bar.style.width = progress + "%";
        if (label) label.textContent = Math.round(progress) + "%";
      },
      160 + Math.random() * 140,
    );

    fakeUploadTimeouts.push(interval);
  }

  // ─── Optional: real upload button logic ─────────
  uploadBtn.addEventListener("click", () => {
    if (selectedFiles.length === 0) {
      $(".toast .toast-body").text("Select at least one file.");
      $(".toast").css("z-index", "2000");
      $(".toast").removeClass("text-bg-primary").addClass("text-bg-danger");
      $(".toast").toast("show");
      return;
    }

    $("#actionModal").modal("hide");
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
  });
}
