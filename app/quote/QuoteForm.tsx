"use client";

import { useState, type FormEvent } from "react";
import { SITE } from "../data/site";

type Status = "idle" | "sending" | "sent" | "shared" | "mailed" | "copied" | "error";

const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

/**
 * 견적 폼.
 * 1순위: 서버(/api/quote)가 Gmail로 직접 발송 — 사진 첨부 포함, 사장님 메일함에 바로 도착
 * 2순위(서버 미설정·장애 시): 모바일은 Web Share, 그 외는 mailto + 클립보드 복사
 * 어느 경로든 사용자가 쓴 내용이 사라지지 않게 하는 것이 목적이다.
 */
export default function QuoteForm() {
  const [company, setCompany] = useState("");
  const [person, setPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const totalBytes = files.reduce((n, f) => n + f.size, 0);
  const tooLarge = totalBytes > MAX_TOTAL_BYTES;

  const subject = `[견적문의] ${company || "미기재"} / ${person || "담당자"}`;
  const body = [
    `회사명: ${company || "-"}`,
    `담당자: ${person || "-"}`,
    `연락처: ${phone || "-"}`,
    `이메일: ${email || "-"}`,
    "",
    "문의 내용:",
    message || "-",
    "",
    files.length ? `첨부 예정 사진: ${files.map((f) => f.name).join(", ")}` : "(사진 없음 — 라벨 사진이 있으면 회신이 훨씬 빠릅니다)",
    "",
    "— 에버그린필터 홈페이지 견적 폼에서 작성",
  ].join("\n");

  async function fallback() {
    // 모바일: 사진과 함께 공유 시트
    if (files.length && typeof navigator !== "undefined" && navigator.canShare?.({ files })) {
      try {
        await navigator.share({ title: subject, text: body, files });
        setStatus("shared");
        return;
      } catch {
        /* 취소 또는 미지원 — 아래로 */
      }
    }
    // 클립보드 복사 (메일 앱이 없는 환경의 안전망)
    let copied = false;
    try {
      await navigator.clipboard.writeText(`${subject}\n\n${body}`);
      copied = true;
    } catch {
      /* 권한 없음 — 무시 */
    }
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus(copied ? "copied" : "mailed");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (tooLarge) return;
    setStatus("sending");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/quote", { method: "POST", body: fd });
      if (res.ok) {
        setStatus("sent");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { code?: string };
      if (data.code === "NOT_CONFIGURED" || data.code === "SEND_FAILED" || res.status >= 500) {
        await fallback();
        return;
      }
      setStatus("error");
      setErrorMsg(
        data.code === "FILES_TOO_LARGE"
          ? "사진 용량이 큽니다(합계 4MB 이하). 사진을 줄이거나 카카오톡으로 보내주세요."
          : data.code === "BAD_FILE_TYPE"
            ? "이미지 파일(JPG·PNG·HEIC)만 첨부할 수 있습니다."
            : "입력 내용을 확인해 주세요. 연락처와 문의 내용은 필수입니다.",
      );
    } catch {
      await fallback();
    }
  }

  const input =
    "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all";

  if (status === "sent") {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 px-6 py-8 text-center">
        <p className="text-2xl">✅</p>
        <p className="mt-2 text-lg font-extrabold text-green-900">견적 문의가 접수되었습니다</p>
        <p className="mt-2 text-sm text-green-800 leading-relaxed">
          {SITE.replyPromise}.<br />
          급하시면{" "}
          <a href={SITE.kakaoUrl} target="_blank" rel="noopener noreferrer" className="font-bold underline">
            카카오톡 채널
          </a>
          로도 연락 주세요.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 허니팟 — 사람은 보지도 채우지도 않는 필드 */}
      <div className="hidden" aria-hidden="true">
        <label>
          웹사이트
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
        <div>
          <label htmlFor="q-email" className="block text-sm font-bold text-gray-700 mb-2">
            이메일 <span className="text-gray-400 font-semibold">(선택 — 견적서 파일 회신용)</span>
          </label>
          <input
            id="q-email"
            name="email"
            type="email"
            className={input}
            placeholder="example@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
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
        <p className={`mt-1.5 text-xs ${tooLarge ? "text-red-600 font-bold" : "text-gray-500"}`}>
          {tooLarge
            ? `사진 합계 ${(totalBytes / 1024 / 1024).toFixed(1)}MB — 4MB 이하로 줄이거나 카카오톡으로 보내주세요.`
            : "최대 5장, 합계 4MB. 휴대폰에서는 촬영 후 바로 첨부됩니다."}
        </p>
      </div>

      <button
        type="submit"
        disabled={status === "sending" || tooLarge}
        className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
      >
        {status === "sending" ? "보내는 중…" : "견적 문의 보내기"}
      </button>

      {status === "error" && (
        <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">{errorMsg}</p>
      )}
      {status === "shared" && (
        <p className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
          전송 창으로 넘어갔습니다. 카카오톡 채널 또는 메일을 선택해 보내주세요.
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
