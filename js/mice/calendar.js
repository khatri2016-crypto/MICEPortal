let bookings;
async function fetchBookings() {
  const response = await fetch("../../mice/data/bookings.json"); // ← one level up + into data/
  bookings = await response.json();
}

const statusClass = (s) =>
  s === "Confirmed"
    ? "s-confirmed"
    : s === "Completed"
      ? "s-completed"
      : "s-in-progress";
const statusColor = (s) =>
  s === "Confirmed" ? "#c84b2f" : s === "Completed" ? "#2d7a5f" : "#8b5cf6";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let currentView = "month";
let cursor = new Date(); // tracks the current period
cursor.setDate(1);
let todayViewDate = new Date();

function eventsOnDay(d) {
  const t = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  return bookings.filter((e) => {
    const f = new Date(
      e._from.getFullYear(),
      e._from.getMonth(),
      e._from.getDate(),
    ).getTime();
    const t2 = new Date(
      e._to.getFullYear(),
      e._to.getMonth(),
      e._to.getDate(),
    ).getTime();
    return t >= f && t <= t2;
  });
}

function isToday(d) {
  const n = new Date();
  return (
    d.getFullYear() === n.getFullYear() &&
    d.getMonth() === n.getMonth() &&
    d.getDate() === n.getDate()
  );
}

function showDetail(ev) {
  const p = document.getElementById("detailPanel");
  document.getElementById("dp-title").textContent = ev.event;
  const fmt = (d) =>
    d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  const sameDay = ev.fromDate === ev.toDate;
  document.getElementById("dp-dates").textContent = sameDay
    ? fmt(ev._from)
    : fmt(ev._from) + " – " + fmt(ev._to);
  const st = document.getElementById("dp-status");
  st.textContent = ev.status;
  st.className = "badge-status ms-2 " + statusClass(ev.status);
  document.getElementById("dp-contract").textContent =
    "Contract: " + ev.contract;
  document.getElementById("dp-client").textContent = ev.client;
  document.getElementById("dp-hotel").textContent = ev.hotel;
  p.classList.add("show");
}

function renderMonth() {
  const year = cursor.getFullYear(),
    month = cursor.getMonth();
  document.getElementById("calPeriodLabel").textContent =
    MONTHS[month] + " " + year;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();

  let html = '<div class="month-grid">';
  DAYS.forEach((d) => (html += `<div class="month-day-name">${d}</div>`));

  // prev month filler
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = new Date(year, month - 1, prevDays - i);
    html += `<div class="month-day other-month"><div class="day-num">${prevDays - i}</div></div>`;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const day = new Date(year, month, d);
    const evs = eventsOnDay(day);
    const todayCls = isToday(day) ? " today" : "";
    html += `<div class="month-day${todayCls}"><div class="day-num">${d}</div>`;
    evs.slice(0, 3).forEach((ev) => {
      const bg = statusColor(ev.status);
      html += `<div class="event-chip" style="background:${bg}22;color:${bg};" data-event="${encodeURIComponent(JSON.stringify({ i: bookings.indexOf(ev) }))}">${ev.event}</div>`;
    });
    if (evs.length > 3)
      html += `<div style="font-size:0.6rem;color:var(--muted);">+${evs.length - 3} more</div>`;
    html += "</div>";
  }

  // next month filler
  const totalCells = firstDay + daysInMonth;
  const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let i = 1; i <= remaining; i++) {
    html += `<div class="month-day other-month"><div class="day-num">${i}</div></div>`;
  }

  html += "</div>";
  document.getElementById("calBody").innerHTML = html;

  // Bind chip clicks
  document.querySelectorAll(".event-chip").forEach((chip) => {
    chip.addEventListener("click", (e) => {
      e.stopPropagation();
      const data = JSON.parse(decodeURIComponent(chip.dataset.event));
      showDetail(bookings[data.i]);
    });
  });
}

