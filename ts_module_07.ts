import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-dark-navy flex items-center justify-center z-[100]">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-20 h-20 mx-auto mb-8"
        >
          <Shield className="w-full h-full text-primary" />
        </motion.div>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '200px' }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-1 bg-gradient-to-r from-primary to-deep-blue rounded-full mx-auto"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-white font-medium"
        >
          Loading HAFTriX...
        </motion.p>
      </motion.div>
    </div>
  )
}