import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { ThemeToggle } from "@/components/theme-toggle";

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
          <SiteNav variant="desktop" />
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
      <SiteNav variant="mobile" />
    </>
  );
}
