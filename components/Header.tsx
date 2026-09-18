export default function Header() {
  return (
    <header className="relative z-10 border-b border-border/80 bg-bg-primary/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-purple-gradient">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2 L20 6 V12 C20 17 16.5 20.5 12 22 C7.5 20.5 4 17 4 12 V6 Z"
                stroke="#F8FAFC"
                strokeWidth="1.6"
                fill="none"
              />
              <path
                d="M8.5 12 L11 14.5 L15.5 9.5"
                stroke="#22D3EE"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="font-display text-lg font-semibold leading-none tracking-tight">
              GigVault
            </p>
            <p className="mt-1 text-[11px] leading-none text-text-muted">
              The missing rail.
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-[10px] border border-border bg-card px-3 py-1.5 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-status-success" />
          <span className="font-mono text-xs text-text-secondary">
            Account Aggregator rail · live
          </span>
        </div>
      </div>
    </header>
  );
}
