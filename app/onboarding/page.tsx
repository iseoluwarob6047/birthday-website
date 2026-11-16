'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Camera, CheckCircle2, RefreshCw, ShieldCheck, VideoOff } from 'lucide-react';
import { SiteShell } from '../../components/site-shell';
import { useApp } from '../../components/app-provider';

export default function Onboarding() {
  const { profile, loaded, completeOnboarding } = useApp();
  const router = useRouter();
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const [error, setError] = useState('');
  const [camera, setCamera] = useState(false);
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    if (loaded && !profile) router.replace('/signin');
    return () => {
      stream.current?.getTracks().forEach(t => t.stop());
    };
  }, [loaded, profile, router]);

  async function start() {
    setError('');
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      stream.current = s;
      if (video.current) {
        video.current.srcObject = s;
        await video.current.play();
      }
      setCamera(true);
    } catch {
      setError('Camera access is unavailable. You can skip this optional experience.');
    }
  }

  function capture() {
    if (!stream.current) return;
    setCaptured(true);
    stream.current.getTracks().forEach(t => t.stop());
    stream.current = null;
    setCamera(false);
  }

  function finish() {
    completeOnboarding();
    router.push('/welcome');
  }

  return (
    <SiteShell>
      <main className="inner-page">
        <div className="container onboarding-container">
          <div className="eyebrow">
            <span className="eyebrow-line" /> YOUR PERSONAL SPACE
          </div>
          <h1>One quick step<br /><em>before we begin.</em></h1>
          <p className="page-lead">Try our camera experience, or continue without it. No photos or biometric information are saved or uploaded.</p>
          <div className="onboard-card">
            <div className="camera-panel">
              {captured ? (
                <div className="camera-empty">
                  <CheckCircle2 size={56} />
                  <strong>All set.</strong>
                  <span>Camera interaction complete</span>
                </div>
              ) : (
                <>
                  <video ref={video} playsInline muted className={camera ? 'camera-video' : 'hidden-video'} />
                  {!camera && (
                    <div className="camera-empty">
                      <Camera size={52} />
                      <strong>Your camera, your choice.</strong>
                      <span>Nothing is recorded or stored.</span>
                    </div>
                  )}
                </>
              )}
              {camera && !captured && <span className="camera-guide">Position yourself in frame</span>}
            </div>
            <div className="onboard-info">
              <span className="form-step">02 / ONBOARDING</span>
              <h2>Made personal.</h2>
              <p>This optional camera interaction demonstrates a permission-aware onboarding experience. It does not verify identity.</p>
              <div className="privacy-point">
                <ShieldCheck size={20} />
                <span>No facial data or images are retained.</span>
              </div>
              {error && (
                <div className="form-error" role="alert">
                  <VideoOff size={18} />{error}
                </div>
              )}
              {!camera && !captured && (
                <button className="button button-dark full-button" onClick={start}>
                  <Camera size={18} /> Enable camera
                </button>
              )}
              {camera && !captured && (
                <button className="button button-dark full-button" onClick={capture}>
                  <Camera size={18} /> Complete capture step
                </button>
              )}
              {captured && (
                <button className="button button-light full-button" onClick={() => { setCaptured(false); start(); }}>
                  <RefreshCw size={17} /> Try again
                </button>
              )}
              <button className="button button-plain full-button" onClick={finish}>
                Continue to your account <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}