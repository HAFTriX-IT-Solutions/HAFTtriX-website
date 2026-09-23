import { motion } from 'framer-motion'
import { Search, Lightbulb, PenTool, Code2, Shield, Rocket } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Discover',
    description: "Understand the client's goals, challenges and requirements.",
  },
  {
    icon: Lightbulb,
    title: 'Plan',
    description: 'Define the architecture, technology stack, timeline and project scope.',
  },
  {
    icon: PenTool,
    title: 'Design',
    description: 'Create an intuitive, professional and user-centered experience.',
  },
  {
    icon: Code2,
    title: 'Develop',
    description: 'Build the solution using modern and maintainable technologies.',
  },
  {
    icon: Shield,
    title: 'Test & Secure',
    description: 'Perform functional testing, performance optimization and security checks.',
  },
  {
    icon: Rocket,
    title: 'Deploy',
    description: 'Launch the solution and provide ongoing technical support.',
  },
]

export default function ProcessTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-7 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-deep-blue opacity-30 md:-translate-x-1/2" />

      <div className="space-y-12">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className={`relative flex items-center gap-6 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} pl-16 md:pl-0`}>
              <div className="inline-block bg-white dark:bg-navy rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-slate-200 dark:border-transparent">
                <div className="text-2xl font-bold text-primary mb-2">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>

            <div className="absolute left-0 md:static z-10 flex md:flex-none">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-deep-blue flex items-center justify-center shadow-lg">
                <step.icon className="h-7 w-7 text-white" />
              </div>
            </div>

            <div className="hidden md:block flex-1" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
