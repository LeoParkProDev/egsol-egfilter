"use client";

import { useState, type FormEvent } from "react";
import { SITE } from "../data/site";

type Status = "idle" | "shared" | "mailed" | "copied";

/**
 * 백엔드 없이 동작하는 견적 폼.
 * - 모바일(Web Share 지원): 사진을 첨부해 카카오톡·메일 등으로 바로 공유
 * - 그 외: 메일 앱을 mailto로 열고, 동시에 문의 내용을 클립보드에 복사(메일 앱이 없을 때의 안전망)
 * 어느 경로든 사용자가 보낸 내용이 사라지지 않게 하는 것이 목적이다.
 */
export default function QuoteForm() {
  const [company, setCompany] = useState("");
  const [person, setPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  const subject = `[견적문의] ${company || "미기재"} / ${person || "담당자"}`;
  const body = [
    `회사명: ${company || "-"}`,
    `담당자: ${person || "-"}`,
    `연락처: ${phone || "-"}`,
    "",
    "문의 내용:",
    message || "-",
    "",
    files.length ? `첨부 예정 사진: ${files.map((f) => f.name).join(", ")}` : "(사진 없음 — 라벨 사진이 있으면 회신이 훨씬 빠릅니다)",
    "",
    "— 에버그린필터 홈페이지 견적 폼에서 작성",
  ].join("\n");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // 1) 모바일: 사진과 함께 공유 시트 열기 (카카오톡·메일·문자 중 선택)
    if (files.length && typeof navigator !== "undefined" && navigator.canShare?.({ files })) {
      try {
        await navigator.share({ title: subject, text: body, files });
        setStatus("shared");
        return;
      } catch {
        /* 사용자가 취소했거나 미지원 — 아래 경로로 계속 */
      }
    }

    // 2) 클립보드 복사 (메일 앱이 안 열리는 환경의 안전망)
    try {
      await navigator.clipboard.writeText(`${subject}\n\n${body}`);
      setStatus("copied");
    } catch {
      /* 클립보드 권한 없음 — 무시 */
    }

    // 3) 메일 앱 열기
    const href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setStatus((s) => (s === "copied" ? "copied" : "mailed"));
  }

  const input =
    "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="q-company" className="block text-sm font-bold text-gray-700 mb-2">
            회사·기관명
          </label>
          <input
            id="q-company"
            name="company"
            type="text"
            className={input}
            placeholder="○○병원 시설과 / ○○산업"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="q-person" className="block text-sm font-bold text-gray-700 mb-2">
            담당자명
          </label>
          <input
            id="q-person"
            name="person"
            type="text"
            className={input}
            placeholder="홍길동 대리"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="q-phone" className="block text-sm font-bold text-gray-700 mb-2">
          연락처 <span className="text-primary">*</span>
        </label>
        <input
          id="q-phone"
          name="phone"
          type="tel"
          required
          className={input}
          placeholder="010-0000-0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <p className="mt-1.5 text-xs text-gray-500">견적 회신에 사용합니다. 이메일은 필수가 아닙니다.</p>
      </div>

      <div>
        <label htmlFor="q-message" className="block text-sm font-bold text-gray-700 mb-2">
          문의 내용 <span className="text-primary">*</span>
        </label>
        <textarea
          id="q-message"
          name="message"
          rows={5}
          required
          className={`${input} resize-none`}
          placeholder={"예) 헤파필터 610x610x292 표준 알루미늄 10장 / 미듐 594x594x100 20장\n규격을 모르시면 아래에 필터 라벨 사진만 첨부하셔도 됩니다."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="q-photo" className="block text-sm font-bold text-gray-700 mb-2">
          필터 라벨 · 실측 사진 <span className="text-gray-400 font-semibold">(선택 — 있으면 회신이 가장 빠릅니다)</span>
        </label>
        <input
          id="q-photo"
          name="photo"
          type="file"
          accept="image/*"
          multiple
          capture="environment"
          onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
          className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-bold file:text-primary hover:file:bg-primary/20"
        />
        <p className="mt-1.5 text-xs text-gray-500">
          휴대폰에서는 촬영 후 바로 첨부됩니다. 사진은 카카오톡·메일 앱으로 넘어가 전송되며, PC에서는 열린 메일 창에 사진을 끌어다 넣어주세요.
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
      >
        견적 문의 보내기
      </button>

      {status === "shared" && (
        <p className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
          전송 창으로 넘어갔습니다. 카카오톡 채널 또는 메일을 선택해 보내주시면 {SITE.replyPromise.split(",")[0]}해 드립니다.
        </p>
      )}
      {(status === "mailed" || status === "copied") && (
        <p className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800 leading-relaxed">
          메일 앱을 열었습니다. 사진이 있다면 열린 메일에 첨부해 보내주세요.
          {status === "copied" && (
            <>
              {" "}
              메일 앱이 열리지 않으면 — 문의 내용이 <b>복사되어 있으니</b>{" "}
              <a href={SITE.kakaoUrl} target="_blank" rel="noopener noreferrer" className="font-bold underline">
                카카오톡 채널
              </a>
              에 붙여넣어 보내주셔도 됩니다.
            </>
          )}
        </p>
      )}
    </form>
  );
}
