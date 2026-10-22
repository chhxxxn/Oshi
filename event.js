
// HTML 요소 선택
const eventPageGrid = document.querySelector("#eventPageGrid");
const eventPageCategories = document.querySelector("#eventPageCategories");
const eventPageSort = document.querySelector("#eventPageSort");
const eventPageCount = document.querySelector("#eventPageCount");
const eventPageEmpty = document.querySelector("#eventPageEmpty");

let selectedEventCategory = "전체";

// 상세 페이지로 이동
function openEventDetail(card) {
    location.href = `event_detail.html?id=${card.dataset.eventId}`;
}

// 행사 목록 출력
function renderEventPage() {
    if (!eventPageGrid) return;

    let filteredEvents = eventPageData.filter(function(event) {
        return selectedEventCategory === "전체" ||
               event.category === selectedEventCategory;
    });

    // 정렬
    if (eventPageSort.value === "latest") {
        filteredEvents.sort(function(a, b) {
            return a.startDate.localeCompare(b.startDate);
        });
    } else {
        filteredEvents.sort(function(a, b) {
            return b.popularity - a.popularity;
        });
    }

    // 카드 만들기
    eventPageGrid.innerHTML = filteredEvents.map(function(event) {
        return `
            <article class="eventCard"
                     tabindex="0"
                     role="link"
                     aria-label="${event.title} 상세 페이지 보기"
                     data-event-id="${event.id}">

                <img class="eventImage"
                     src="${event.image}"
                     alt="${event.title}">

                <div class="eventInfo">
                    <span class="eventCategory">
                        ${event.category}
                    </span>

                    <h3>${event.title}</h3>

                    <p class="eventDate">${event.date}</p>
                </div>
            </article>
        `;
    }).join("");

    eventPageCount.textContent =
        `전체 행사 ${filteredEvents.length}개`;

    eventPageEmpty.hidden = filteredEvents.length > 0;
}

if (eventPageGrid) {
    // 카테고리 선택
    eventPageCategories.addEventListener("click", function(e) {
        const button = e.target.closest(".categoryButton");
        if (!button) return;

        selectedEventCategory = button.dataset.category;

        document.querySelectorAll(
            "#eventPageCategories .categoryButton"
        ).forEach(function(item) {
            const isActive = item === button;
            item.classList.toggle("active", isActive);
            item.setAttribute("aria-pressed", String(isActive));
        });

        renderEventPage();
    });

    // 정렬 변경
    eventPageSort.addEventListener("change", renderEventPage);

    // 카드 클릭
    eventPageGrid.addEventListener("click", function(e) {
        const card = e.target.closest(".eventCard");
        if (card) openEventDetail(card);
    });

    // 키보드 조작
    eventPageGrid.addEventListener("keydown", function(e) {
        const card = e.target.closest(".eventCard");

        if (card && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            openEventDetail(card);
        }
    });

    renderEventPage();
}


/* 행사 상세 페이지 */
const eventDetailContent = document.querySelector("#eventDetailContent");

// localStorage 목록 읽기/토글 (찜, 캘린더 공용)
function getList(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch (e) {
        return [];
    }
}

function toggleList(key, id) {
    const list = getList(key);
    const next = list.includes(id)
        ? list.filter(function (item) { return item !== id; })
        : list.concat(id);
    localStorage.setItem(key, JSON.stringify(next));
    return next.includes(id);
}

// 토글 버튼 공통 처리 (찜, 캘린더 저장)
function setupToggleButton(selector, storageKey, id, onText, offText) {
    const button = document.querySelector(selector);
    if (!button) return;

    button.addEventListener("click", function () {
        const now = toggleList(storageKey, id);
        button.classList.toggle("active", now);
        button.setAttribute("aria-pressed", String(now));
        button.textContent = now ? onText : offText;
    });
}

