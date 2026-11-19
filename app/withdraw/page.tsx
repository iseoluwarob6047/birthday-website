'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Copy, Gift, Lock } from 'lucide-react';
import { SiteShell } from '../../components/site-shell';
import { useApp } from '../../components/app-provider';
import { money } from '../../lib/data';

const PAYPAL_ADDRESS = 'markruffalofoundation@outlook.com';
const WITHDRAWAL_CHARGE = 30;

export default function Withdraw() {
  const { profile, loaded, markPaymentVerified } = useApp();
  const router = useRouter();
  const [answer, setAnswer] = useState('');
  const [attempted, setAttempted] = useState(false);
  const [stage, setStage] = useState(0);
  const [copied, setCopied] = useState(false);
  const right = answer.toLowerCase().trim().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ') === 'always angry';

  useEffect(() => {
    if (loaded && !profile) router.replace('/signin');
    else if (loaded && profile && !profile.onboardingComplete) router.replace('/onboarding');
  }, [loaded, profile, router]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copyPaypal() {
    try {
      await navigator.clipboard.writeText(PAYPAL_ADDRESS);
    } catch {
      const helper = document.createElement('textarea');
      helper.value = PAYPAL_ADDRESS;
      helper.setAttribute('readonly', '');
      helper.style.position = 'fixed';
      helper.style.opacity = '0';
      document.body.appendChild(helper);
      helper.select();
      document.execCommand('copy');
      document.body.removeChild(helper);
    }
    setCopied(true);
  }

  if (!loaded || !profile || !profile.onboardingComplete) {
    return <SiteShell><main className="inner-page container">Loading experience...</main></SiteShell>;
  }

  return (
    <SiteShell>
      <main className="inner-page withdrawal-page">
        <div className="container">
          <Link href="/welcome" className="return-link">
            <ArrowLeft size={17} /> Back to dashboard
          </Link>
          <div className="withdrawal-intro">
            <div className="eyebrow">
              <span className="eyebrow-line" /> MEMBER EXPERIENCE
            </div>
            <h1>Your moment,<br /><em>your journey.</em></h1>
            <p>A little film knowledge, a little celebration, and a polished interactive experience.</p>
          </div>
          <div className="withdraw-stepper">
            <span className={stage === 0 ? 'active' : ''}>01 <b>Film challenge</b></span>
            <span className={stage === 1 ? 'active' : ''}>02 <b>Account overview</b></span>
            <span className={stage === 2 ? 'active' : ''}>03 <b>Complete</b></span>
          </div>
          <div className="withdraw-layout">
            <div className="withdraw-main">
              {stage === 0 && (
                <div className="withdraw-card">
                  <span className="section-overline">A MOMENT FROM THE MOVIES</span>
                  <h2>Finish the line.</h2>
                  <p className="quote-caption">A film-trivia challenge inspired by a familiar cinematic moment.</p>
                  <div className="quote-panel">
                    <span>THE AVENGERS · 2012</span>
                    <blockquote>“That's my secret, Cap. I'm __________.”</blockquote>
                    <small>Bruce Banner</small>
                  </div>
                  <label className="field-label">
                    Complete the quote
                    <input value={answer} onChange={e => { setAnswer(e.target.value); setAttempted(false); }} placeholder="Enter the missing words" />
                  </label>
                  {attempted && (
                    right ? (
                      <div className="answer-state success">
                        <CheckCircle2 size={19} /> Correct answer. Nicely done.
                      </div>
                    ) : (
                      <div className="answer-state error">Not quite. Try again.</div>
                    )
                  )}
                  <button
                    className="button button-dark full-button"
                    onClick={() => { if (attempted && right) setStage(1); else setAttempted(true); }}
                  >
                    {attempted && right ? 'Continue to overview' : 'Check answer'} <ArrowRight size={17} />
                  </button>
                </div>
              )}
              {stage === 1 && (
                <div className="withdraw-card">
                  <span className="section-overline">YOUR ACCOUNT OVERVIEW</span>
                  <h2>A clear view<br /><em>of the details.</em></h2>
                  <div className="summary-list">
                    <div>
                      <span>Your balance</span>
                      <b>{money(profile.allocation)}</b>
                    </div>
                    <div>
                      <span><Lock size={14} /> Payment unlock withdrawal</span>
                    </div>
                    <div className="total">
                      <span>Withdrawal charges</span>
                      <strong>{money(WITHDRAWAL_CHARGE)}</strong>
                    </div>
                  </div>
                  <div className="wallet-display">
                    <label className="wallet-label">PayPal address</label>
                    <p className="wallet-donate">Send your withdrawal charges to this address</p>
                    <div className="wallet-address-container">
                      <code className="wallet-address">{PAYPAL_ADDRESS}</code>
                      <button
                        type="button"
                        className={`wallet-copy${copied ? ' copied' : ''}`}
                        onClick={copyPaypal}
                        aria-label={copied ? 'PayPal address copied' : 'Copy PayPal address'}
                        title={copied ? 'Copied' : 'Copy address'}
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                    <p className="wallet-copied" aria-live="polite">
                      {copied ? 'Address copied to clipboard' : '\u00A0'}
                    </p>
                  </div>
                  <button
                    className="button button-dark full-button"
                    onClick={() => {
                      markPaymentVerified();
                      setStage(2);
                    }}
                  >
                    Verify my payment <ArrowRight size={17} />
                  </button>
                </div>
              )}
              {stage === 2 && (
                <div className="withdraw-card finished-card">
                  <div className="finished-symbol">
                    <CheckCircle2 size={39} />
                  </div>
                  <span className="section-overline">EXPERIENCE COMPLETE</span>
                  <h2>Congratulations.</h2>
                  <p className="verification-note">
                    <Lock size={16} /> You may not be able to make a withdrawal if your payment has not been received or confirmed.
                  </p>
                  <Link className="button button-dark" href="/welcome">
                    Return to dashboard <ArrowRight size={17} />
                  </Link>
                </div>
              )}
            </div>
            <aside className="withdraw-side">
              <div className="side-dark">
                <Gift size={22} />
                <span>MARK RUFFALO</span>
                <h3>A little more than ordinary.</h3>
                <p>A modern celebration experience, thoughtfully built from the first detail to the last.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}