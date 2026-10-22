const params = new URLSearchParams(location.search);
const eventId = Number(params.get("eventId"));

const ev = eventPageData.find(function (e) {
    return e.id === eventId;
});

const titleEl = document.querySelector("#goodsPageTitle");
const countEl = document.querySelector("#goodsPageCount");
const listEl = document.querySelector("#goodsPageList");
const emptyEl = document.querySelector("#goodsPageEmpty");
const backLink = document.querySelector("#backLink");

if (!ev) {
    titleEl.textContent = "행사를 찾을 수 없어요.";
    listEl.hidden = true;
} else {
    const goods = ev.goods || [];

    document.title = `${ev.title} 굿즈 | 오시`;
    titleEl.textContent = `${ev.title} 판매 굿즈`;
    countEl.textContent = `총 ${goods.length}개`;
    backLink.href = `event_detail.html?id=${ev.id}`;

    listEl.innerHTML = goods.map(function (g) {
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

    emptyEl.hidden = goods.length > 0;
}