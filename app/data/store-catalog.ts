export interface StoreCatalogProduct {
  code: string;
  url: string;
  name: string;
  checkedAt: string;
  optionLabel?: string;
}

// Read-only Naver Commerce API snapshot: unique top-level codes plus exact
// seller-code-matched options explicitly verified for B_ALL. checkedAt is not
// a stock or future availability guarantee.
const catalogProducts: StoreCatalogProduct[] = [
  { code: "B_15_1000", url: "https://smartstore.naver.com/main/products/6473413080", name: "고품질 부직포필터 에어 프리필터 도장부스 여과기 롤", checkedAt: "2026-09-28T13:57:03+09:00", optionLabel: "(A 인기) 15T x 1000mm x 20m" },
  { code: "B_15_1200", url: "https://smartstore.naver.com/main/products/6473413080", name: "고품질 부직포필터 에어 프리필터 도장부스 여과기 롤", checkedAt: "2026-09-28T13:57:03+09:00", optionLabel: "(B) 15T x 1200mm x 20m" },
  { code: "B_20_1000", url: "https://smartstore.naver.com/main/products/6473413080", name: "고품질 부직포필터 에어 프리필터 도장부스 여과기 롤", checkedAt: "2026-09-28T13:57:03+09:00", optionLabel: "(C) 20T x 1000mm x 20m" },
  { code: "B_20_1200", url: "https://smartstore.naver.com/main/products/6473413080", name: "고품질 부직포필터 에어 프리필터 도장부스 여과기 롤", checkedAt: "2026-09-28T13:57:03+09:00", optionLabel: "(D) 20T x 1200mm x 20m" },
  { code: "P_594_287_20", url: "https://smartstore.naver.com/main/products/9388257039", name: "프리필터 공조기 공조용 산업용 / 594 287 20T 알루미늄 프레임", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "DH_PB_610_1220_150", url: "https://smartstore.naver.com/main/products/6855159766", name: "헤파필터 공조기 공조용 산업용 / 610 1220 150T 다풍량 우드", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "DH_PB_610_915_150", url: "https://smartstore.naver.com/main/products/6855159026", name: "헤파필터 공조기 공조용 산업용 / 610 915 150T 다풍량 우드", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "DH_PB_610_762_150", url: "https://smartstore.naver.com/main/products/6855157758", name: "헤파필터 공조기 공조용 산업용 / 610 762 150T 다풍량 우드", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "DH_PB_610_305_150", url: "https://smartstore.naver.com/main/products/6855155844", name: "헤파필터 공조기 공조용 산업용 / 610 305 150T 다풍량 우드", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "H_PB_610_1220_150", url: "https://smartstore.naver.com/main/products/6855153180", name: "헤파필터 공조기 공조용 산업용 / 610 1220 150T 표준 우드", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "H_PB_610_915_150", url: "https://smartstore.naver.com/main/products/6855151354", name: "헤파필터 공조기 공조용 산업용 / 610 915 150T 표준 우드", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "H_PB_610_762_150", url: "https://smartstore.naver.com/main/products/6855149555", name: "헤파필터 공조기 공조용 산업용 / 610 762 150T 표준 우드", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "H_PB_610_305_150", url: "https://smartstore.naver.com/main/products/6855148008", name: "헤파필터 공조기 공조용 산업용 / 610 305 150T 표준 우드", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "DH_610_1220_150", url: "https://smartstore.naver.com/main/products/6855016782", name: "헤파필터 공조기 공조용 산업용 / 610 1220 150T 다풍량 알루미늄", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "DH_610_915_150", url: "https://smartstore.naver.com/main/products/6855015136", name: "헤파필터 공조기 공조용 산업용 / 610 915 150T 다풍량 알루미늄", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "DH_610_762_150", url: "https://smartstore.naver.com/main/products/6855011328", name: "헤파필터 공조기 공조용 산업용 / 610 762 150T 다풍량 알루미늄", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "H_610_1220_150", url: "https://smartstore.naver.com/main/products/6855001354", name: "헤파필터 공조기 공조용 산업용 / 610 1220 150T 표준 알루미늄", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "H_610_915_150", url: "https://smartstore.naver.com/main/products/6855000055", name: "헤파필터 공조기 공조용 산업용 / 610 915 150T 표준 알루미늄", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "H_610_762_150", url: "https://smartstore.naver.com/main/products/6854986045", name: "헤파필터 공조기 공조용 산업용 / 610 762 150T 표준 알루미늄", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "DH_305_305_150", url: "https://smartstore.naver.com/main/products/6483892259", name: "헤파필터 공조기 공조용 산업용 / 305 305 150T 다풍량 알루미늄", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "H_305_305_150", url: "https://smartstore.naver.com/main/products/6483882549", name: "헤파필터 공조기 공조용 산업용 / 305 305 150T 표준 알루미늄", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "H_610_305_150", url: "https://smartstore.naver.com/main/products/6483854267", name: "헤파필터 공조기 공조용 산업용 / 610 305 150T 표준 알루미늄", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "DH_610_305_150", url: "https://smartstore.naver.com/main/products/6483820861", name: "헤파필터 공조기 공조용 산업용 / 610 305 150T 다풍량 알루미늄", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "H_PB_610_610_292", url: "https://smartstore.naver.com/main/products/6436769383", name: "헤파필터 공조기 공조용 산업용 / 610 610 292T 표준 우드", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "DH_PB_610_610_292", url: "https://smartstore.naver.com/main/products/6436755181", name: "헤파필터 공조기 공조용 산업용 / 610 610 292T 다풍량 우드", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "P_594_594_20", url: "https://smartstore.naver.com/main/products/6373168670", name: "프리필터 공조기 공조용 산업용 / 594 594 20T 알루미늄 프레임", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "DH_610_610_292", url: "https://smartstore.naver.com/main/products/6371957961", name: "헤파필터 공조기 공조용 산업용 / 610 610 292T 다풍량 알루미늄", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "DH_610_610_150", url: "https://smartstore.naver.com/main/products/6371949147", name: "헤파필터 공조기 공조용 산업용 / 610 610 150T 다풍량 알루미늄", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "P_594_594_25", url: "https://smartstore.naver.com/main/products/6296535915", name: "프리필터 공조기 공조용 산업용 / 594 594 25T 알루미늄 프레임", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "M_594_594_100", url: "https://smartstore.naver.com/main/products/6287734477", name: "미디움필터 미듐 공조기 공조용 산업용 / 594 594 100T 턱걸이형 가스켓포함", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "H_610_610_292", url: "https://smartstore.naver.com/main/products/6269591161", name: "헤파필터 공조기 공조용 산업용 / 610 610 292T 표준 알루미늄", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "M_594_594_75", url: "https://smartstore.naver.com/main/products/6248878674", name: "미디움필터 미듐 공조기 공조용 산업용 / 594 594 75T 턱걸이형 가스켓포함", checkedAt: "2026-09-28T13:57:03+09:00" },
  { code: "P_594_594_50", url: "https://smartstore.naver.com/main/products/6247798057", name: "프리필터 공조기 공조용 산업용 / 594 594 50T 알루미늄 프레임", checkedAt: "2026-09-28T13:57:03+09:00" },
];

export const storeCatalogByCode = Object.fromEntries(
  catalogProducts.map((product) => [product.code, product]),
) as Record<string, StoreCatalogProduct>;
