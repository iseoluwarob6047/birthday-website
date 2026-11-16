'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, LockKeyhole } from 'lucide-react';
import { SiteShell } from '../../components/site-shell';
import { useApp } from '../../components/app-provider';
import { STATES } from '../../lib/data';

export default function SignUp() {
  const router = useRouter();
  const { register } = useApp();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const city = String(fd.get('city') || '').trim();
    const state = String(fd.get('state') || '');

    if (name.length < 2 || !email.includes('@') || !city || !state) {
      setError('Please complete every required field.');
      setBusy(false);
      return;
    }

    const result = register({ fullName: name, email, state, city });
    if (!result.ok) {
      setError(result.error || 'Registration failed');
      setBusy(false);
      return;
    }
    router.push('/onboarding');
  }

  return (
    <SiteShell>
      <main className="form-page">
        <div className="container form-layout">
          <div className="form-editorial">
            <div className="eyebrow eyebrow-light">WELCOME TO MARK RUFFALO</div>
            <h1>A place for<br /><em>your moment.</em></h1>
            <p>A personal account is the beginning of your celebration experience.</p>
            <div className="form-decoration">
              <span>✳</span>
              <span>YOUR STORY STARTS HERE</span>
            </div>
          </div>
          <div className="form-card">
            <span className="form-step">01 / CREATE ACCOUNT</span>
            <h2>Let's get to know you.</h2>
            <p>Enter a few details to get started.</p>
            <form onSubmit={handleSubmit}>
              <label>
                Full name
                <input name="name" placeholder="Your full name" minLength={2} maxLength={80} required autoComplete="name" />
              </label>
              <div className="two-col">
                <label>
                  State
                  <select name="state" defaultValue="" required>
                    <option value="" disabled>Select state</option>
                    {STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </label>
                <label>
                  City
                  <input name="city" placeholder="Your city" required maxLength={80} autoComplete="address-level2" />
                </label>
              </div>
              <label>
                Email address
                <input type="email" name="email" placeholder="you@example.com" required autoComplete="email" />
              </label>
              <div className="form-note">
                <LockKeyhole size={15} />
                <span>Your information is stored locally on this device.</span>
              </div>
              {error && <p role="alert" className="form-error">{error}</p>}
              <button className="button button-dark full-button" disabled={busy}>
                Continue to onboarding <ArrowRight size={17} />
              </button>
            </form>
            <p className="form-end">Already have an account? <Link href="/signin">Sign in</Link></p>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}