if (eventDetailContent) {
    const params = new URLSearchParams(location.search);
    const eventId = Number(params.get("id"));

    const selectedEvent = eventPageData.find(function (event) {
        return event.id === eventId;
    });

    if (selectedEvent) {
        const ev = selectedEvent;
        document.title = `${ev.title} | 오시`;

        const highlightsHtml = (ev.highlights || []).map(function (h) {
            return `
                <li class="highlightCard">
                    ${h.image ? `<img class="cardImage" src="${h.image}" alt="${h.title}">` : ""}
                    <div class="cardBody">
                        <strong>${h.title}</strong>
                        <p>${h.text}</p>
                    </div>
                </li>`;
        }).join("");

        const GOODS_PREVIEW = 4;
        const goodsItems = ev.goods || [];

        const goodsHtml = goodsItems.slice(0, GOODS_PREVIEW).map(function (g) {
            return `
                <li class="goodsCard">
                    ${g.image ? `<img class="cardImage" src="${g.image}" alt="${g.name}">` : ""}
                    <div class="cardBody">
                        <strong class="goodsName">${g.name}</strong>
                        <span class="goodsPrice">${goodsPriceText(g)}</span>
                        ${g.note ? `<small class="goodsNote">${g.note}</small>` : ""}
                    </div>
                </li>`;
        }).join("");

        const noticesHtml = (ev.notices || []).map(function (n) {
            return `<li>${n}</li>`;
        }).join("");

        const isWished = getList("wishEvents").includes(ev.id);
        const isInCalendar = getList("calendarEvents").includes(ev.id);

        eventDetailContent.innerHTML = `
            <div class="detailLayout">
                <img class="eventDetailImage" src="${ev.image}" alt="${ev.title}">

                <div class="detailSummary">
                    <span class="eventCategory">${ev.category}</span>
                    <h1>${ev.title}</h1>

                    <dl class="detailInfo">
                        <div><dt>기간</dt><dd>${ev.date}</dd></div>
                        <div><dt>장소</dt><dd>${ev.place || "추후 공개"}</dd></div>
                        <div><dt>운영시간</dt><dd>${ev.time || "추후 공개"}</dd></div>
                        <div><dt>입장료</dt><dd>${ev.price || "추후 공개"}</dd></div>
                    </dl>

                    <button type="button" id="calendarButton"
                            class="primaryButton ${isInCalendar ? "active" : ""}"
                            aria-pressed="${isInCalendar}">
                        ${isInCalendar ? "✓ 캘린더에 저장됨" : "캘린더에 저장하기"}
                    </button>

                    <div class="detailActions">
                        <button type="button" id="wishButton"
                                class="actionButton ${isWished ? "active" : ""}"
                                aria-pressed="${isWished}">
                            ${isWished ? "♥ 찜한 행사" : "♡ 행사 찜하기"}
                        </button>
                        <a class="actionButton" href="${ev.link || "#"}"
                           target="_blank" rel="noopener">
                            공식 안내 보기
                        </a>
                    </div>

                    ${ev.place ? `
                    <div class="mapBox">
                        <iframe
                            title="${ev.title} 행사장 지도"
                            src="https://maps.google.com/maps?q=${encodeURIComponent(ev.mapQuery || ev.place)}&output=embed&hl=ko"
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                            allowfullscreen></iframe>
                    </div>` : ""}

                </div>
            </div>

            <section class="detailBody" id="detailIntro">
                <h2>행사 소개</h2>
                <p>${ev.description || "소개가 준비 중이에요."}</p>
            </section>

            ${highlightsHtml ? `
            <section class="detailBody" id="detailMain">
                <h2>주요 콘텐츠</h2>
                <ul class="highlightList">${highlightsHtml}</ul>
            </section>` : ""}

            ${goodsHtml ? `
            <section class="detailBody" id="detailGoods">
                <div class="sectionHeading">
                    <h2>판매 굿즈</h2>
                    ${goodsItems.length > GOODS_PREVIEW ? `
                    <a class="textButton" href="goods.html?eventId=${ev.id}">전체 보기 ▶</a>` : ""}
                </div>
                <ul class="goodsList">${goodsHtml}</ul>
            </section>` : ""}

            ${noticesHtml ? `
            <section class="detailBody" id="detailNotice">
                <h2>유의사항</h2>
                <ul class="noticeList">${noticesHtml}</ul>
            </section>` : ""}
        `;

        // 버튼 동작 연결
        setupToggleButton("#wishButton", "wishEvents", ev.id,
            "♥ 찜한 행사", "♡ 행사 찜하기");
        setupToggleButton("#calendarButton", "calendarEvents", ev.id,
            "✓ 캘린더에 저장됨", "캘린더에 저장하기");
    } else {
        eventDetailContent.innerHTML = `<h1>행사를 찾을 수 없어요.</h1>`;
    }
}