function renderWeek() {
  // Find week start (Sunday)
  const dow = cursor.getDay();
  const weekStart = new Date(cursor);
  weekStart.setDate(cursor.getDate() - dow);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    days.push(d);
  }

  document.getElementById("calPeriodLabel").textContent =
    `${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${days[6].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

  let html = '<div class="week-grid">';
  days.forEach((d) => {
    const evs = eventsOnDay(d);
    const todayCls = isToday(d) ? " today-col" : "";
    html += `<div class="week-day-col${isToday(d) ? " today-col" : ""}">
      <div class="week-day-header${todayCls}">${DAYS[d.getDay()]}<span>${d.getDate()}</span></div>
      <div class="week-day-events">`;
    if (evs.length === 0) {
      html += `<div class="week-no-events">—</div>`;
    } else {
      evs.forEach((ev) => {
        const bg = statusColor(ev.status);
        html += `<div class="week-event-card" style="background:${bg}18;" data-ei="${bookings.indexOf(ev)}">
          <div class="wec-name" style="color:${bg};">${ev.event}</div>
          <div class="wec-client" style="color:${bg};">${ev.client}</div>
        </div>`;
      });
    }
    html += `</div></div>`;
  });

  html += "</div>";
  document.getElementById("calBody").innerHTML = html;

  document.querySelectorAll(".week-event-card").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      showDetail(bookings[+el.dataset.ei]);
    });
  });
}

function renderDay() {
  const d = todayViewDate;
  const evs = eventsOnDay(d);
  const dayLabel = d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  document.getElementById("calPeriodLabel").textContent = d.toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" },
  );

  let html = `<div class="day-view-header">${d.toLocaleDateString("en-US", { weekday: "long" })}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}</div>`;

  if (evs.length === 0) {
    html += `<div class="day-no-bookings"><div class="big-icon">📅</div>No bookings on this day.</div>`;
  } else {
    html += `<div class="day-view-sub">${evs.length} booking${evs.length > 1 ? "s" : ""}</div>`;
    evs.forEach((ev) => {
      const bg = statusColor(ev.status);
      const fmt = (d) =>
        d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      const dateStr =
        ev.fromDate === ev.toDate
          ? fmt(ev._from)
          : fmt(ev._from) + " – " + fmt(ev._to);
      html += `<div class="day-booking-card" data-ei="${bookings.indexOf(ev)}">
        <div class="day-booking-color-bar" style="background:${bg};"></div>
        <div style="flex:1;min-width:0;">
          <div class="day-booking-name">${ev.event}</div>
          <div class="day-booking-meta">${ev.client} &nbsp;·&nbsp; ${ev.hotel}</div>
          <div class="day-booking-meta" style="margin-top:3px;">${dateStr} &nbsp;·&nbsp; <span style="color:${bg};font-weight:600;">${ev.status}</span> &nbsp;·&nbsp; Contract: ${ev.contract}</div>
        </div>
      </div>`;
    });
  }

  document.getElementById("calBody").innerHTML = html;

  document.querySelectorAll(".day-booking-card").forEach((el) => {
    el.addEventListener("click", () => showDetail(bookings[+el.dataset.ei]));
  });
}

function render() {
  document.getElementById("detailPanel").classList.remove("show");
  if (currentView === "month") renderMonth();
  else if (currentView === "week") renderWeek();
  else renderDay();
}

// Render on modal open
// document.getElementById('calendarModal').addEventListener('shown.bs.modal', render);
$("#viewCalendarBtn").on("click", () => {
  // Preprocess events: parse dates, assign color index
bookings.forEach((e, i) => {
  e._from = new Date(e.fromDate + "T00:00:00");
  e._to = new Date(e.toDate + "T00:00:00");
  e._ci = i % 5; // color index
});

  $("#informativeModal .modal-title").text("Bookings Calendar");
  $("#informativeModal .modal-dialog").addClass("modal-xl");

  $("#informativeModal .modal-body").html(`        <!-- Toolbar -->
    <div class="cal-toolbar">
      <button class="cal-nav-btn" id="prevBtn">&#8592;</button>
      <span class="cal-heading" id="calPeriodLabel"></span>
      <button class="cal-nav-btn" id="nextBtn">&#8594;</button>
      <div style="flex:1"></div>
      <button class="today-btn" id="todayBtn">Today</button>
      <button class="view-btn active" data-view="month">Month</button>
      <button class="view-btn" data-view="week">Week</button>
    </div>

    <!-- Event detail panel -->
    <div class="event-detail-panel" id="detailPanel">
      <button class="edp-close" id="closeDetail">&times;</button>
      <h6 id="dp-title"></h6>
      <div style="margin-bottom:0.4rem;">
        <span id="dp-dates" style="color:rgba(255,255,255,0.65);"></span>
        <span class="badge-status ms-2" id="dp-status"></span>
        <span id="dp-contract" class="badge-status ms-1" style="background:#334;color:#aac;"></span>
      </div>
      <div><span style="color:rgba(255,255,255,0.5);">Client:</span> <span id="dp-client"></span></div>
      <div><span style="color:rgba(255,255,255,0.5);">Venue:</span> <span id="dp-hotel"></span></div>
    </div>

    <!-- Calendar render area -->
    <div class="cal-body" id="calBody"></div>

    <!-- Legend -->
    <div class="legend">
      <div class="legend-item"><div class="legend-dot" style="background:#c84b2f"></div> Confirmed</div>
      <div class="legend-item"><div class="legend-dot" style="background:#2d7a5f"></div> Completed</div>
      <div class="legend-item"><div class="legend-dot" style="background:#8b5cf6"></div> In Progress</div>
    </div>`);
  $("#informativeModal .modal-footer").remove();
  document.getElementById("closeDetail").addEventListener("click", () => {
    document.getElementById("detailPanel").classList.remove("show");
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentView === "month") {
      cursor.setMonth(cursor.getMonth() - 1);
    } else if (currentView === "week") {
      cursor.setDate(cursor.getDate() - 7);
    } else {
      todayViewDate.setDate(todayViewDate.getDate() - 1);
    }
    render();
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentView === "month") {
      cursor.setMonth(cursor.getMonth() + 1);
    } else if (currentView === "week") {
      cursor.setDate(cursor.getDate() + 7);
    } else {
      todayViewDate.setDate(todayViewDate.getDate() + 1);
    }
    render();
  });

  document.getElementById("todayBtn").addEventListener("click", () => {
    todayViewDate = new Date();
    cursor = new Date();
    cursor.setDate(1);
    currentView = "day";
    document
      .querySelectorAll(".view-btn")
      .forEach((b) => b.classList.remove("active"));
    render();
  });

  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentView = btn.dataset.view;
      document
        .querySelectorAll(".view-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (currentView === "month") {
        cursor = new Date();
        cursor.setDate(1);
      } else if (currentView === "week") {
        cursor = new Date();
      }
      render();
    });
  });
  render();
  $("#informativeModal").modal("show");
});

$(document).ready(() => {
  fetchBookings()
})