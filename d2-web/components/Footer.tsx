import { GITHUB_URL, NAV_LINKS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#0c0e16]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="flex items-center gap-1.5 font-semibold text-white">
            d2
            <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_#00E5FF]" />
          </p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
            Enterprise drone flight diary, MAVLink analytics, and hardware WMS.
          </p>
          <p className="mt-4 font-mono text-xs text-muted">© 2026 d2 Software</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Product</p>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-white hover:text-cyan">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">System status</p>
          <ul className="mt-3 space-y-2 font-mono text-xs text-white">
            <li className="flex items-center gap-2">
              <span className="status-pulse h-1.5 w-1.5 rounded-full bg-cyan" />
              MAVLink ingest operational
            </li>
            <li className="flex items-center gap-2">
              <span className="status-pulse h-1.5 w-1.5 rounded-full bg-cyan" />
              SignalR 120Hz healthy
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              SQLite replicas in sync
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
