"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "제품", href: "/products/pre-filter" },
  { label: "필터 가이드", href: "/guide" },
  { label: "회사소개", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "견적요청", href: "/quote" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">EG</span>
          </div>
          <span className="font-black text-lg text-gray-900">에버그린필터</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold text-gray-600 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://smartstore.naver.com/egfilter"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary-dark text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
          >
            스마트스토어
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-700"
          aria-label="메뉴 열기"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-6 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-bold text-gray-700 py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-3 mt-1 flex flex-col gap-3">
              <a
                href="https://smartstore.naver.com/egfilter"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white text-center font-bold py-3 rounded-lg"
              >
                스마트스토어
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
