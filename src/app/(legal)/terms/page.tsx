import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Kmux",
  description: "Terms of Service for Kmux by Electric Dreams LLC.",
};

export default function TermsOfService() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="font-display neon-text-cyan">Terms of Service</h1>
      <p className="text-white/40 text-sm">Last updated: March 7, 2026</p>

      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of Kmux and related
        services (the &ldquo;Service&rdquo;) provided by Electric Dreams LLC
        (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By using the Service,
        you agree to these Terms.
      </p>

      <h2 className="font-display text-neon-pink">1. Acceptance of Terms</h2>
      <p>
        By accessing or using the Service, you agree to be bound by these Terms. If you do not
        agree, do not use the Service.
      </p>

      <h2 className="font-display text-neon-pink">2. Description of Service</h2>
      <p>
        Kmux is a command-line tool and optional cloud service that provides project
        orchestration, port management, tmux session management, and an MCP server for
        AI-tool integration. Features and pricing are described on our website and are subject
        to change.
      </p>

      <h2 className="font-display text-neon-pink">3. Accounts</h2>
      <ul>
        <li>You must provide accurate information when creating an account.</li>
        <li>You are responsible for maintaining the security of your account credentials.</li>
        <li>You are responsible for all activity that occurs under your account.</li>
        <li>
          You must notify us immediately of any unauthorized use of your account.
        </li>
      </ul>

      <h2 className="font-display text-neon-pink">4. Acceptable Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Service for any unlawful purpose</li>
        <li>Attempt to gain unauthorized access to the Service or its related systems</li>
        <li>Interfere with or disrupt the integrity or performance of the Service</li>
        <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
        <li>Use the Service to transmit malware, viruses, or other harmful code</li>
        <li>
          Resell, sublicense, or redistribute the Service without our written consent
        </li>
      </ul>

      <h2 className="font-display text-neon-pink">5. Intellectual Property</h2>
      <p>
        The Service, including its source code, design, documentation, and branding, is owned
        by Electric Dreams LLC and protected by copyright and other intellectual property laws.
        Your use of the Service does not grant you ownership of any intellectual property.
      </p>
      <p>
        You retain ownership of any content you create or manage using the Service.
      </p>

      <h2 className="font-display text-neon-pink">6. Payment and Billing</h2>
      <ul>
        <li>
          Paid plans are billed in advance on a monthly or annual basis, depending on the plan
          you select.
        </li>
        <li>
          All fees are non-refundable except as required by law or as expressly stated in
          these Terms.
        </li>
        <li>
          We reserve the right to change pricing with 30 days&apos; notice. Price changes will
          not affect your current billing period.
        </li>
      </ul>

      <h2 className="font-display text-neon-pink">7. Free Trial</h2>
      <p>
        We may offer a free trial for paid plans. At the end of the trial, your account will
        be automatically converted to a paid subscription unless you cancel before the trial
        ends.
      </p>

      <h2 className="font-display text-neon-pink">8. Termination</h2>
      <p>
        You may cancel your account at any time. We may suspend or terminate your access to the
        Service if you violate these Terms or for any other reason with reasonable notice. Upon
        termination, your right to use the Service ceases immediately.
      </p>

      <h2 className="font-display text-neon-pink">9. Disclaimer of Warranties</h2>
      <p>
        THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT
        WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
      </p>

      <h2 className="font-display text-neon-pink">10. Limitation of Liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, ELECTRIC DREAMS LLC SHALL NOT BE LIABLE FOR ANY
        INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF
        PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY. OUR TOTAL LIABILITY FOR
        ANY CLAIM ARISING FROM THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID
        US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
      </p>

      <h2 className="font-display text-neon-pink">11. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless Electric Dreams LLC from any claims, damages,
        or expenses arising from your use of the Service or violation of these Terms.
      </p>

      <h2 className="font-display text-neon-pink">12. Governing Law</h2>
      <p>
        These Terms are governed by the laws of the State of Delaware, without regard to its
        conflict of laws provisions. Any disputes arising from these Terms shall be resolved in
        the courts of the State of Delaware.
      </p>

      <h2 className="font-display text-neon-pink">13. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. We will notify you of material changes by
        posting the updated Terms on this page and updating the &ldquo;Last updated&rdquo; date.
        Continued use of the Service after changes constitutes acceptance of the new Terms.
      </p>

      <h2 className="font-display text-neon-pink">14. Contact Us</h2>
      <p>
        If you have questions about these Terms, contact us at{" "}
        <a
          href="mailto:legal@kmux.dev"
          className="text-neon-cyan hover:text-white transition-colors"
        >
          legal@kmux.dev
        </a>
        .
      </p>
    </article>
  );
}
