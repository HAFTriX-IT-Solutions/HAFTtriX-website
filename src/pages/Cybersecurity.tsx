import { motion } from 'framer-motion'
import { Suspense } from 'react'
import { Shield, Lock, AlertTriangle, CheckCircle, FileSearch, Network, Users, Key } from 'lucide-react'
import SecurityVisualization from '../components/3D/SecurityVisualization'
import SectionHeading from '../components/SectionHeading'
import CTASection from '../components/CTASection'

const securityServices = [
  { icon: FileSearch, title: 'Web Application Security Assessment', description: 'Comprehensive testing of web applications for vulnerabilities.' },
  { icon: Shield, title: 'Vulnerability Assessment', description: 'Identify and prioritize security weaknesses in your systems.' },
  { icon: Network, title: 'Network Security Assessment', description: 'Evaluate your network infrastructure for security gaps.' },
  { icon: AlertTriangle, title: 'OWASP Security Testing', description: 'Test against industry-standard security guidelines.' },
  { icon: Lock, title: 'Security Configuration Review', description: 'Review and harden your security configurations.' },
  { icon: Users, title: 'Security Awareness', description: 'Train your team on security best practices.' },
  { icon: Key, title: 'Secure Development Guidance', description: 'Build security into your development process.' },
  { icon: CheckCircle, title: 'Incident Response Guidance', description: 'Prepare for and respond to security incidents.' },
]

export default function Cybersecurity() {
  return (
    <div className="pt-20">
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-dark-navy via-navy to-deep-blue">
        <div className="absolute inset-0 opacity-50">
          <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-dark-navy to-deep-blue" />}>
            <SecurityVisualization />
          </Suspense>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Security Is Not an{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Add-On
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              HAFTriX helps organizations identify vulnerabilities, reduce digital
              risk and build more secure systems.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-ivory dark:bg-dark-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="OUR SECURITY SERVICES"
            title="Comprehensive Security Solutions"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white dark:bg-navy rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <service.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-bold text-text dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-text dark:text-gray-400">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
