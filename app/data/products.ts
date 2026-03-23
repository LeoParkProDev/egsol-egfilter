export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  nameEn: string;
  shortDesc: string;
  description: string;
  color: string;
  href: string;
  specs: ProductSpec[];
  tags: string[];
  applications: string[];
  replacementCycle: string;
}

export const products: Product[] = [
  {
    slug: "pre-filter",
    name: "프리필터",
    nameEn: "Pre Filter",
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
      { label: "규격", value: "300×300 ~ 610×610mm (커스텀 가능)" },
    ],
    tags: ["대형 입자 제거", "경제적 유지비", "다양한 규격"],
    applications: ["일반 공조(AHU)", "도장 부스 프리코트", "산업 환기 설비", "빌딩 공조"],
    replacementCycle: "1~3개월 (사용 환경에 따라 상이)",
  },
  {
    slug: "hepa-filter",
    name: "헤파필터",
    nameEn: "HEPA Filter",
    shortDesc:
      "초미세먼지 99.97% 제거. 클린룸, 정밀 제조 환경에 필수적인 고효율 에어필터입니다.",
    description:
      "헤파(HEPA) 필터는 0.3μm 입자를 99.97% 이상 제거하는 고효율 에어필터입니다. 반도체, 제약, 식품 제조 등 청정 환경이 필수인 공정에 사용됩니다. 클린룸 등급(Class 100~100,000)에 따라 H13, H14 등급을 선택할 수 있으며, 밀봉 테스트를 통해 누설 없는 설치가 보장됩니다.",
    color: "emerald",
    href: "https://smartstore.naver.com/egfilter/category/73f05f21f01145c2b5bcef71caa81639?cp=1",
    specs: [
      { label: "여과 등급", value: "H13 ~ H14 (EN 1822)" },
      { label: "여과 효율", value: "99.97~99.995% (0.3μm MPPS)" },
      { label: "소재", value: "유리섬유(Glass Fiber) 미디어" },
      { label: "프레임", value: "알루미늄, MDF, 스테인리스" },
      { label: "사용 온도", value: "최대 70°C (고온형 350°C)" },
      { label: "규격", value: "610×610, 305×610mm 등 표준/커스텀" },
    ],
    tags: ["99.97% 여과효율", "클린룸 적합", "정밀 제조 필수"],
    applications: ["반도체 클린룸", "제약 GMP 시설", "식품 제조 청정구역", "병원 수술실"],
    replacementCycle: "6~12개월 (차압 관리 기준)",
  },
  {
    slug: "medium-filter",
    name: "미듐필터",
    nameEn: "Medium Filter",
    shortDesc:
      "중간 등급의 여과 성능. 일반 공장 환경에서 가성비 높은 공기 정화를 제공합니다.",
    description:
      "미듐필터는 프리필터와 헤파필터 사이의 중간 효율 필터로, F5~F9 등급의 여과 성능을 제공합니다. 일반 공장, 사무실, 상업 건물의 공조 시스템에 가장 널리 사용되며, 미세먼지(PM2.5~PM10)를 효과적으로 저감합니다. 백형(Bag), 판형(Panel), V형 등 다양한 형태로 제공됩니다.",
    color: "violet",
    href: "https://smartstore.naver.com/egfilter/category/fa2d50909bf8410b9fa379356a84f429?cp=1",
    specs: [
      { label: "여과 등급", value: "F5 ~ F9 (EN 779) / ePM1·ePM2.5" },
      { label: "여과 효율", value: "40~95% (0.4μm 기준)" },
      { label: "소재", value: "합성섬유, 유리섬유" },
      { label: "형태", value: "백(Bag)형, 판형, V-Bank형" },
      { label: "사용 온도", value: "최대 70°C" },
      { label: "규격", value: "592×592, 490×592mm 등" },
    ],
    tags: ["중간 등급 여과", "범용 사용", "가성비 우수"],
    applications: ["일반 공장 공조", "사무실·상업 건물", "도장 부스 2차 필터", "전자 부품 제조"],
    replacementCycle: "3~6개월 (차압 관리 기준)",
  },
  {
    slug: "roll-filter",
    name: "부직포롤필터",
    nameEn: "Non-woven Roll Filter",
    shortDesc:
      "롤 형태로 대량 사용에 최적화. 원하는 크기로 자유롭게 커팅하여 다양한 설비에 적용 가능합니다.",
    description:
      "부직포롤필터는 대량 사용 현장에 최적화된 롤(Roll) 형태의 에어필터 원단입니다. 필요한 크기로 자유롭게 커팅하여 다양한 설비의 흡기구, 배기구, 프리필터 등에 적용할 수 있습니다. 설비 규격에 구애받지 않아 범용성이 뛰어나며, 대량 구매 시 경제적입니다.",
    color: "amber",
    href: "https://smartstore.naver.com/egfilter/category/d060caacb48a4cb3ab9c86678374422a?cp=1",
    specs: [
      { label: "여과 등급", value: "G2 ~ G4" },
      { label: "소재", value: "폴리에스터 부직포" },
      { label: "두께", value: "10~20mm" },
      { label: "폭", value: "1,000 / 1,200 / 2,000mm" },
      { label: "길이", value: "30~50m / 롤" },
      { label: "사용 온도", value: "최대 100°C" },
    ],
    tags: ["자유 커팅", "대량 사용 최적", "다양한 설비 호환"],
    applications: ["공조기 프리필터 교체", "도장 부스 바닥/천장", "산업 환기 설비", "일반 흡배기구"],
    replacementCycle: "1~2개월 (오염도에 따라)",
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
