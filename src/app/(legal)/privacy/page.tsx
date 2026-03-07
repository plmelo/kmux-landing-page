import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Kmux",
  description: "Privacy Policy for Kmux by Electric Dreams LLC.",
};

export default function PrivacyPolicy() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="font-display neon-text-cyan">Privacy Policy</h1>
      <p className="text-white/40 text-sm">Last updated: March 7, 2026</p>

      <p>
        Electric Dreams LLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates
        Kmux and the website at kmux.dev (the &ldquo;Service&rdquo;). This Privacy Policy
        explains how we collect, use, and protect your information.
      </p>

      <h2 className="font-display text-neon-pink">Information We Collect</h2>

      <h3 className="font-display text-white/80">Information you provide</h3>
      <ul>
        <li>
          <strong>Email address</strong> &mdash; When you join our waitlist or create an account,
          we collect your email address.
        </li>
        <li>
          <strong>Account information</strong> &mdash; If you create an account, we may collect
          your name and payment information (processed by our payment provider).
        </li>
      </ul>

      <h3 className="font-display text-white/80">Information collected automatically</h3>
      <ul>
        <li>
          <strong>Usage data</strong> &mdash; We collect basic analytics such as page views,
          referral sources, and feature usage to improve the Service.
        </li>
        <li>
          <strong>Device information</strong> &mdash; Browser type, operating system, and screen
          resolution.
        </li>
      </ul>

      <h2 className="font-display text-neon-pink">How We Use Your Information</h2>
      <ul>
        <li>To provide and maintain the Service</li>
        <li>To send you updates about Kmux (waitlist announcements, product launches)</li>
        <li>To respond to your requests or support inquiries</li>
        <li>To analyze usage patterns and improve the Service</li>
        <li>To detect and prevent fraud or abuse</li>
      </ul>

      <h2 className="font-display text-neon-pink">Third-Party Services</h2>
      <p>We use the following third-party services:</p>
      <ul>
        <li>
          <strong>Loops</strong> &mdash; Email communication and waitlist management. Your email
          address is shared with Loops to send you product updates. See{" "}
          <a
            href="https://loops.so/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-cyan hover:text-white transition-colors"
          >
            Loops&apos; Privacy Policy
          </a>
          .
        </li>
        <li>
          <strong>Vercel</strong> &mdash; Hosting and analytics. See{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-cyan hover:text-white transition-colors"
          >
            Vercel&apos;s Privacy Policy
          </a>
          .
        </li>
      </ul>

      <h2 className="font-display text-neon-pink">Data Sharing</h2>
      <p>
        We do <strong>not</strong> sell, rent, or trade your personal information to third
        parties. We only share data with the third-party service providers listed above, solely
        to operate the Service.
      </p>

      <h2 className="font-display text-neon-pink">Cookies</h2>
      <p>
        We use essential cookies required for the Service to function. We may use analytics
        cookies to understand how visitors interact with our website. You can control cookies
        through your browser settings.
      </p>

      <h2 className="font-display text-neon-pink">Data Retention</h2>
      <p>
        We retain your information for as long as your account is active or as needed to provide
        the Service. If you request deletion of your data, we will remove it within 30 days,
        except where we are required to retain it by law.
      </p>

      <h2 className="font-display text-neon-pink">Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Unsubscribe from marketing emails at any time</li>
      </ul>

      <h2 className="font-display text-neon-pink">Security</h2>
      <p>
        We take reasonable measures to protect your information from unauthorized access,
        alteration, or destruction. However, no method of transmission over the Internet is 100%
        secure.
      </p>

      <h2 className="font-display text-neon-pink">Children&apos;s Privacy</h2>
      <p>
        The Service is not directed to children under 13. We do not knowingly collect personal
        information from children under 13.
      </p>

      <h2 className="font-display text-neon-pink">Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any material
        changes by posting the new policy on this page and updating the &ldquo;Last
        updated&rdquo; date.
      </p>

      <h2 className="font-display text-neon-pink">Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, contact us at{" "}
        <a
          href="mailto:privacy@kmux.dev"
          className="text-neon-cyan hover:text-white transition-colors"
        >
          privacy@kmux.dev
        </a>
        .
      </p>
    </article>
  );
}
