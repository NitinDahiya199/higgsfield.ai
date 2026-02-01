import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#0B0D0F]">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-24 pt-32 lg:px-12">
        <div className="mb-12">
          <h1 className="text-4xl font-semibold text-[#EDEDED] mb-4">Terms of Service</h1>
          <p className="text-sm text-[#9AA0A6]">Last updated: February 1, 2026</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-[#EDEDED]">
          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">1. Acceptance of Terms</h2>
            <p className="text-[#9AA0A6] leading-relaxed">
              By accessing and using Higgsfield AI ("Service"), you accept and agree to be bound by
              the terms and provision of this agreement. If you do not agree to abide by the above,
              please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">
              2. Description of Service
            </h2>
            <p className="text-[#9AA0A6] leading-relaxed">
              Higgsfield AI provides an AI-powered creative platform for generating images, videos,
              and content creation. Our services include but are not limited to image generation,
              video synthesis, motion control, character creation, and various AI-powered editing
              tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">3. User Accounts</h2>
            <div className="text-[#9AA0A6] leading-relaxed space-y-3">
              <p>
                To access certain features of the Service, you must register for an account. When
                you register, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and identification</li>
                <li>Accept all responsibility for activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">4. Acceptable Use</h2>
            <div className="text-[#9AA0A6] leading-relaxed space-y-3">
              <p>You agree not to use the Service to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Generate content that is illegal, harmful, threatening, abusive, or violates any
                  laws
                </li>
                <li>Create content that infringes on intellectual property rights</li>
                <li>Generate explicit, pornographic, or adult content</li>
                <li>Create content that promotes violence, hate speech, or discrimination</li>
                <li>Impersonate any person or entity or misrepresent your affiliation</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Attempt to gain unauthorized access to any portion of the Service</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">5. Intellectual Property</h2>
            <div className="text-[#9AA0A6] leading-relaxed space-y-3">
              <p>
                The Service and its original content, features, and functionality are owned by
                Higgsfield AI and are protected by international copyright, trademark, patent, trade
                secret, and other intellectual property laws.
              </p>
              <p>
                You retain ownership of content you create using our Service. However, by using the
                Service, you grant Higgsfield AI a worldwide, non-exclusive, royalty-free license to
                use, reproduce, modify, and distribute your content solely for the purpose of
                operating and providing the Service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">
              6. Subscription and Payment
            </h2>
            <div className="text-[#9AA0A6] leading-relaxed space-y-3">
              <p>
                Some features of the Service may require payment. By subscribing to a paid plan, you
                agree to pay all fees associated with your subscription. Subscriptions automatically
                renew unless cancelled. You may cancel your subscription at any time.
              </p>
              <p>
                All fees are non-refundable except as required by law. We reserve the right to
                change our pricing with 30 days notice.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-[#9AA0A6] leading-relaxed">
              Higgsfield AI shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including without limitation, loss of profits,
              data, use, goodwill, or other intangible losses, resulting from your use of the
              Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">8. Termination</h2>
            <p className="text-[#9AA0A6] leading-relaxed">
              We may terminate or suspend your account and access to the Service immediately,
              without prior notice, for conduct that we believe violates these Terms of Service or
              is harmful to other users, us, or third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">9. Changes to Terms</h2>
            <p className="text-[#9AA0A6] leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of any
              material changes via email or through the Service. Your continued use of the Service
              after such modifications constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#EDEDED] mb-4">10. Contact Information</h2>
            <p className="text-[#9AA0A6] leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-[#B8FF00] mt-2">
              Email: legal@higgsfield.ai
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
