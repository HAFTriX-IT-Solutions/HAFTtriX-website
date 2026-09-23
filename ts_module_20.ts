import { motion } from 'framer-motion'
import { Search, Lightbulb, PenTool, Code2, Shield, Rocket } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Discover',
    description: "Understand the client's goals, challenges and requirements."
  },
  {
    icon: Lightbulb,
    title: 'Plan',
    description: 'Define the architecture, technology stack, timeline and project scope.'
  },
  {
    icon: PenTool,
    title: 'Design',
    description: 'Create an intuitive, professional and user-centered experience.'
  },
  {
    icon: Code2,
    title: 'Develop',
    description: 'Build the solution using modern and maintainable technologies.'
  },
  {
    icon: Shield,
    title: 'Test & Secure',
    description: 'Perform functional testing, performance optimization and security checks.'
  },
  {
    icon: Rocket,
    title: 'Deploy',
    description: 'Launch the solution and provide ongoing technical support.'
  }
]

export default function ProcessTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-accent to-deep-blue opacity-30" />
      
      <div className="space-y-12">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`flex items-center ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
              <div className="inline-block bg-white dark:bg-navy rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-2xl font-bold text-primary mb-2">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl font-bold text-text dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-text dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-deep-blue flex items-center justify-center shadow-lg">
                <step.icon className="h-7 w-7 text-white" />
              </div>
            </div>
            
            <div className="flex-1" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}