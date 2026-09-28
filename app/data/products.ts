export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFaq {
  q: string;
  a: string;
}

export interface Product {
  slug: string;
  name: string;
  nameEn: string;
  /** 같은 제품을 부르는 다른 표기. 검색 유입용 (예: 미듐필터 ↔ 미디움필터) */
  aliases?: string[];
  shortDesc: string;
  description: string;
  color: string;
  href: string;
  specs: ProductSpec[];
  tags: string[];
  applications: string[];
  replacementCycle: string;
  faqs: ProductFaq[];
}

export const products: Product[] = [
  {
    slug: "pre-filter",
    name: "프리필터",
    nameEn: "Pre Filter",
    aliases: ["부직포필터", "프리필타", "1차필터"],
    shortDesc:
      "1차 여과용 필터로 대형 먼지 입자를 효과적으로 제거합니다. 후단 필터의 수명을 연장시키는 경제적인 선택.",
    description:
      "프리필터는 공조 시스템의 1차 방어선입니다. 10μm 이상의 대형 먼지 입자, 섬유, 꽃가루 등을 포집하여 후단의 고효율 필터(미듐·헤파)의 수명을 연장시킵니다. 경제적인 유지비와 간편한 교체가 장점이며, 대부분의 산업용 공조 설비에 기본으로 적용됩니다.",
    color: "blue",
    href: "https://smartstore.naver.com/egfilter/category/9728cdd20dc84ebdbee8601bd21e49b5?cp=1",
    specs: [
      { label: "여과 등급", value: "G2 ~ G4 (EN 779) / ISO Coarse" },
      { label: "여과 효율", value: "60~90% (10μm 기준)" },
      { label: "소재", value: "부직포, 합성섬유, 폴리에스터" },
      { label: "프레임", value: "알루미늄, 종이, 스테인리스" },
      { label: "사용 온도", value: "최대 80°C" },
      { label: "규격", value: "300×300 ~ 610×610mm (제작 가능 여부는 판매처 확인)" },
    ],
    tags: ["대형 입자 제거", "경제적 유지비", "다양한 규격"],
    applications: ["일반 공조(AHU)", "도장 부스 프리코트", "산업 환기 설비", "빌딩 공조"],
    replacementCycle: "1~3개월 (사용 환경에 따라 상이)",
    faqs: [
      {
        q: "프리필터는 얼마나 자주 교체해야 하나요?",
        a: "일반 환경은 1~3개월, 분진·털·연기가 많은 환경(기공실·동물병원·도장부스 등)은 2주~1개월 주기를 권장합니다. 프리필터를 부지런히 갈수록 후단의 고가 필터 수명이 길어져 총비용이 내려갑니다.",
      },
      {
        q: "프리필터만 써도 되나요?",
        a: "프리필터는 10μm 이상의 큰 입자를 잡는 1차 여과용입니다. 미세먼지나 초미세 입자까지 관리하려면 후단에 미듐필터 또는 헤파필터를 함께 구성해야 합니다. 용도를 알려주시면 조합을 제안해 드립니다.",
      },
      {
        q: "원하는 크기로 제작이 가능한가요?",
        a: "제작 가능한 규격과 옵션은 판매 모델별로 확인이 필요합니다. 기존 필터의 가로·세로·두께를 실측해 스마트스토어에서 제작 가능 여부와 견적 조건을 확인하세요.",
      },
    ],
  },
  {
    slug: "hepa-filter",
    name: "헤파필터",
    nameEn: "HEPA Filter",
    aliases: ["HEPA필터", "헤파필타", "고성능필터"],
    shortDesc:
      "H13·H14 등급 모델을 확인할 수 있는 고효율 에어필터입니다. 적용 등급과 성능은 모델별 시험 자료를 확인하세요.",
    description:
      "헤파(HEPA) 필터는 고효율 여과가 필요한 설비에 적용합니다. H13·H14 표기와 효율은 제품 모델 및 시험 조건에 따라 확인해야 하며, 필요한 등급은 설비 사양과 해당 모델의 시험성적서를 대조해 선택하세요. 규격, 프레임, 가스켓 등 세부 옵션은 스마트스토어에서 해당 모델 정보를 확인할 수 있습니다.",
    color: "emerald",
    href: "https://smartstore.naver.com/egfilter/category/73f05f21f01145c2b5bcef71caa81639?cp=1",
    specs: [
      { label: "여과 등급", value: "H13 ~ H14 (EN 1822)" },
      { label: "여과 효율", value: "모델별 시험성적서 및 시험 조건 확인" },
      { label: "소재", value: "유리섬유(Glass Fiber) 미디어" },
      { label: "프레임", value: "알루미늄, MDF, 스테인리스" },
      { label: "사용 온도", value: "모델별 사양 확인" },
      { label: "규격", value: "610×610, 305×610mm 등 표준/커스텀" },
    ],
    tags: ["H13·H14 모델 확인", "모델별 시험 자료 확인", "규격·옵션 확인"],
    applications: ["반도체·전자 제조 시설", "제약·식품 제조 시설", "병원 수술실 등 청정도 관리 설비 (설계 사양 확인)"],
    replacementCycle: "6~12개월 (차압 관리 기준)",
    faqs: [
      {
        q: "H13과 H14 중 어떤 등급을 선택해야 하나요?",
        a: "H13·H14 등급과 효율은 제품 모델의 시험성적서 및 시험 조건을 확인해야 합니다. 시설의 설계 기준과 해당 모델 자료를 대조해 선택하고, 등급 표기만으로 특정 공간에 적합하다고 판단하지 마세요.",
      },
      {
        q: "헤파필터는 세척해서 재사용할 수 있나요?",
        a: "일반 유리섬유 헤파필터는 세척·재사용을 전제로 구매하지 마세요. 교체 시점은 제조사 사양과 설비의 차압 관리 기준을 확인하세요.",
      },
      {
        q: "필요한 규격과 개스킷 옵션은 어떻게 확인하나요?",
        a: "제작 가능 규격과 개스킷 옵션은 모델 및 재고 구성에 따라 다를 수 있습니다. 기존 필터의 라벨과 실측 치수를 준비해 스마트스토어에서 제작 가능 여부와 조건을 확인하세요.",
      },
    ],
  },
  {
    slug: "medium-filter",
    name: "미듐필터",
    nameEn: "Medium Filter",
    aliases: ["미디움필터", "미디엄필터", "중성능필터"],
    shortDesc:
      "중간 등급 여과용 필터입니다. 적용 등급과 규격은 판매 모델별 자료를 확인하세요.",
    description:
      "미듐필터(미디움필터)는 공조 설비의 요구 성능과 설치 공간에 맞춰 고르는 중간 효율 필터입니다. 현장에서는 미듐필터·미디움필터·중성능필터라는 이름을 사용합니다. 등급 표기와 여과 성능은 적용 표준 및 제품 모델에 따라 다르므로, 보유 설비의 사양과 해당 모델 자료를 확인하세요. 백형(Bag), 판형(Panel), V형 등 형태와 규격은 판매 모델별로 확인할 수 있습니다.",
    color: "violet",
    href: "https://smartstore.naver.com/egfilter/category/fa2d50909bf8410b9fa379356a84f429?cp=1",
    specs: [
      { label: "여과 등급", value: "F5 ~ F9 (EN 779 표기; ISO 16890 등급은 모델별 자료 확인)" },
      { label: "여과 효율", value: "해당 모델의 시험 자료 확인" },
      { label: "소재", value: "합성섬유, 유리섬유" },
      { label: "형태", value: "백(Bag)형, 판형, V-Bank형" },
      { label: "사용 온도", value: "모델별 사양 확인" },
      { label: "규격", value: "594×594, 490×592mm 등 (판매 모델 확인)" },
    ],
    tags: ["중간 등급 여과", "모델별 등급 확인", "규격·형태 선택"],
    applications: ["일반 공장 공조", "사무실·상업 건물", "도장 부스 2차 필터", "전자 부품 제조"],
    replacementCycle: "3~6개월 (차압 관리 기준)",
    faqs: [
      {
        q: "미듐필터와 미디움필터는 다른 제품인가요?",
        a: "현장과 판매처에 따라 Medium Filter를 미듐필터·미디움필터·미디엄필터·중성능필터로 부르기도 합니다. 다만 실제 등급과 사양은 이름만으로 단정할 수 없으니 제품 모델 정보를 함께 확인하세요.",
      },
      {
        q: "미듐필터와 헤파필터는 무엇이 다른가요?",
        a: "두 제품군은 등급 표기와 적용 조건이 다릅니다. 필요한 성능은 설비 설계 기준을 먼저 확인하고, 각 후보 모델의 시험 자료와 규격을 대조해 선택하세요. 특정 공간에 필요한 등급은 설계 담당자나 관련 기준을 확인해야 합니다.",
      },
      {
        q: "백형과 판형 중 무엇을 선택해야 하나요?",
        a: "설비의 장착 공간과 풍량에 따라 다릅니다. 백(Bag)형은 여과 면적이 넓어 수명이 길고 대풍량에 유리하며, 판형은 얇아 공간 제약이 있는 설비에 적합합니다. 기존 필터 사진을 보내주시면 동일 형태로 제안해 드립니다.",
      },
      {
        q: "F7과 F9의 차이는 무엇인가요?",
        a: "F7·F9 표기의 의미와 성능은 적용 표준 및 모델 자료에서 확인하세요. 설치 설비의 요구 등급과 치수에 맞는 판매 모델을 비교해 선택하는 것이 좋습니다.",
      },
    ],
  },
  {
    slug: "roll-filter",
    name: "부직포롤필터",
    nameEn: "Non-woven Roll Filter",
    aliases: ["부직포롤", "롤필터", "부직포 원단", "재단필터"],
    shortDesc:
      "15T·20T, 폭 1,000·1,200mm, 길이 20m 규격의 부직포 롤필터입니다. 세부 옵션은 판매 페이지에서 확인하세요.",
    description:
      "부직포롤필터는 롤 형태의 에어필터 원단입니다. 현재 안내되는 규격은 두께 15T·20T, 폭 1,000·1,200mm, 길이 20m이며, 판매 옵션과 재고는 스마트스토어에서 확인하세요. 사용 설비의 장착 공간과 요구 사양에 맞는지 구매 전에 치수를 대조해 주세요.",
    color: "amber",
    href: "https://smartstore.naver.com/egfilter/category/d060caacb48a4cb3ab9c86678374422a?cp=1",
    specs: [
      { label: "여과 등급", value: "G2 ~ G4" },
      { label: "소재", value: "폴리에스터 부직포" },
      { label: "두께", value: "15T / 20T" },
      { label: "폭", value: "1,000 / 1,200mm" },
      { label: "길이", value: "20m / 롤" },
      { label: "사용 온도", value: "모델별 사양 확인" },
    ],
    tags: ["롤 형태", "15T·20T 규격", "폭·길이 옵션 확인"],
    applications: ["공조기 프리필터 교체", "도장 부스 바닥/천장", "산업 환기 설비", "일반 흡배기구"],
    replacementCycle: "1~2개월 (오염도에 따라)",
    faqs: [
      {
        q: "롤필터는 어떻게 잘라서 쓰나요?",
        a: "가위나 커터로 원하는 크기에 맞춰 자유롭게 재단하면 됩니다. 프레임형 필터와 달리 규격 제약이 없어, 다양한 설비의 흡기구·배기구·프리필터 자리에 맞춰 쓸 수 있습니다.",
      },
      {
        q: "두께는 어떤 기준으로 선택하나요?",
        a: "현재 안내 규격은 15T와 20T입니다. 설비의 장착 공간과 요구 사양을 확인해 두께를 고르고, 판매 페이지에서 선택 가능한 옵션을 확인하세요.",
      },
      {
        q: "가격과 배송 조건은 어디서 확인하나요?",
        a: "판매 가격, 재고, 배송 및 대량 주문 조건은 스마트스토어에서 확인하세요. 구매 전 필요한 폭·두께·길이를 설비 치수와 대조해 주세요.",
      },
    ],
  },
];

export const colorMap: Record<
  string,
  { bar: string; bg: string; text: string; light: string }
> = {
  blue: {
    bar: "bg-blue-600",
    bg: "bg-blue-600/10",
    text: "text-blue-600",
    light: "bg-blue-50",
  },
  emerald: {
    bar: "bg-emerald-600",
    bg: "bg-emerald-600/10",
    text: "text-emerald-600",
    light: "bg-emerald-50",
  },
  violet: {
    bar: "bg-violet-600",
    bg: "bg-violet-600/10",
    text: "text-violet-600",
    light: "bg-violet-50",
  },
  amber: {
    bar: "bg-amber-600",
    bg: "bg-amber-600/10",
    text: "text-amber-600",
    light: "bg-amber-50",
  },
};
