// ===== 환율 =====

const KRW_PER_USD = 1400;      // 예시 값

const STORAGE_KEY = "goodsPlan";

// ===== 저장 =====
// [{ eventId, goodsId, qty, status: "wish" | "buy" }]
function loadPlan() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
        return [];
    }
}
function savePlan() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
}

// ===== 상태 =====
let plan = loadPlan();
let currentTab = "wish";
let currentCurrency = "JPY";

const events = eventPageData.filter(function (e) {
    return (e.goods || []).length > 0;
});
let currentEventId = events.length ? events[0].id : null;

// ===== 요소 =====
const $ = function (s) { return document.querySelector(s); };
const eventSelect = $("#eventSelect");
const listEl = $("#plannerList");
const emptyEl = $("#plannerEmpty");
const totalEl = $("#totalPrice");

// ===== 금액 표시 =====
function formatPrice(jpy) {
    const krw = jpy * KRW_PER_JPY;
    if (currentCurrency === "KRW") return "₩ " + Math.round(krw).toLocaleString();
    if (currentCurrency === "USD") return "$ " + (krw / KRW_PER_USD).toFixed(2);
    return "¥ " + Math.round(jpy).toLocaleString();
}

function findEvent(id) {
    return events.find(function (e) { return e.id === id; });
}

// ===== 그리기 =====
function renderPicker() {
    const ev = findEvent(currentEventId);
    if (!ev) return;
    $("#pickerImage").src = ev.image;
    $("#pickerTitle").textContent = ev.title;
    $("#pickerDate").textContent = ev.date;
}

function render() {
    const ev = findEvent(currentEventId);
    if (!ev) {
        listEl.innerHTML = "";
        emptyEl.hidden = false;
        return;
    }

    const items = plan.filter(function (p) {
        return p.eventId === currentEventId && p.status === currentTab;
    });

    let total = 0;

    listEl.innerHTML = items.map(function (p) {
        const g = ev.goods.find(function (x) { return x.id === p.goodsId; });
        if (!g) return "";
        total += (g.priceJpy || 0) * p.qty;

        return `
            <li class="plannerItem" data-id="${g.id}">
                <img src="${g.image || ""}" alt="${g.name}">
                <div class="plannerInfo">
                    <strong>${g.name}</strong>
                    <small>${g.note || "&nbsp;"}</small>
                    <span class="plannerPrice">${formatPrice(g.priceJpy || 0)}</span>
                </div>
                <div class="stepper">
                    <button type="button" data-action="minus" aria-label="수량 줄이기">−</button>
                    <span>${p.qty}</span>
                    <button type="button" data-action="plus" aria-label="수량 늘리기"
                        ${g.limit && p.qty >= g.limit ? "disabled" : ""}>+</button>
                </div>
            </li>`;
    }).join("");

    emptyEl.hidden = items.length > 0;
    totalEl.textContent = formatPrice(total);
}

// ===== 이벤트 =====
// 행사 선택
eventSelect.innerHTML = events.map(function (e) {
    return `<option value="${e.id}">${e.title}</option>`;
}).join("");
eventSelect.addEventListener("change", function () {
    currentEventId = Number(eventSelect.value);
    renderPicker();
    render();
});

// 탭
document.querySelector(".plannerTabs").addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-tab]");
    if (!btn) return;
    currentTab = btn.dataset.tab;
    document.querySelectorAll(".plannerTabs button").forEach(function (b) {
        const on = b === btn;
        b.classList.toggle("active", on);
        b.setAttribute("aria-selected", String(on));
    });
    render();
});

// 통화
document.querySelector(".currencyToggle").addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-currency]");
    if (!btn) return;
    currentCurrency = btn.dataset.currency;
    document.querySelectorAll(".currencyToggle button").forEach(function (b) {
        const on = b === btn;
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", String(on));
    });
    render();
});

// 수량 조절 (이벤트 위임)
listEl.addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;

    const goodsId = btn.closest(".plannerItem").dataset.id;
    const item = plan.find(function (p) {
        return p.eventId === currentEventId && p.goodsId === goodsId && p.status === currentTab;
    });
    if (!item) return;

    const ev = findEvent(currentEventId);
    const g = ev.goods.find(function (x) { return x.id === goodsId; });

    if (btn.dataset.action === "plus") {
        if (!g.limit || item.qty < g.limit) item.qty += 1;
    } else {
        item.qty -= 1;
        if (item.qty <= 0) plan = plan.filter(function (p) { return p !== item; });
    }
    savePlan();
    render();
});

// 굿즈 추가 팝업
const addDialog = $("#addDialog");
$("#addGoodsButton").addEventListener("click", function () {
    const ev = findEvent(currentEventId);
    if (!ev) return;
    $("#addDialogList").innerHTML = ev.goods.map(function (g) {
        return `
            <li>
                <span>${g.name} <small>${formatPrice(g.priceJpy || 0)}</small></span>
                <button type="button" class="textButton" data-add="${g.id}">담기</button>
            </li>`;
    }).join("");
    addDialog.showModal();
});

$("#addDialogList").addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-add]");
    if (!btn) return;

    const exists = plan.find(function (p) {
        return p.eventId === currentEventId && p.goodsId === btn.dataset.add && p.status === currentTab;
    });
    if (!exists) {
        plan.push({ eventId: currentEventId, goodsId: btn.dataset.add, qty: 1, status: currentTab });
        savePlan();
        render();
    }
    btn.textContent = "담음 ✓";
    btn.disabled = true;
});
$("#addDialogClose").addEventListener("click", function () { addDialog.close(); });

// ===== 시작 =====
$("#rateInfo").textContent = "환율 정보: " + (KRW_PER_JPY * 100).toFixed(2) + " 원";
renderPicker();
render();