'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Gift, HelpCircle, LogOut, MapPin, MoveUpRight, Wallet, Lock } from 'lucide-react';
import { SiteShell } from '../../components/site-shell';
import { useApp } from '../../components/app-provider';
import { money } from '../../lib/data';

export default function Welcome() {
  const { profile, loaded, signOut } = useApp();
  const router = useRouter();
  const [withdrawalMethod, setWithdrawalMethod] = useState('');

  useEffect(() => {
    if (loaded && !profile) router.replace('/signin');
    else if (loaded && profile && !profile.onboardingComplete) router.replace('/onboarding');
  }, [loaded, profile, router]);

  if (!loaded || !profile || !profile.onboardingComplete) {
    return <SiteShell><main className="inner-page container">Opening your account...</main></SiteShell>;
  }

  return (
    <SiteShell>
      <main className="inner-page dashboard-page">
        <div className="container">
          <div className="dashboard-heading">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-line" /> YOUR PERSONAL DASHBOARD
              </div>
              <h1>Welcome, <em>{profile.fullName.split(' ')[0]}.</em></h1>
              <p>Everything in one thoughtfully designed place.</p>
            </div>
            <button className="logout-button" onClick={() => { signOut(); router.push('/'); }}>
              <LogOut size={17} /> Sign out
            </button>
          </div>
          <div className="dashboard-grid">
            <div className="balance-card">
              <div className="balance-card-header">
                <span><Gift size={17} /> MARK RUFFALO</span>
                <span className="balance-card-icon">✳</span>
              </div>
              <p>Your allocation</p>
              <strong>{money(profile.allocation)}</strong>
              <div className="balance-card-footer">
                <label className="withdrawal-method">
                  <span className="withdrawal-method-label">Select withdrawal method</span>
                  <select
                    className={`withdrawal-select${withdrawalMethod ? ' has-value' : ''}`}
                    value={withdrawalMethod}
                    onChange={(e) => setWithdrawalMethod(e.target.value)}
                  >
                    <option value="">Choose a method</option>
                    <option value="paypal">PayPal</option>
                    <option value="cashapp">Cash App</option>
                  </select>
                </label>
                <span>USD</span>
                {profile.paymentVerified && <Lock size={17} className="balance-lock-icon" />}
              </div>
            </div>
            <div className="dashboard-welcome">
              <span className="section-overline">A MOMENT JUST FOR YOU</span>
              <h2>A celebration<br /><em>worth remembering.</em></h2>
              <p>Your account is ready. Explore the interactive experiences created for this original celebration concept.</p>
              <Link className="button button-dark" href="/withdraw">Explore experience <MoveUpRight size={17} /></Link>
            </div>
            <div className="dashboard-panel">
              <div className="dashboard-panel-head">
                <h3>Account details</h3>
                <span className="small-dot" />
              </div>
              <div className="info-line">
                <span>Name</span>
                <b>{profile.fullName}</b>
              </div>
              <div className="info-line">
                <span>Email</span>
                <b>{profile.email}</b>
              </div>
              <div className="info-line">
                <span>Location</span>
                <b><MapPin size={13} />{profile.city}, {profile.state}</b>
              </div>
              <div className="info-line">
                <span>Member since</span>
                <b>{new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</b>
              </div>
            </div>
            <div className="dashboard-panel quick-links">
              <div className="dashboard-panel-head">
                <h3>Explore more</h3>
                <ArrowUpRight size={18} />
              </div>
              <Link href="/withdraw">
                <Wallet size={18} />
                <span>Interactive experience</span>
                <ArrowRight size={17} />
              </Link>
              <Link href="/support">
                <HelpCircle size={18} />
                <span>Help &amp; support</span>
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}