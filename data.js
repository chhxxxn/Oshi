const eventPageData = [
    {
        id: 1,
        title: "괴수 8호 SPECIAL POP-UP STORE",
        category: "팝업스토어",
        date: "2026.10.28 - 2026.11.04",
        startDate: "2026-10-28",
        endDate: "2026-11-04",
        popularity: 70,
        image: "images/event1.jpg",
        place: "AK 플라자 홍대 2F (서울 마포구 양화로 188)",
        mapQuery: "서울 마포구 양화로 188 AK플라자 홍대",
        time: "11:00 ~ 22:00 <br> *주말: 10:30 ~ 22:00",
        price: "무료 입장",
        link: "#",
        description: `괴수 8호 2기 방영 기념<br>팝업 스토어 OPEN!
        <br> 작품의 매력을 담은 팝업 한정 굿즈와 특별한 특전을 만나보세요.
        곳곳에 마련된 포토스팟에서 잊지 못할 추억을 남겨보세요!`,

        // 추가: 주요 콘텐츠
        highlights: [
            { title: "한정 굿즈", text: "팝업 한정 굿즈를 만나볼 수 있어요." , 
                image: "images/highlight1.jpg"
            },
            { title: "포토스팟", text: "곳곳의 포토스팟에서 추억을 남겨보세요.",
                image: "images/highlight2.jpg"
             },
            { title: "구매 특전", text: "일정 금액 이상 구매 시 특전을 드려요.",
                image: "images/highlight3.jpg"
             }
        ],

        // 추가: 판매 굿즈
        goods: [
            { name: "아크릴 플레이트", price: "22,000원", note: "전 5종 랜덤",
                image: "images/goods1.jpg"
             },
            { name: "랜덤 미니 피규어 스탠드", price: "27,000원", note: "전 6종 랜덤",
                image: "images/goods2.jpg"
             },
            { name: "카프카 담요", price: "60,000원", note: "",
                image: "images/goods3.jpg"
             },
            { name: "랜덤 아크릴 명찰 키홀더", price: "7,000원", note: "전 5종 랜덤",
                image: "images/goods4.jpg"
             },
            { name: "피규어 저금통", price: "76,000원", note: "",
                image: "images/goods5.jpg"
             },
            { name: "방위대 증명 사진풍 포토 카드 2매 세트", price: "3,000원", note: "전 10종 랜덤",
                image: "images/goods6.jpg"
             },
            { name: "폴라로이드풍 포토카드 3매 세트", price: "4,000원", note: "전 25종 랜덤",
                image: "images/goods7.jpg"
             },
            { name: "장패드", price: "25,000원", note: "",
                image: "images/goods8.jpg"
             },
            { name: "마그넷", price: "18,000원", note: "전 2종 랜덤",
                image: "images/goods9.jpg"
             },
            { name: "랜덤 캔뱃지", price: "8,500원", note: "전 6종 랜덤",
                image: "images/goods10.jpg"
             },
            { name: "실리콘 파우치", price: "30,000원", note: "",
                image: "images/goods11.jpg"
             },
            { name: "키비주얼 클리어파일", price: "8,500원", note: "2종",
                image: "images/goods12.jpg"
             }
        ],

        // 추가: 유의사항
        notices: [
            "굿즈는 재고 소진 시 조기 마감될 수 있어요.",
            "일부 상품은 1인당 구매 수량이 제한돼요.",
            "운영 일정과 정보는 현장 사정에 따라 변경될 수 있어요.",
            "구매하신 상품에 불량 사향이 있으신 경우 상품 및 구매 영수증을 지참하시어 당일 내에 재방문해주시면 가장 빠르게 조치해드릴 수 있어요.",
            "불량으로 인한 환불 시 수령하신 상품 및 구매 특전을 모두 반납해주세요.",
            "문의사항은 username@example.com 이메일로 연락 부탁 드려요."
        ]
    },

    {
        id: 2,
        title: "주술회전 POP-UP STORE 「회옥·옥절」",
        category: "팝업스토어",
        date: "2026.11.05 - 2026.11.20",
        startDate: "2026-11-05",
        endDate: "2026-11-20",
        popularity: 88,
        image: "images/event2.jpg"
    },

    {
        id: 3,
        title: "나의 히어로 아카데미아 원화전",
        category: "전시·원화전",
        date: "2026.11.10 - 2026.12.01",
        startDate: "2026-11-10",
        endDate: "2026-12-01",
        popularity: 100,
        image: "images/event3.jpg",
        place: "용산 아이파크몰 3F (서울 용산구 한강대로23길 55)",
        mapQuery: "서울 용산구 한강대로23길 55 아이파크몰 용산점",
        time: "10:00 ~ 20:00 <br> *주말: 11:00 ~ 22:00",
        price: "무료 입장", 
        link: "#",

        // 추가: 판매 굿즈
        goods: [
            { id: "g1-1", name: "“내 영웅 아카데미아” 원화전 공식 도록", priceJpy: 2970,
            limit: 2, note: "구입 개수 제한: 2개", image: "images/g1-1.jpg" },
            { id: "g1-2", name: "브로마이드【Snapshot】", priceJpy: 3300,
            limit: 2, note: "구입 개수 제한: 2개<br>전 15종" , image: "images/g1-2.jpg" },
            { id: "g1-3", name: "아크릴 피규어 미도리야 [Snapshot]", priceJpy: 1650,
            limit: 2, note: "구입 개수 제한: 2개", image: "images/g1-3.jpg" },
            { id: "g1-4", name: "아크릴 키홀더 컬렉션【WORLD BEST HERO", priceJpy: 880,
            limit: 5, note: "전 10종 랜덤", image: "images/g1-4.jpg" },
            { id: "g1-5", name: "펍 미러풍 아크릴 스티커 컬렉션", priceJpy: 770,
            limit: 5, note: "전 16종 랜덤", image: "images/g1-5.jpg" },
            { id: "g1-6", name: "아크릴 ON 박스 피규어", priceJpy: 2750,
            limit: 2, note: "구입 개수 제한: 2개", image: "images/g1-6.jpg" },
            { id: "g1-7", name: "스웨트 백", priceJpy: 4950,
            limit: 2, note: "캔뱃지 3개 포함", image: "images/g1-7.jpg" },
            { id: "g1-8", name: "A2 아트 포스터 2장 세트", priceJpy: 3850,
            limit: 2, note: "구입 개수 제한: 2개", image: "images/g1-8.jpg" },
            { id: "g1-9", name: "세탁 영웅 워시 세탁 그물", priceJpy: 2200,
            limit: 2, note: "구입 개수 제한: 2개", image: "images/g1-9.jpg" },
            { id: "g1-10", name: "푸쿠푸쿠 파우치 내외 미분화 로키군", priceJpy: 2200,
            limit: 2, note: "구입 개수 제한: 2개", image: "images/g1-10.jpg" },
            
        ],
    },

    {
        id: 4,
        title: "사카모토 데이즈 콜라보 카페",
        category: "콜라보카페",
        date: "2026.11.15 - 2026.11.30",
        startDate: "2026-11-15",
        popularity: 82,
        image: "images/event4.jpg"
    }
];

// 환율 (원 단위). 필요하면 직접 수정하세요.
const KRW_PER_JPY = 8.4566;

// 굿즈 가격 표시: 엔화를 기준으로, 원화 환산을 함께 보여줘요
function goodsPriceText(g) {
    if (g.priceJpy) {
        const krw = Math.round(g.priceJpy * KRW_PER_JPY);
        return `¥${g.priceJpy.toLocaleString()} (약 ${krw.toLocaleString()}원)`;
    }
    return g.price || "가격 미정";   // 엔화가 없으면 기존 price 사용
}