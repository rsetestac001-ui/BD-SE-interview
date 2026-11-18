"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RandomPracticeLink } from "@/components/random-practice-link";
import { randomPracticePath } from "@/lib/practice-random";

const links = [
  { href: "/", label: "首頁" },
  { href: "/mbis", label: "驗樓" },
  { href: "/bo-learning", label: "地圖" },
  { href: "/statutes", label: "法例" },
  { href: "/affairs", label: "時事" },
  { href: randomPracticePath, label: "隨機" },
  { href: "/review", label: "複習" },
  { href: "/sources", label: "出處", desktopOnly: true },
];

function isActive(href: string, pathname: string) {
  const path = href.split("?")[0];
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function SiteNav({ variant }: { variant: "desktop" | "mobile" }) {
  const pathname = usePathname();
  const items = links.filter((link) => variant === "desktop" || !link.desktopOnly);

  if (variant === "desktop") {
    return (
      <nav className="hidden items-center gap-0.5 md:flex" aria-label="主要">
        {items.map((link) => {
          const active = isActive(link.href, pathname);
          const NavLink = link.href === randomPracticePath ? RandomPracticeLink : Link;
          return (
            <NavLink
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-lg px-2 py-2 text-sm ${
                active ? "bg-muted font-medium" : "hover:bg-muted"
              }`}
            >
              {link.label}
            </NavLink>
          );
        })}
      </nav>
    );
  }

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur md:hidden"
      aria-label="流動版主要"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-7">
        {items.map((link) => {
          const active = isActive(link.href, pathname);
          const NavLink = link.href === randomPracticePath ? RandomPracticeLink : Link;
          return (
            <li key={link.href}>
              <NavLink
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`flex h-14 items-center justify-center text-[13px] ${
                  active ? "font-semibold text-primary" : "font-medium"
                }`}
              >
                {link.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
