import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0B0D0F]">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-24 pt-32 lg:px-12">
        <div className="mb-12">
          <h1 className="text-4xl font-semibold text-[#EDEDED] mb-4">Privacy Policy</h1>
          <p className="text-sm text-[#9AA0A6]">Last updated: February 1, 2026</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-[#EDEDED]">
          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">1. Introduction</h2>
            <p className="text-[#9AA0A6] leading-relaxed">
              Higgsfield AI ("we," "our," or "us") is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you use our AI-powered creative platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">
              2. Information We Collect
            </h2>
            <div className="text-[#9AA0A6] leading-relaxed space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-[#EDEDED] mb-2">
                  2.1 Information You Provide
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Account information (name, email address, password)</li>
                  <li>Profile information (avatar, preferences)</li>
                  <li>Content you create using our Service</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Communications with our support team</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#EDEDED] mb-2">
                  2.2 Automatically Collected Information
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Usage data and analytics</li>
                  <li>Device information (browser type, operating system)</li>
                  <li>IP address and location data</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">
              3. How We Use Your Information
            </h2>
            <div className="text-[#9AA0A6] leading-relaxed space-y-3">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide, maintain, and improve our Service</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Personalize your experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">
              4. Information Sharing and Disclosure
            </h2>
            <div className="text-[#9AA0A6] leading-relaxed space-y-3">
              <p>
                We do not sell your personal information. We may share your information only in the
                following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Service Providers:</strong> With third-party vendors who perform services
                  on our behalf
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to protect our rights
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, acquisition, or
                  sale of assets
                </li>
                <li>
                  <strong>With Your Consent:</strong> When you explicitly authorize us to share
                  information
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">5. Data Security</h2>
            <p className="text-[#9AA0A6] leading-relaxed">
              We implement appropriate technical and organizational security measures to protect
              your personal information against unauthorized access, alteration, disclosure, or
              destruction. However, no method of transmission over the Internet is 100% secure, and
              we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">6. Data Retention</h2>
            <p className="text-[#9AA0A6] leading-relaxed">
              We retain your personal information for as long as necessary to provide our Service
              and fulfill the purposes outlined in this Privacy Policy, unless a longer retention
              period is required or permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">7. Your Rights</h2>
            <div className="text-[#9AA0A6] leading-relaxed space-y-3">
              <p>
                Depending on your location, you may have the following rights regarding your
                personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Access:</strong> Request access to your personal information
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal information
                </li>
                <li>
                  <strong>Portability:</strong> Request transfer of your data
                </li>
                <li>
                  <strong>Objection:</strong> Object to processing of your personal information
                </li>
                <li>
                  <strong>Withdrawal:</strong> Withdraw consent where processing is based on consent
                </li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at privacy@higgsfield.ai
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">
              8. Cookies and Tracking Technologies
            </h2>
            <p className="text-[#9AA0A6] leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our Service and
              hold certain information. You can instruct your browser to refuse all cookies or to
              indicate when a cookie is being sent. However, if you do not accept cookies, you may
              not be able to use some portions of our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">9. Children's Privacy</h2>
            <p className="text-[#9AA0A6] leading-relaxed">
              Our Service is not intended for children under the age of 13. We do not knowingly
              collect personal information from children under 13. If you are a parent or guardian
              and believe your child has provided us with personal information, please contact us
              immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">
              10. International Data Transfers
            </h2>
            <p className="text-[#9AA0A6] leading-relaxed">
              Your information may be transferred to and maintained on computers located outside of
              your state, province, country, or other governmental jurisdiction where data
              protection laws may differ. By using our Service, you consent to the transfer of your
              information to these facilities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">
              11. Changes to This Privacy Policy
            </h2>
            <p className="text-[#9AA0A6] leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
              You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">12. Contact Us</h2>
            <p className="text-[#9AA0A6] leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-[#B8FF00] mt-2">
              Email: privacy@higgsfield.ai
              <br />
              Address: 535 Mission St, 14th floor, San Francisco, CA, 94105
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
