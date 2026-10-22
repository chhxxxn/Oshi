const events = eventPageData;

const eventGrid = document.querySelector("#eventGrid");
const categoryList = document.querySelector("#categoryList");
const resetButton = document.querySelector("#resetButton");
const emptyMessage = document.querySelector("#emptyMessage");

const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");

let currentCategory = "전체";
let currentKeyword = "";

// 행사 목록 표시
function renderEvents() {
    const filteredEvents = events.filter(event => {
        const matchesCategory =
            currentCategory === "전체" ||
            event.category === currentCategory;

        const searchText =
            `${event.title} ${event.category}`.toLowerCase();

        const matchesKeyword =
            searchText.includes(currentKeyword.toLowerCase());

        return matchesCategory && matchesKeyword;
    });

    eventGrid.innerHTML = filteredEvents.map(event => `
    <a class="eventCard"
       href="event_detail.html?id=${event.id}"
       aria-label="${event.title} 상세 페이지 보기">
        <img
            class="eventImage"
            src="${event.image}"
            alt="${event.title}"
        >
        <div class="eventInfo">
            <span class="eventCategory">${event.category}</span>
            <h3>${event.title}</h3>
            <p class="eventDate">${event.date}</p>
        </div>
    </a>
    `).join("");

    emptyMessage.hidden = filteredEvents.length !== 0;
}

// 검색 실행
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    currentKeyword = searchInput.value.trim();
    renderEvents();
});

// 카테고리 선택
categoryList.addEventListener("click", function (event) {
    const button = event.target.closest(".categoryButton");

    if (!button) return;

    currentCategory = button.dataset.category;

    document.querySelectorAll(".categoryButton").forEach(item => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
    });

    renderEvents();
});

renderEvents();

