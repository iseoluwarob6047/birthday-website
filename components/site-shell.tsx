'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="topbar-wrap">
        <div className="container topbar">
          <Link href="/" className="brand">
            <span className="brand-mark">✳</span>
            <div>
              <b>MARK RUFFALO</b>
              <small>A MODERN CELEBRATION</small>
            </div>
          </Link>
          <nav className={`nav-links ${mobileOpen ? 'open' : ''}`}>
            <Link href="/">Home</Link>
            <Link href="/signup">Join</Link>
            <Link href="/support">Support</Link>
          </nav>
          <div className="header-actions">
            <Link href="/signin" className="text-link">Sign in</Link>
            <Link href="/signup" className="button button-dark">Create account</Link>
            <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <div className="footer-brand">
              MARK RUFFALO<span className="gold-dot"> · </span>AN ORIGINAL CAMPAIGN EXPERIENCE
            </div>
            <p>Thoughtfully designed. Entirely original.</p>
          </div>
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/support">Support</Link>
          </div>
          <small>© 2026 Mark Ruffalo Experience. All rights reserved.</small>
        </div>
      </footer>
    </>
  );
}