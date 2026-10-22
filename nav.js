
// 메뉴 활성 표시 (데스크톱 상단 + 모바일 하단)
(function () {
    const mobileItems = document.querySelectorAll(".mobileNav .navItem");
    const desktopItems = document.querySelectorAll(".desktopNav a");
    if (mobileItems.length === 0 && desktopItems.length === 0) return;

    // 파일명 구하기 (상세/굿즈 페이지는 행사 메뉴로 취급)
    function getPageName(pathname) {
        const name = pathname.split("/").pop() || "index.html";
        if (name === "event_detail.html" || name === "goods.html") {
            return "event.html";
        }
        return name;
    }

    // #home은 해시가 없는 것과 같게 취급
    function normalizeHash(hash) {
        return hash === "#home" ? "" : hash;
    }

    function isCurrent(item) {
    const url = new URL(item.getAttribute("href"), location.href);
    const result =
        getPageName(url.pathname) === getPageName(location.pathname) &&
        normalizeHash(url.hash) === normalizeHash(location.hash);

    console.log(
        item.textContent.trim(),
        "| 링크:", getPageName(url.pathname), url.hash,
        "| 현재:", getPageName(location.pathname), location.hash,
        "| 활성:", result
    );
    return result;
}

    function updateActive() {
        // 모바일 하단 메뉴
        mobileItems.forEach(function (item) {
            const active = isCurrent(item);
            item.classList.toggle("active", active);
            if (active) {
                item.setAttribute("aria-current", "page");
            } else {
                item.removeAttribute("aria-current");
            }
        });

        // 데스크톱 상단 메뉴
        desktopItems.forEach(function (item) {
            const active = isCurrent(item);
            item.classList.toggle("active", active);
            if (active) {
                item.setAttribute("aria-current", "page");
            } else {
                item.removeAttribute("aria-current");
            }
        });
    }

    window.addEventListener("hashchange", updateActive);
    updateActive();
})();