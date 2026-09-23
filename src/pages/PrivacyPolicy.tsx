import { motion } from 'framer-motion'
import { siteConfig } from '../data/siteConfig'

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us when you fill out our contact form, including your name, email address, phone number and any project details you share. We may also collect technical information such as your IP address, browser type and pages visited, through standard web analytics tools.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to respond to your inquiries and project requests, improve our services and website, communicate with you about our services, and comply with applicable laws and regulations. We do not sell, rent or share your personal information with third parties for marketing purposes.`,
  },
  {
    title: '3. Data Security',
    content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: '4. Cookies',
    content: `Our website may use cookies to enhance your browsing experience. Cookies are small data files stored on your device that help us understand how you interact with our site. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.`,
  },
  {
    title: '5. Third-Party Services',
    content: `Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of those third parties and encourage you to review their privacy policies before providing any personal information.`,
  },
  {
    title: '6. Data Retention',
    content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law. When your information is no longer needed, we will securely delete or anonymize it.`,
  },
  {
    title: '7. Your Rights',
    content: `You have the right to access the personal information we hold about you, request correction of inaccurate information, request deletion of your data (subject to any legal obligations we may have), and opt out of any communications from us. To exercise these rights, please contact us at ${siteConfig.email}.`,
  },
  {
    title: '8. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page with an updated effective date. Your continued use of our website after any changes constitutes your acceptance of the new policy.`,
  },
  {
    title: '9. Contact Us',
    content: `If you have questions or concerns about this Privacy Policy, please contact us:\n\nEmail: ${siteConfig.email}\nPhone: ${siteConfig.phone}\nAddress: ${siteConfig.address}`,
  },
]

export default function PrivacyPolicy() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark-navy via-navy to-deep-blue py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300"
          >
            Effective Date: September 1, 2026
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-ivory dark:bg-dark-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-navy rounded-2xl p-8 md:p-12 shadow-lg"
          >
            <p className="text-muted-text dark:text-gray-400 mb-10 leading-relaxed text-lg">
              {siteConfig.companyName} ("we", "our", or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use, disclose and safeguard
              your information when you visit our website or use our services.
            </p>

            <div className="space-y-10">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <h2 className="text-xl font-bold text-text dark:text-white mb-3">
                    {section.title}
                  </h2>
                  <p className="text-muted-text dark:text-gray-400 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
