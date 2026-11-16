'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, Copy, ExternalLink, HeartHandshake } from 'lucide-react';
import { SiteShell } from '../../components/site-shell';

const ADDRESS = 'bc1qd5k69paw2vcd534xpqtculmeglfhtru697xaa4';
const PAYMENT_URI = `bitcoin:${ADDRESS}`;

export default function DonatePage() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(ADDRESS);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }

  return (
    <SiteShell>
      <main className="inner-page donation-page">
        <div className="container">
          <Link href="/" className="return-link">
            <ArrowLeft size={17} /> Back to home
          </Link>
          <div className="donation-intro">
            <div className="eyebrow">
              <span className="eyebrow-line" /> INDEPENDENT SUPPORT
            </div>
            <h1>Support the project,<br /><em>if you choose.</em></h1>
            <p>Contributions support this independent website project.</p>
          </div>
          <div className="donation-grid">
            <section className="donation-panel" aria-labelledby="donation-heading">
              <div className="donation-title">
                <span className="donation-icon">
                  <HeartHandshake size={22} />
                </span>
                <span>BITCOIN</span>
              </div>
              <h2 id="donation-heading">Contribution</h2>
              <p>You can use the Bitcoin network to contribute to this independent website project.</p>
              <div className="wallet-qr">
                <Image alt="QR code for Bitcoin contribution address" src="/bitcoin-donation-qr.png" width={216} height={216} unoptimized />
              </div>
              <label className="wallet-label" htmlFor="wallet-address">Bitcoin receiving address</label>
              <input
                id="wallet-address"
                className="wallet-address"
                value={ADDRESS}
                readOnly
                onFocus={e => e.currentTarget.select()}
                spellCheck={false}
              />
              <div className="donation-actions">
                <button className="button button-dark" type="button" onClick={copyAddress}>
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  {' '}{copied ? 'Address copied' : 'Copy address'}
                </button>
                <a className="button button-light" href={PAYMENT_URI}>
                  Open wallet <ExternalLink size={17} />
                </a>
              </div>
              <div className="copy-message" aria-live="polite">
                {copyError ? 'Copying is unavailable in this browser.' : copied ? 'Copied. Confirm the complete address in your wallet before sending.' : 'Verify the destination address before any transaction.'}
              </div>
            </section>
            <aside className="donation-aside">
              <span className="section-overline">A CLEAR CHOICE</span>
              <h3>No requirements.<br />No conditions.</h3>
              <p>Contributing is entirely voluntary. Donations are separate from account features.</p>
              <p className="donation-meta">Bitcoin payments are generally irreversible.</p>
            </aside>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}