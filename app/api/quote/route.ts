import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { SITE } from "../../data/site";

// nodemailer는 Node 런타임이 필요하다 (Edge 불가)
export const runtime = "nodejs";

const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024; // Vercel 서버리스 요청 본문 한도(4.5MB) 안쪽
const ALLOWED_MIME = /^image\/(jpeg|png|webp|heic|heif|gif)$/i;

function str(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.QUOTE_TO || SITE.email;

  // 환경변수가 없으면 클라이언트가 mailto 경로로 넘어가도록 명시적으로 알린다.
  if (!user || !pass) {
    return NextResponse.json({ ok: false, code: "NOT_CONFIGURED" }, { status: 503 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, code: "BAD_REQUEST" }, { status: 400 });
  }

  // 허니팟: 사람은 채우지 않는 필드. 채워져 있으면 봇으로 보고 조용히 성공 처리
  if (str(form.get("website"))) {
    return NextResponse.json({ ok: true });
  }

  const company = str(form.get("company"));
  const person = str(form.get("person"));
  const phone = str(form.get("phone"));
  const email = str(form.get("email"));
  const message = str(form.get("message"));

  if (!phone || !message) {
    return NextResponse.json({ ok: false, code: "MISSING_FIELDS" }, { status: 400 });
  }

  const files = form.getAll("photo").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_FILES) {
    return NextResponse.json({ ok: false, code: "TOO_MANY_FILES" }, { status: 400 });
  }
  const total = files.reduce((n, f) => n + f.size, 0);
  if (total > MAX_TOTAL_BYTES) {
    return NextResponse.json({ ok: false, code: "FILES_TOO_LARGE" }, { status: 413 });
  }
  for (const f of files) {
    if (!ALLOWED_MIME.test(f.type)) {
      return NextResponse.json({ ok: false, code: "BAD_FILE_TYPE" }, { status: 400 });
    }
  }

  const attachments = await Promise.all(
    files.map(async (f, i) => ({
      filename: f.name || `photo-${i + 1}.jpg`,
      content: Buffer.from(await f.arrayBuffer()),
      contentType: f.type,
    })),
  );

  const ua = req.headers.get("user-agent") ?? "";
  const subject = `[견적문의] ${company || "미기재"} / ${person || "담당자"}`;
  const text = [
    `회사·기관: ${company || "-"}`,
    `담당자:    ${person || "-"}`,
    `연락처:    ${phone}`,
    `이메일:    ${email || "-"}`,
    "",
    "문의 내용:",
    message,
    "",
    `첨부 사진: ${files.length}장`,
    "",
    "— 에버그린필터 홈페이지 견적 폼",
    `— ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`,
    ua ? `— ${ua.slice(0, 120)}` : "",
  ].join("\n");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
    await transporter.sendMail({
      from: `"에버그린필터 견적폼" <${user}>`,
      to,
      replyTo: email || undefined,
      subject,
      text,
      attachments,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[quote] 메일 전송 실패:", err);
    return NextResponse.json({ ok: false, code: "SEND_FAILED" }, { status: 500 });
  }
}
