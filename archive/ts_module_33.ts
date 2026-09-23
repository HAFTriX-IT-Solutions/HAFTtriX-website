import { motion } from 'framer-motion'
import { Suspense, lazy } from 'react'
import { 
  Shield, Code2, Globe, BrainCircuit, Users, Layers3,
  ArrowRight, CheckCircle, Sparkles, Lock, Zap, TrendingUp,
  Star, Target, Heart
} from 'lucide-react'
import HeroScene from '../components/3D/SimpleScene'
import Counter from '../components/Counter'
import ServiceCard from '../components/ServiceCard'
import ProcessTimeline from '../components/ProcessTimeline'
import ProjectCard from '../components/ProjectCard'
import SectionHeading from '../components/SectionHeading'
import StatsSection from '../components/StatsSection'
import CTASection from '../components/CTASection'

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Modern, responsive and high-performance websites and web applications.'
  },
  {
    icon: Code2,
    title: 'Software Development',
    description: 'Custom software systems designed around your business processes.'
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Security assessment, vulnerability analysis and practical security solutions.'
  },
  {
    icon: BrainCircuit,
    title: 'AI & Machine Learning',
    description: 'Intelligent solutions using machine learning, automation and AI technologies.'
  },
  {
    icon: Users,
    title: 'IT Consulting',
    description: 'Technical guidance to help organizations choose and implement the right technology.'
  },
  {
    icon: Layers3,
    title: 'Digital Solutions',
    description: 'Integrated digital solutions that improve productivity and customer experience.'
  }
]

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-dark-navy via-navy to-deep-blue">
        <div className="absolute inset-0 opacity-50">
          <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-dark-navy to-deep-blue" />}>
            <HeroScene />
          </Suspense>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-dark-navy/90 via-dark-navy/70 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="max-w-3xl"
          >
            <motion.div
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 }
              }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-4 py-2 mb-8"
            >
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm text-white">Technology. Security. Innovation.</span>
            </motion.div>
            
            <motion.h1
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 }
              }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Transforming Ideas Into{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Digital Solutions
              </span>
            </motion.h1>
            
            <motion.p
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 }
              }}
              className="text-xl text-gray-300 mb-10 leading-relaxed"
            >
              HAFTriX IT Solution delivers modern software, web, cybersecurity, AI and 
              digital technology solutions designed to help businesses grow, operate 
              smarter and stay secure.
            </motion.p>
            
            <motion.div
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 }
              }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="/contact"
                className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-deep-blue text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105"
              >
                <span>Start a Project</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="/services"
                className="inline-flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-lg border border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
              >
                <span>Explore Services</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-ivory dark:bg-dark-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="WHAT WE DO"
            title="Technology Solutions Built Around Your Needs"
            description="From business websites to secure software systems, HAFTriX provides practical technology solutions tailored to real-world business requirements."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="WHY HAFTriX"
            title="Technology With Purpose"
            description="We focus on building technology that solves actual problems instead of simply adding technology for the sake of it."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Lock, title: 'Security First', description: 'Security considerations are integrated into the development process.' },
              { icon: Target, title: 'Custom Solutions', description: "Solutions are designed according to each client's requirements." },
              { icon: Zap, title: 'Modern Technology', description: 'We use contemporary frameworks, cloud platforms and development practices.' },
              { icon: TrendingUp, title: 'Performance Focused', description: 'Fast loading times, optimized architecture and responsive experiences.' },
              { icon: Star, title: 'Scalable Architecture', description: "Systems are designed to evolve as the client's organization grows." },
              { icon: Heart, title: 'Human Support', description: 'Clear communication and practical technical support throughout the project.' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-ivory dark:bg-dark-navy hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-deep-blue flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-text dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-ivory dark:bg-dark-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="OUR PROCESS"
            title="From Idea to Implementation"
          />
          <ProcessTimeline />
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-20 bg-white dark:bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="OUR WORK"
            title="Selected Projects"
            description="Real-world projects completed by HAFTriX."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((project) => (
              <ProjectCard key={project} id={project} />
            ))}
          </div>
        </div>
      </section>

      <StatsSection />
      <CTASection />
    </div>
  )
}