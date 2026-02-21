// ── Hotel Data ───────────────────────────────────────────────────
    const hotels = [
      {
        id: "hyatt",
        name: "Hyatt Place Kathmandu",
        location: "Kathmandu",
        stars: 5,
        maxCapacity: 600,
        rooms: 218,
        amenities: ["AV Setup", "Pool", "Parking", "Accommodation", "Outdoor"],
        bookings: 24,
        contact: "events@hyattkathmandu.com",
        phone: "+977 1-4444555",
        spaces: [
          { name: "Grand Ballroom", capacity: 600, layout: "Theatre" },
          { name: "Summit Hall", capacity: 250, layout: "Banquet" },
          { name: "Board Room A", capacity: 40, layout: "Boardroom" },
        ],
        notes: "Top pick for large-scale corporate events. Excellent AV infrastructure. In-house catering team.",
        icon: "🏨",
        gradient: "135deg, #1d4ed8 0%, #38bdf8 100%",
      },
      {
        id: "marriott",
        name: "Marriott Kathmandu",
        location: "Kathmandu",
        stars: 5,
        maxCapacity: 500,
        rooms: 195,
        amenities: ["AV Setup", "Pool", "Parking", "Accommodation"],
        bookings: 19,
        contact: "events@marriottktm.com",
        phone: "+977 1-5553333",
        spaces: [
          { name: "Himalayan Ballroom", capacity: 500, layout: "Theatre" },
          { name: "Everest Room", capacity: 180, layout: "Banquet" },
          { name: "Executive Boardroom", capacity: 30, layout: "Boardroom" },
        ],
        notes: "Preferred for international delegations. Premium service standards. Flexible F&B packages.",
        icon: "🏩",
        gradient: "135deg, #7c3aed 0%, #a78bfa 100%",
      },
      {
        id: "radisson",
        name: "Radisson Hotel Kathmandu",
        location: "Kathmandu",
        stars: 5,
        maxCapacity: 450,
        rooms: 170,
        amenities: ["AV Setup", "Pool", "Parking", "Accommodation", "Outdoor"],
        bookings: 15,
        contact: "mice@radissonktm.com",
        phone: "+977 1-4411818",
        spaces: [
          { name: "Infinity Hall", capacity: 450, layout: "Theatre" },
          { name: "Garden Pavilion", capacity: 200, layout: "Outdoor/Banquet" },
        ],
        notes: "Great outdoor garden space for gala dinners. Known for strong MICE packages.",
        icon: "🌟",
        gradient: "135deg, #0891b2 0%, #67e8f9 100%",
      },
      {
        id: "barahi",
        name: "Barahi Jungle Lodge",
        location: "Chitwan",
        stars: 4,
        maxCapacity: 150,
        rooms: 52,
        amenities: ["Outdoor", "Parking", "Accommodation", "AV Setup"],
        bookings: 8,
        contact: "events@barahi.com",
        phone: "+977 56-521111",
        spaces: [
          { name: "Riverfront Lawn", capacity: 150, layout: "Outdoor/Theatre" },
          { name: "Conference Room", capacity: 60, layout: "Classroom" },
        ],
        notes: "Unique jungle setting. Perfect for offsite retreats and team-building. Limited city-style AV.",
        icon: "🌿",
        gradient: "135deg, #15803d 0%, #86efac 100%",
      },
      {
        id: "fishtail",
        name: "Fishtail Lodge Pokhara",
        location: "Pokhara",
        stars: 4,
        maxCapacity: 200,
        rooms: 68,
        amenities: ["Outdoor", "Pool", "Parking", "Accommodation", "AV Setup"],
        bookings: 11,
        contact: "events@fishtaillodge.com",
        phone: "+977 61-521111",
        spaces: [
          { name: "Lakeside Pavilion", capacity: 200, layout: "Outdoor" },
          { name: "Mountain View Hall", capacity: 100, layout: "Banquet" },
          { name: "Annapurna Board Room", capacity: 25, layout: "Boardroom" },
        ],
        notes: "Stunning lakeside views. Iconic venue for retreats. Island location accessible by boat.",
        icon: "🏔️",
        gradient: "135deg, #0369a1 0%, #7dd3fc 100%",
      },
      {
        id: "dwarika",
        name: "Dwarika's Hotel",
        location: "Kathmandu",
        stars: 5,
        maxCapacity: 300,
        rooms: 88,
        amenities: ["AV Setup", "Outdoor", "Parking", "Accommodation", "Pool"],
        bookings: 13,
        contact: "mice@dwarikas.com",
        phone: "+977 1-4479488",
        spaces: [
          { name: "Heritage Courtyard", capacity: 300, layout: "Outdoor/Theatre" },
          { name: "Krishnarpan Hall", capacity: 120, layout: "Banquet" },
        ],
        notes: "UNESCO Heritage property. Unique cultural experience. Ideal for premium international events.",
        icon: "🏛️",
        gradient: "135deg, #92400e 0%, #fcd34d 100%",
      },
      {
        id: "clubhimalaya",
        name: "Club Himalaya Nagarkot",
        location: "Nagarkot",
        stars: 4,
        maxCapacity: 120,
        rooms: 58,
        amenities: ["Outdoor", "AV Setup", "Parking", "Accommodation"],
        bookings: 6,
        contact: "events@clubhimalaya.com",
        phone: "+977 1-6615800",
        spaces: [
          { name: "Panorama Hall", capacity: 120, layout: "Theatre" },
          { name: "Sunrise Terrace", capacity: 80, layout: "Outdoor" },
        ],
        notes: "Breathtaking Himalayan views. Great for leadership retreats and small conferences.",
        icon: "⛰️",
        gradient: "135deg, #4f46e5 0%, #c4b5fd 100%",
      },
      {
        id: "dhulikhel",
        name: "Dhulikhel Mountain Resort",
        location: "Dhulikhel",
        stars: 3,
        maxCapacity: 100,
        rooms: 36,
        amenities: ["Outdoor", "Parking", "Accommodation"],
        bookings: 4,
        contact: "reservations@dhulikhelmountain.com",
        phone: "+977 11-490114",
        spaces: [
          { name: "Mountain Banquet Hall", capacity: 100, layout: "Banquet" },
          { name: "Open Terrace", capacity: 60, layout: "Outdoor" },
        ],
        notes: "Budget-friendly mountain option. Good for smaller offsites. Limited AV capability.",
        icon: "🏕️",
        gradient: "135deg, #065f46 0%, #6ee7b7 100%",
      },
    ];

    // ── State ────────────────────────────────────────────────────────
    let shortlist = new Set();
    let currentView = "card";

    // ── Render ───────────────────────────────────────────────────────
    function renderCards(data) {
      const grid = document.getElementById("cardGrid");
      grid.innerHTML = "";
      if (!data.length) {
        document.getElementById("cardEmpty").classList.remove("d-none");
        return;
      }
      document.getElementById("cardEmpty").classList.add("d-none");

      data.forEach(h => {
        const stars = "★".repeat(h.stars) + "☆".repeat(5 - h.stars);
        const amenityHtml = h.amenities.slice(0, 3).map(a => `<span class="amenity-pill">${a}</span>`).join(" ");
        const more = h.amenities.length > 3 ? `<span class="amenity-pill">+${h.amenities.length - 3}</span>` : "";
        const isShortlisted = shortlist.has(h.id);

        const col = document.createElement("div");
        col.className = "col-sm-6 col-xl-4 hotel-item";
        col.dataset.id = h.id;
        col.innerHTML = `
          <div class="hotel-card h-100">
            <div class="position-relative">
              <div class="hotel-thumb-placeholder" style="background: linear-gradient(${h.gradient})">
                <span style="font-size:48px">${h.icon}</span>
              </div>
              <button class="shortlist-btn ${isShortlisted ? "active" : ""}" onclick="toggleShortlist('${h.id}', event)" title="Shortlist">
                <i class="${isShortlisted ? "fas" : "far"} fa-heart"></i>
              </button>
            </div>
            <div class="p-3">
              <div class="d-flex justify-content-between align-items-start mb-1">
                <div class="fw-semibold" style="font-size:14px;line-height:1.3">${h.name}</div>
              </div>
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="stars">${stars}</span>
                <small class="text-muted"><i class="fas fa-map-marker-alt me-1"></i>${h.location}</small>
              </div>
              <div class="d-flex flex-wrap gap-1 mb-3">${amenityHtml}${more}</div>
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">Max <strong>${h.maxCapacity}</strong> pax · <strong>${h.rooms}</strong> rooms</small>
                <button class="btn btn-sm btn-outline-primary" onclick="openHotelDetail('${h.id}')">View</button>
              </div>
            </div>
          </div>
        `;
        grid.appendChild(col);
      });
    }

    function renderTable(data) {
      const tbody = document.getElementById("tableBody");
      tbody.innerHTML = "";
      const empty = document.getElementById("tableEmpty");

      if (!data.length) {
        empty.classList.remove("d-none");
        return;
      }
      empty.classList.add("d-none");

      data.forEach(h => {
        const stars = "★".repeat(h.stars);
        const amenityHtml = h.amenities.slice(0, 2).map(a => `<span class="amenity-pill">${a}</span>`).join(" ");
        const more = h.amenities.length > 2 ? `<span class="amenity-pill">+${h.amenities.length - 2}</span>` : "";
        const isShortlisted = shortlist.has(h.id);

        const tr = document.createElement("tr");
        tr.className = "hotel-row";
        tr.innerHTML = `
          <td onclick="openHotelDetail('${h.id}')">
            <div class="d-flex align-items-center gap-3">
              <div class="hotel-mini-thumb">${h.icon}</div>
              <div>
                <div class="fw-semibold" style="font-size:14px">${h.name}</div>
                <small class="text-muted">${h.rooms} rooms</small>
              </div>
            </div>
          </td>
          <td onclick="openHotelDetail('${h.id}')"><small><i class="fas fa-map-marker-alt me-1 text-muted"></i>${h.location}</small></td>
          <td onclick="openHotelDetail('${h.id}')"><span class="stars" style="font-size:11px">${stars}</span></td>
          <td onclick="openHotelDetail('${h.id}')"><strong>${h.maxCapacity}</strong> <small class="text-muted">pax</small></td>
          <td onclick="openHotelDetail('${h.id}')"><div class="d-flex flex-wrap gap-1">${amenityHtml}${more}</div></td>
          <td onclick="openHotelDetail('${h.id}')">${h.bookings}</td>
          <td>
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-outline-secondary" onclick="openHotelDetail('${h.id}')">View</button>
              <button class="btn btn-sm ${isShortlisted ? "btn-danger" : "btn-outline-danger"}" onclick="toggleShortlist('${h.id}', event)" title="Shortlist">
                <i class="${isShortlisted ? "fas" : "far"} fa-heart"></i>
              </button>
            </div>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    function render(data) {
      renderCards(data);
      renderTable(data);
      document.getElementById("hotelCount").textContent = `Showing ${data.length} hotel${data.length !== 1 ? "s" : ""}`;
    }

    // ── Filters & Sort ───────────────────────────────────────────────
    function applyFilters() {
      const search = document.getElementById("hotelSearch").value.toLowerCase();
      const location = document.getElementById("locationFilter").value;
      const capacity = parseInt(document.getElementById("capacityFilter").value) || 0;
      const sort = document.getElementById("sortBy").value;

      const checkedStars = [...document.querySelectorAll(".star-check input:checked")].map(el => parseInt(el.value));
      const checkedAmenities = [...document.querySelectorAll("#cardView ~ * input[type=checkbox]:checked, .filter-label ~ * .form-check-input:checked")]
        .filter(el => el.closest(".mb-4") && el.closest(".mb-4").querySelector(".filter-label")?.textContent === "Amenities")
        .map(el => el.value);

      // Re-check amenities properly
      const amenityChecks = ["amAV", "amPool", "amOutdoor", "amParking", "amRooms"];
      const selectedAmenities = amenityChecks
        .filter(id => document.getElementById(id)?.checked)
        .map(id => document.getElementById(id).value);

      let filtered = hotels.filter(h => {
        if (search && !h.name.toLowerCase().includes(search) && !h.location.toLowerCase().includes(search)) return false;
        if (location && h.location !== location) return false;
        if (checkedStars.length && !checkedStars.includes(h.stars)) return false;
        if (capacity && h.maxCapacity < capacity) return false;
        if (selectedAmenities.length && !selectedAmenities.every(a => h.amenities.includes(a))) return false;
        return true;
      });

      if (sort === "stars") filtered.sort((a, b) => b.stars - a.stars);
      else if (sort === "capacity") filtered.sort((a, b) => b.maxCapacity - a.maxCapacity);
      else if (sort === "bookings") filtered.sort((a, b) => b.bookings - a.bookings);
      else filtered.sort((a, b) => a.name.localeCompare(b.name));

      render(filtered);
    }

    function clearFilters() {
      document.getElementById("hotelSearch").value = "";
      document.getElementById("locationFilter").value = "";
      document.getElementById("capacityFilter").value = "";
      document.getElementById("sortBy").value = "name";
      document.querySelectorAll(".star-check input, #amAV, #amPool, #amOutdoor, #amParking, #amRooms").forEach(el => el.checked = false);
      applyFilters();
    }

    // ── View Toggle ──────────────────────────────────────────────────
    function setView(v) {
      currentView = v;
      document.getElementById("cardView").classList.toggle("d-none", v !== "card");
      document.getElementById("tableView").classList.toggle("d-none", v !== "table");
      document.getElementById("btnCardView").classList.toggle("active", v === "card");
      document.getElementById("btnTableView").classList.toggle("active", v === "table");
    }

    // ── Shortlist ────────────────────────────────────────────────────
    function toggleShortlist(id, e) {
      e.stopPropagation();
      if (shortlist.has(id)) {
        shortlist.delete(id);
        showToast("Removed from shortlist.", "bg-secondary");
      } else {
        shortlist.add(id);
        showToast("Added to shortlist!", "bg-success");
      }
      updateShortlistPanel();
      applyFilters(); // re-render to update heart icons
    }

    function updateShortlistPanel() {
      const count = shortlist.size;
      document.getElementById("shortlistBadge").textContent = count;

      const container = document.getElementById("shortlistItems");
      const empty = document.getElementById("shortlistEmpty");
      const actions = document.getElementById("shortlistActions");

      if (!count) {
        empty.classList.remove("d-none");
        actions.classList.add("d-none");
        container.innerHTML = "";
        container.appendChild(empty);
        return;
      }

      empty.classList.add("d-none");
      actions.classList.remove("d-none");

      // Rebuild list
      const existing = container.querySelector(".shortlist-list");
      if (existing) existing.remove();

      const list = document.createElement("div");
      list.className = "shortlist-list d-flex flex-column gap-2";

      [...shortlist].forEach(id => {
        const h = hotels.find(x => x.id === id);
        if (!h) return;
        const div = document.createElement("div");
        div.className = "d-flex align-items-center gap-3 p-2 rounded border";
        div.innerHTML = `
          <div class="hotel-mini-thumb" style="width:40px;height:36px;font-size:20px;border-radius:8px;background:linear-gradient(${h.gradient});color:#fff">${h.icon}</div>
          <div class="flex-grow-1">
            <div class="fw-medium" style="font-size:13px">${h.name}</div>
            <small class="text-muted">${h.location} · ${"★".repeat(h.stars)}</small>
          </div>
          <button class="btn btn-sm btn-outline-secondary" onclick="toggleShortlist('${h.id}', event)">
            <i class="fas fa-times"></i>
          </button>
        `;
        list.appendChild(div);
      });

      container.appendChild(list);
    }

    function clearShortlist() {
      shortlist.clear();
      updateShortlistPanel();
      applyFilters();
      showToast("Shortlist cleared.", "bg-secondary");
    }

    function inviteToRFP() {
      const names = [...shortlist].map(id => hotels.find(h => h.id === id)?.name).filter(Boolean).join(", ");
      showToast(`${shortlist.size} hotel(s) added to RFP invite list.`, "bg-primary");
    }

    // ── Hotel Detail ─────────────────────────────────────────────────
    function openHotelDetail(id) {
      const h = hotels.find(x => x.id === id);
      if (!h) return;

      document.getElementById("hotelDetailTitle").textContent = h.name;

      const stars = "★".repeat(h.stars) + "☆".repeat(5 - h.stars);
      const amenityHtml = h.amenities.map(a => `<span class="amenity-pill">${a}</span>`).join(" ");
      const spacesHtml = h.spaces.map(s => `
        <div class="capacity-item">
          <div class="fw-medium" style="font-size:13px">${s.name}</div>
          <div class="cap-label mt-1">${s.capacity} pax · ${s.layout}</div>
        </div>
      `).join("");

      const isShortlisted = shortlist.has(h.id);

      document.getElementById("hotelDetailBody").innerHTML = `
        <div class="hotel-detail-cover" style="background:linear-gradient(${h.gradient})">
          <span style="font-size:64px;opacity:0.7">${h.icon}</span>
        </div>
        <div class="p-4">

          <!-- Header info -->
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <div class="stars mb-1">${stars}</div>
              <small class="text-muted"><i class="fas fa-map-marker-alt me-1"></i>${h.location}</small>
            </div>
            <button class="btn btn-sm ${isShortlisted ? "btn-danger" : "btn-outline-danger"}" onclick="toggleShortlist('${h.id}', event); refreshDetailBtn('${h.id}')">
              <i class="${isShortlisted ? "fas" : "far"} fa-heart me-1"></i>${isShortlisted ? "Shortlisted" : "Shortlist"}
            </button>
          </div>

          <!-- Stats -->
          <div class="d-flex gap-2 mb-4">
            <div class="stat-box">
              <div class="val">${h.maxCapacity}</div>
              <div class="lbl">Max Pax</div>
            </div>
            <div class="stat-box">
              <div class="val">${h.rooms}</div>
              <div class="lbl">Rooms</div>
            </div>
            <div class="stat-box">
              <div class="val">${h.bookings}</div>
              <div class="lbl">Bookings</div>
            </div>
            <div class="stat-box">
              <div class="val">${h.spaces.length}</div>
              <div class="lbl">Venues</div>
            </div>
          </div>

          <!-- Amenities -->
          <div class="mb-4">
            <div class="detail-section-title">Amenities</div>
            <div class="d-flex flex-wrap gap-2">${amenityHtml}</div>
          </div>

          <!-- Event Spaces -->
          <div class="mb-4">
            <div class="detail-section-title">Event Spaces</div>
            <div class="capacity-grid">${spacesHtml}</div>
          </div>

          <!-- Contact -->
          <div class="mb-4">
            <div class="detail-section-title">Contact</div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex gap-2 align-items-center">
                <i class="fas fa-envelope text-muted" style="width:16px"></i>
                <a href="mailto:${h.contact}" style="font-size:13px">${h.contact}</a>
              </div>
              <div class="d-flex gap-2 align-items-center">
                <i class="fas fa-phone text-muted" style="width:16px"></i>
                <span style="font-size:13px">${h.phone}</span>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div class="mb-4">
            <div class="detail-section-title">Notes</div>
            <p class="text-muted" style="font-size:13px;line-height:1.6">${h.notes}</p>
          </div>

          <!-- Actions -->
          <div class="d-flex gap-2">
            <button class="btn btn-primary flex-grow-1" onclick="inviteOneToRFP('${h.id}')">
              <i class="fas fa-paper-plane me-2"></i>Invite to RFP
            </button>
            <button class="btn btn-outline-secondary">
              <i class="fas fa-comment me-1"></i>Message
            </button>
          </div>
        </div>
      `;

      new bootstrap.Offcanvas(document.getElementById("hotelDetailPanel")).show();
    }

    function refreshDetailBtn(id) {
      // Re-open to refresh shortlist button state
      setTimeout(() => openHotelDetail(id), 50);
    }

    function inviteOneToRFP(id) {
      const h = hotels.find(x => x.id === id);
      showToast(`${h.name} added to RFP invite list.`, "bg-primary");
    }

    // ── Toast ────────────────────────────────────────────────────────
    function showToast(msg, cls = "bg-success") {
      const el = document.getElementById("successToast");
      el.className = `toast align-items-center text-white border-0 ${cls}`;
      document.getElementById("toastMessage").textContent = msg;
      new bootstrap.Toast(el, { delay: 2500 }).show();
    }

    // ── Init ─────────────────────────────────────────────────────────
    document.getElementById("hotelSearch").addEventListener("input", applyFilters);
    document.getElementById("locationFilter").addEventListener("change", applyFilters);
    document.getElementById("capacityFilter").addEventListener("change", applyFilters);

    applyFilters(); // initial render