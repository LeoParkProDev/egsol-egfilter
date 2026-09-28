interface StorePurchaseProps {
  href: string;
  productName: string;
  placement: string;
  productCategory?: string;
  productCode?: string;
  optionLabel?: string;
}

export default function StorePurchase({
  href,
  productName,
  placement,
  productCategory,
  productCode,
  optionLabel,
}: StorePurchaseProps) {
  return (
    <div className="rounded-2xl border border-brand-green/20 bg-brand-green/5 p-5 md:p-6">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cta-placement={placement}
        data-product-category={productCategory}
        data-product-code={productCode}
        aria-label={`${productName}, 네이버 스마트스토어에서 옵션과 가격 확인`}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-center font-bold text-white shadow-md transition-colors hover:bg-primary-dark sm:w-auto"
      >
        네이버 스마트스토어에서 옵션·가격 확인
      </a>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">
        최종 옵션과 가격, 배송 조건은 스마트스토어에서 확인해 주세요.
      </p>
      {optionLabel && (
        <p className="mt-1 text-sm leading-relaxed text-gray-600">
          스토어에서 선택할 옵션: <span className="font-semibold">{optionLabel}</span>. 옵션이 자동 선택되지는 않습니다.
        </p>
      )}
      <p className="mt-1 text-sm leading-relaxed text-gray-600">
        규격이 맞지 않거나 맞춤 제작이 필요하면{" "}
        <a href="/quote" className="font-bold text-[#176b50] underline underline-offset-2">
          견적 문의
        </a>
        를 이용해 주세요.
      </p>
    </div>
  );
}
