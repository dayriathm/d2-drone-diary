"use client";

import { GITHUB_URL, NAV_LINKS } from "@/lib/site";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0F111A]/72 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#top" className="flex items-center gap-1.5 font-semibold tracking-tight">
          <span className="text-lg text-white">d2</span>
          <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_#00E5FF]" />
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-cyan"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-1.5 text-sm text-muted transition-colors hover:border-cyan/40 hover:text-cyan"
          >
            <GitHubMark className="h-4 w-4" />
            GitHub
          </a>
          <a
            href="#dashboard"
            className="rounded-md bg-cyan px-3.5 py-1.5 text-sm font-semibold text-[#041218] transition-opacity hover:opacity-90"
          >
            Launch Dashboard
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#0F111A]/95 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted hover:text-cyan"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-cyan"
            >
              GitHub
            </a>
            <a
              href="#dashboard"
              onClick={() => setOpen(false)}
              className="rounded-md bg-cyan px-3 py-2 text-center text-sm font-semibold text-[#041218]"
            >
              Launch Dashboard
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.586 2 12.253c0 4.53 2.865 8.37 6.839 9.725.5.094.682-.222.682-.493 0-.243-.01-1.05-.014-1.905-2.782.62-3.369-1.175-3.369-1.175-.455-1.178-1.11-1.492-1.11-1.492-.907-.638.069-.625.069-.625 1.004.072 1.532 1.057 1.532 1.057.892 1.566 2.341 1.114 2.91.852.09-.663.35-1.114.636-1.37-2.22-.259-4.555-1.137-4.555-5.062 0-1.118.39-2.032 1.03-2.748-.103-.258-.447-1.3.098-2.71 0 0 .84-.273 2.75 1.05A9.3 9.3 0 0 1 12 6.84a9.3 9.3 0 0 1 2.5.345c1.91-1.323 2.748-1.05 2.748-1.05.546 1.41.202 2.452.1 2.71.64.716 1.028 1.63 1.028 2.748 0 3.936-2.339 4.8-4.566 5.055.359.318.679.944.679 1.904 0 1.374-.012 2.481-.012 2.82 0 .273.18.592.688.491C19.138 20.62 22 16.78 22 12.253 22 6.586 17.523 2 12 2Z" />
    </svg>
  );
}
