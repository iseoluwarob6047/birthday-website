'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SiteShell } from '../../components/site-shell';
import { useApp } from '../../components/app-provider';

export default function SignIn() {
  const router = useRouter();
  const { signIn } = useApp();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const result = signIn(email);

    if (!result.ok) {
      setError(result.error || 'Sign-in unavailable');
      return;
    }

    // Track successful login with Meta Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'Login');
    }

    router.push('/welcome');
  }

  return (
    <SiteShell>
      <main className="form-page">
        <div className="container form-layout">
          <div className="form-editorial">
            <div className="eyebrow eyebrow-light">WELCOME BACK</div>
            <h1>The moment<br /><em>continues.</em></h1>
            <p>Pick up where you left off in your personal celebration space.</p>
            <div className="form-decoration">
              <span>✳️</span>
              <span>A LITTLE SOMETHING SPECIAL</span>
            </div>
          </div>
          <div className="form-card">
            <span className="form-step">ACCOUNT ACCESS</span>
            <h2>Good to see you again.</h2>
            <p>Enter the email you used on this device.</p>
            <form onSubmit={submit}>
              <label>
                Email address
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </label>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="button button-dark full-button">
                Enter your account <ArrowRight size={17} />
              </button>
            </form>
            <p className="form-end">
              New here? <Link href="/signup">Create an account</Link>
            </p>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}