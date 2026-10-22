const COLORS = ["#F7B6D2", "#8FD3F4", "#999999", "#B6E3A5", "#FFD98A"];

function getList(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch (e) { return []; }
}

// 저장한 행사만 (색은 id 기준으로 고정)
function getSavedEvents() {
    const ids = getList("calendarEvents");
    return eventPageData
        .filter(function (e) { return ids.includes(e.id) && e.startDate; })
        .map(function (e) {
            return {
                ...e,
                end: e.endDate || e.startDate,
                color: COLORS[e.id % COLORS.length]
            };
        });
}

const today = new Date();
let viewYear = today.getFullYear();
let viewMonth = today.getMonth();     
let selected = null;                  

const gridEl = document.querySelector("#calGrid");
const titleEl = document.querySelector("#calTitle");
const listEl = document.querySelector("#calList");
const emptyEl = document.querySelector("#calEmpty");

// Date → "YYYY-MM-DD" (시간대 영향 없이)
function toKey(y, m, d) {
    return y + "-" + String(m + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0");
}

// 그 날짜가 행사 기간에 들어가는지
function isOnDate(ev, key) {
    return ev.startDate <= key && key <= ev.end;
}

function renderCalendar(events) {
    titleEl.textContent = viewYear + "년 " + (viewMonth + 1) + "월";

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const lastDate = new Date(viewYear, viewMonth + 1, 0).getDate();
    const prevLast = new Date(viewYear, viewMonth, 0).getDate();
    const todayKey = toKey(today.getFullYear(), today.getMonth(), today.getDate());

    let html = "";

    // 앞쪽 빈 칸 (지난달 날짜, 흐리게)
    for (let i = firstDay - 1; i >= 0; i--) {
        html += `<div class="calCell other"><span>${prevLast - i}</span></div>`;
    }

    for (let d = 1; d <= lastDate; d++) {
        const key = toKey(viewYear, viewMonth, d);
        const dow = new Date(viewYear, viewMonth, d).getDay();
        const dots = events.filter(function (e) { return isOnDate(e, key); })
            .slice(0, 3)
            .map(function (e) { return `<i style="background:${e.color}"></i>`; })
            .join("");

        const cls = ["calCell"];
        if (dow === 0) cls.push("sun");
        if (dow === 6) cls.push("sat");
        if (key === todayKey) cls.push("today");
        if (key === selected) cls.push("selected");

        html += `
            <button type="button" class="${cls.join(" ")}" data-key="${key}"
                    aria-label="${viewMonth + 1}월 ${d}일">
                <span>${d}</span>
                <div class="dots">${dots}</div>
            </button>`;
    }

    // 뒤쪽 빈 칸 (다음달 날짜, 흐리게)
    const filled = firstDay + lastDate;
    const rest = (7 - (filled % 7)) % 7;
    for (let i = 1; i <= rest; i++) {
        html += `<div class="calCell other"><span>${i}</span></div>`;
    }

    gridEl.innerHTML = html;
}

function renderList(events) {
    // 보여줄 일정 고르기
    let items;
    if (selected) {
        items = events.filter(function (e) { return isOnDate(e, selected); });
    } else {
        const monthStart = toKey(viewYear, viewMonth, 1);
        const monthEnd = toKey(viewYear, viewMonth, new Date(viewYear, viewMonth + 1, 0).getDate());
        items = events.filter(function (e) {
            return e.startDate <= monthEnd && e.end >= monthStart;
        });
    }
    items.sort(function (a, b) { return a.startDate.localeCompare(b.startDate); });

    if (events.length === 0) {
        listEl.innerHTML = "";
        emptyEl.hidden = false;
        return;
    }
    emptyEl.hidden = true;

    if (items.length === 0) {
        listEl.innerHTML = `<p class="emptyMessage">이 날은 저장한 일정이 없어요.</p>`;
        return;
    }

    // 시작일 기준으로 그룹: "10월 28일"
    const groups = {};
    items.forEach(function (e) {
        (groups[e.startDate] = groups[e.startDate] || []).push(e);
    });

    listEl.innerHTML = Object.keys(groups).map(function (key) {
        const parts = key.split("-");
        const title = Number(parts[1]) + "월 " + Number(parts[2]) + "일";

        const cards = groups[key].map(function (e) {
            const time = (e.time || "").split("<br>")[0].trim();
            return `
                <a class="calCard" href="event_detail.html?id=${e.id}">
                    <i class="calDot" style="background:${e.color}"></i>
                    <strong>${e.title}</strong>
                    <small>${time || "운영시간 추후 공개"}</small>
                    <small>${e.place || "장소 추후 공개"}</small>
                    <small class="calPeriod">${e.date}</small>
                </a>`;
        }).join("");

        return `<h3 class="calDate">${title}</h3>${cards}`;
    }).join("");
}

function render() {
    const events = getSavedEvents();
    renderCalendar(events);
    renderList(events);
}

// 달 이동
function moveMonth(diff) {
    viewMonth += diff;
    if (viewMonth < 0) { viewMonth = 11; viewYear -= 1; }
    if (viewMonth > 11) { viewMonth = 0; viewYear += 1; }
    selected = null;
    render();
}
document.querySelector("#calPrev").addEventListener("click", function () { moveMonth(-1); });
document.querySelector("#calNext").addEventListener("click", function () { moveMonth(1); });

// 날짜 선택 (같은 날 다시 누르면 해제)
gridEl.addEventListener("click", function (e) {
    const cell = e.target.closest(".calCell[data-key]");
    if (!cell) return;
    selected = selected === cell.dataset.key ? null : cell.dataset.key;
    render();
});

// 다른 탭/페이지에서 저장이 바뀌면 갱신
window.addEventListener("storage", render);

render();