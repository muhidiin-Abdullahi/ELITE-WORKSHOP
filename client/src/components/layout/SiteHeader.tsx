import { DesktopNav } from "./MainNav";
import { MobileNav } from "./MobileNav";
import { SiteLogo } from "./SiteLogo";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-30">
      <div className="shell flex h-[4.5rem] items-center justify-between gap-4">
        <SiteLogo variant="header" />
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
}
