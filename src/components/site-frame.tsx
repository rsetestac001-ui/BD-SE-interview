import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/", label: "首頁" },
  { href: "/mbis", label: "驗樓" },
  { href: "/practice?mode=random", label: "隨機" },
  { href: "/review", label: "複習" },
  { href: "/sources", label: "出處" },
];

const mobileLinks = links.filter((link) => link.href !== "/sources");

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center gap-3 px-4">
          <Link href="/" className="min-w-0 flex-1">
            <span className="block text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              私人溫習筆記
            </span>
            <span className="block truncate text-base font-semibold">
              合約結構工程師面試
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="主要">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 pb-28 md:pb-10">
        {children}
      </main>
      <footer className="border-t">
        <div className="mx-auto w-full max-w-5xl space-y-3 px-4 py-8 text-sm leading-6 text-muted-foreground">
          <p>
            本網站只供個人溫習，並非法律意見，亦非屋宇署、公務員事務局或任何政府部門的官方網站、招聘平台或訓練材料。
          </p>
          <p>
            法例以電子版香港法例現行文本為準。職位條款以公務員事務局職位編號 50460 的正式廣告為準。條文如有修訂，以立法會通過並刊登的版本為準。
          </p>
        </div>
      </footer>
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur md:hidden"
        aria-label="流動版主要"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-4">
          {mobileLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex h-14 items-center justify-center text-sm font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
