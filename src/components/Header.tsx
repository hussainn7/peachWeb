import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
// If you're on Next.js, uncomment these lines to highlight the active tab:
// import Link from "next/link";
// import { usePathname } from "next/navigation";

const Header = () => {
  // const pathname = usePathname();
  const navItems = [
    { name: "Home", href: "/#hero" },
    { name: "Timeline", href: "/timeline" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <nav
      className="
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        w-[min(92vw,1100px)]
        rounded-2xl
        bg-white/[0.06] backdrop-blur-xl
        border border-white/10
        shadow-[0_8px_30px_rgba(0,0,0,0.25)]
        ring-1 ring-white/5
        transition-all
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]
        [--glassAccent:rgba(255,159,122,0.55)]
      "
      aria-label="Primary"
    >
      {/* top edge halo */}
      <div className="pointer-events-none absolute inset-x-6 -top-3 h-6 rounded-xl bg-[radial-gradient(60%_100%_at_50%_0%,rgba(255,255,255,0.18),transparent)]" />

      {/* inner hairline to sell the glass */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]" />

      <div className="px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="relative select-none text-[15px] font-extrabold tracking-wide text-amber-100"
          >
            PEACHSTATEHACKS
            <span className="absolute -bottom-1 left-0 h-[2px] w-3 bg-[var(--glassAccent)]/70" />
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              // const isActive = pathname === item.href;
              const isActive = false; // set with usePathname if you use Next.js
              return (
                <div key={item.name} className="relative">
                  <Button
                    variant="ghost" // keep your variant if you prefer: "ghost-gold"
                    asChild
                    className="
                      relative h-9 px-3 rounded-xl
                      text-[13.5px] font-medium tracking-wide
                      text-white hover:text-white/90
                      hover:bg-white/5
                      transition-colors
                    "
                  >
                    {item.href.startsWith("/") ? (
                      <Link to={item.href}>
                        {item.name}
                        {/* underline */}
                        <span
                          className={`
                            pointer-events-none absolute bottom-1 left-2 right-2 h-[2px]
                            origin-left scale-x-0 group-hover:scale-x-100
                            transition-transform duration-300
                            bg-gradient-to-r from-transparent via-[var(--glassAccent)] to-transparent
                            ${isActive ? "scale-x-100" : ""}
                          `}
                        />
                      </Link>
                    ) : (
                      <a href={item.href}>
                        {item.name}
                        {/* underline */}
                        <span
                          className={`
                            pointer-events-none absolute bottom-1 left-2 right-2 h-[2px]
                            origin-left scale-x-0 group-hover:scale-x-100
                            transition-transform duration-300
                            bg-gradient-to-r from-transparent via-[var(--glassAccent)] to-transparent
                            ${isActive ? "scale-x-100" : ""}
                          `}
                        />
                      </a>
                    )}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Register pill */}
            <Button
              className="
                hidden sm:inline-flex h-9 rounded-full px-4 text-[13px] font-semibold
                text-slate-950
                bg-[linear-gradient(180deg,#FFB899_0%,#FF9F7A_100%)]
                hover:brightness-110 shadow-[0_6px_20px_rgba(255,159,122,0.35)]
              "
              asChild
            >
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSdLql9wxVoGHg3zOdDFhA1pZpny6IGjp_230U4bbQtd0-QF-g/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                Register
              </a>
            </Button>

            {/* Mobile menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 hover:bg-white/5"
              aria-label="Open menu"
            >
              <svg
                className="h-5 w-5 text-white/85"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h16M4 12h16M4 17h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
