"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE } from "../data/site";

const navLinks = [
  { label: "제품", href: "/products/pre-filter" },
  { label: "규격 찾기", href: "/size" },
  { label: "병원·의료", href: "/medical" },
  { label: "가이드", href: "/guide" },
  { label: "서비스", href: "/service" },
  { label: "회사", href: "/about" },
];

/** A안 로고 — 'EG' 글자 대신 필터 플리츠(주름) 마크. */
function PleatMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="24" height="24" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 6v14M10.5 6v14M14 6v14M17.5 6v14"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-18">
        <Link href="/" className="flex items-center gap-2.5 text-gray-900">
          <PleatMark />
          <span className="text-lg font-semibold tracking-[-0.01em]">에버그린필터</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-gray-700 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href="https://smartstore.naver.com/egfilter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 transition-colors hover:text-primary"
          >
            스마트스토어
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
          <Link
            href="/quote"
            className="rounded-md bg-primary px-4.5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            사진으로 견적
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 text-gray-700 md:hidden"
          aria-label="메뉴 열기"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-gray-100 bg-white md:hidden">
          <div className="flex flex-col px-6 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-gray-100 py-3.5 text-base font-medium text-gray-800"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 mb-2 flex flex-col gap-2.5">
              {SITE.phone && (
                <a
                  href={SITE.phoneHref}
                  className="rounded-md border border-gray-900 py-3 text-center font-semibold text-gray-900"
                >
                  전화 {SITE.phone}
                </a>
              )}
              <Link
                href="/quote"
                onClick={() => setOpen(false)}
                className="rounded-md bg-primary py-3 text-center font-semibold text-white"
              >
                사진으로 견적 받기
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
