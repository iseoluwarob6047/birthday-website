import { Mail, MessageCircle, Clock3, ArrowRight } from 'lucide-react';
import { SiteShell } from '../../components/site-shell';

export default function Support() {
  return (
    <SiteShell>
      <main className="inner-page container support-page">
        <div className="eyebrow">
          <span className="eyebrow-line" /> HERE TO HELP
        </div>
        <h1>Questions?<br /><em>We're listening.</em></h1>
        <p className="page-lead">Find quick answers or leave a message using the support widget in the lower-right corner.</p>
        <div className="support-cards">
          <div>
            <MessageCircle size={26} />
            <h2>Send a message</h2>
            <p>Open the floating support widget to draft a message on this device.</p>
            <span>MESSAGE NOW <ArrowRight size={15} /></span>
          </div>
          <div>
            <Clock3 size={26} />
            <h2>Support availability</h2>
            <p>Live representatives show accurate offline status.</p>
            <span>OFFLINE CURRENTLY</span>
          </div>
          <div>
            <Mail size={26} />
            <h2>Common questions</h2>
            <p>Visit the homepage FAQ for help with accounts, this experience, and navigation.</p>
            <span>VISIT THE FAQ</span>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}