import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-dark-navy via-navy to-deep-blue">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-deep-blue/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>
      
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
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-deep-blue text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105"
            >
              <span>Start a Project</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/services"
              className="inline-flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-lg border border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
            >
              <span>Explore Services</span>
            </Link>
          </motion.div>
          
          <motion.div
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 }
            }}
            className="mt-12 flex flex-wrap gap-6"
          >
            {['Secure Development', 'Modern Technology', '24/7 Support'].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}