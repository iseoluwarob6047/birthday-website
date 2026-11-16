import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Heart, MoveUpRight, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { SiteShell } from '../components/site-shell';

export default function Home() {
  return (
    <SiteShell>
      <main>
        <section className="hero container">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              AN OCCASION WORTH SHARING
            </div>
            <h1>
              One birthday.<br />
              <em>More reasons</em><br />
              to celebrate.
            </h1>
            <p className="hero-description">
              A contemporary celebration experience built around the simple idea that a meaningful moment deserves to be shared.
            </p>
            <div className="hero-ctas">
              <Link href="/signup" className="button button-dark">
                Join the celebration <ArrowUpRight size={17} />
              </Link>
              <Link className="underlined-link" href="#story">
                Explore our story <ArrowRight size={16} />
              </Link>
            </div>
            <div className="hero-foot">
              <div className="avatar-cluster">
                <span>A</span>
                <span>J</span>
                <span>M</span>
              </div>
              <span>Made for a celebration that feels personal.</span>
            </div>
          </div>
          <div className="hero-art" aria-label="Abstract sculpture of a ribbon and birthday gift">
            <div className="hero-grid" />
            <div className="art-orbit art-orbit-1" />
            <div className="art-orbit art-orbit-2" />
            <div className="sculpture">
              <div className="sculpture-disk" />
              <div className="sculpture-ribbon ribbon-one" />
              <div className="sculpture-ribbon ribbon-two" />
              <div className="sculpture-center" />
            </div>
            <div className="floating-label">
              <span className="label-sparkle">
                <Sparkles size={18} />
              </span>
              <div>
                <b>CELEBRATE THE MOMENT</b>
                <small>Thoughtfully designed. Entirely original.</small>
              </div>
            </div>
            <span className="vertical-caption">A MODERN CELEBRATION EXPERIENCE — 2026</span>
          </div>
        </section>

        <section className="stat-strip">
          <div className="container stat-inner">
            <div>
              <Star size={18} />
              <span>Designed with purpose</span>
            </div>
            <div>
              <Heart size={18} />
              <span>Made for meaningful moments</span>
            </div>
            <div>
              <ShieldCheck size={18} />
              <span>Privacy-first experience</span>
            </div>
          </div>
        </section>

        <section className="story-section container" id="story">
          <div className="story-intro">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              THE STORY
            </div>
            <h2>
              More than a date<br />
              on the <em>calendar.</em>
            </h2>
          </div>
          <div className="story-body">
            <p>Birthdays are a chance to pause, reflect, and recognize the people and moments that make life memorable.</p>
            <p>Mark Ruffalo brings that spirit online through careful design, personal experiences, and an unmistakably contemporary point of view.</p>
            <Link href="/signup" className="underlined-link">
              Make your entrance <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>

        <section className="feature-section container">
          <div className="feature-art">
            <div className="feature-art-glow" />
            <span className="feature-outline">MARK<br />RUFFALO</span>
            <span className="feature-star">✳</span>
            <div className="feature-caption">
              A SPACE TO CELEBRATE<br />
              <b>IN YOUR OWN WAY</b>
            </div>
          </div>
          <div className="feature-content">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              THE EXPERIENCE
            </div>
            <h2>
              A little more<br />
              <em>personal.</em>
            </h2>
            <p>A thoughtful space made for you, with a welcoming member experience and a clean, intuitive account area.</p>
            <div className="feature-rows">
              <div>
                <span>01</span>
                <strong>A personal welcome</strong>
                <Check size={17} />
              </div>
              <div>
                <span>02</span>
                <strong>A beautifully simple experience</strong>
                <Check size={17} />
              </div>
              <div>
                <span>03</span>
                <strong>Support when you need it</strong>
                <Check size={17} />
              </div>
            </div>
            <Link className="button button-light" href="/signup">
              Create your account <MoveUpRight size={17} />
            </Link>
          </div>
        </section>

        <section className="faq-section container" id="questions">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" />
              THE DETAILS
            </div>
            <h2>
              Good questions.<br />
              <em>Clear answers.</em>
            </h2>
            <p>Everything you need to know before getting started.</p>
          </div>
          <div className="faq-list">
            <details open>
              <summary>
                What is Mark Ruffalo? <span>+</span>
              </summary>
              <p>An original digital experience celebrating modern design and personal moments.</p>
            </details>
            <details>
              <summary>
                Do I need an account to participate? <span>+</span>
              </summary>
              <p>Yes. You can create an account to see the personalized member area and explore the experience.</p>
            </details>
            <details>
              <summary>
                Can I update my account information? <span>+</span>
              </summary>
              <p>Yes, you can update your account information.</p>
            </details>
            <details>
              <summary>
                How do I contact support? <span>+</span>
              </summary>
              <p>Use the support section or the message icon.</p>
            </details>
          </div>
        </section>

        <section className="cta-section">
          <div className="container cta-inner">
            <div className="eyebrow eyebrow-light">YOUR INVITATION IS HERE</div>
            <h2>
              Make this moment<br />
              <em>your own.</em>
            </h2>
            <p>Step inside a thoughtful, personal celebration experience.</p>
            <Link href="/signup" className="button button-ivory">
              Join the celebration <ArrowUpRight size={17} />
            </Link>
            <div className="cta-watermark">MARK RUFFALO</div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}