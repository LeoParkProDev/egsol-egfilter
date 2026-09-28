# 스마트스토어 측정 기준

## 웹사이트 클릭

GA4 `smartstore_click`은 스마트스토어로 나간 클릭 수야. 주문이나 매출로 해석하면 안 돼. 이벤트에는 기존 `page`, `source`와 허용된 `cta_placement`, `product_category`, `product_code`, `destination_path`가 실릴 수 있어. URL 쿼리와 폼 입력값은 보내지 않아.

코드는 이벤트 매개변수만 전송해. 보고서에서 `cta_placement`, `product_category`, `product_code`, `destination_path`를 차원으로 쓰려면 GA4 관리자에서 각각 이벤트 범위 맞춤 측정기준으로 등록해야 해. **등록은 아직 안 됐어.** 등록 전 데이터를 소급해 볼 수 있다고 가정하지 말고, 등록 후 수집된 데이터부터 확인해.

스마트스토어 경로는 `/egfilter`, `/egfilter/products/<숫자ID>`, `/main/products/<숫자ID>`, `/egfilter/category/<영숫자>`만 허용해. 카카오 경로는 채널 토큰과 선택적 `/chat`만 허용해. 경로에는 쿼리 문자열이 포함되지 않아.

## 실제 주문 KPI

네이버 스마트스토어 판매자센터에서 **결제일 기준 고유 주문번호 수**를 세어. 배송중·배송완료·구매확정 주문도 포함해. 전액 취소·전액 환불된 주문은 제외하고, 부분 취소 뒤 유효 상품이 남아 있으면 해당 주문번호를 1건으로 세어. 주문상품 행이나 수량으로 나누지 않고, 모든 기간에 같은 기준을 적용해. 집계에는 합계만 사용하고 원시 고객 정보는 저장하거나 내보내지 않아.

주문번호 수를 구매 KPI로 삼고, GA4 `smartstore_click`은 별도의 클릭 지표로 비교해. 승인된 판매자 데이터와 검증된 귀속 방식이 생기기 전에는 클릭을 주문에 연결했다고 주장하지 않아. 네이버 링크에 임의 UTM이나 `nt` 매개변수를 붙이지 않아.

## 로컬 확인

Node.js 22.6 이상에서 URL·매개변수 검사를 실행해:

```sh
node --experimental-strip-types scripts/check-store-analytics.mjs
```
