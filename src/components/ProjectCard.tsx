import { motion } from 'framer-motion'
import { ArrowRight, Github, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ProjectCardProps {
  id: number
  title?: string
  description?: string
  technologies?: string[]
  category?: string
  link?: string
  github?: string
}

export default function ProjectCard({
  id,
  title = 'Project Title',
  description = 'A brief description of the project and the value it delivered.',
  technologies = ['React', 'Node.js', 'PostgreSQL'],
  category = 'Web Application',
  link,
  github,
}: ProjectCardProps) {
  const hasLiveLink = link && link !== '#'
  const hasGithubLink = github && github !== '#'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative bg-white dark:bg-navy rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-deep-blue/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-navy to-deep-blue opacity-90" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-bold text-white/20">H{id}</span>
        </div>

        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-lg px-3 py-1 rounded-full text-sm text-white">
          {category}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-text dark:text-white mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-muted-text dark:text-gray-400 mb-4">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-ivory dark:bg-dark-navy text-sm text-muted-text dark:text-gray-300 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {hasGithubLink ? (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View on GitHub"
                className="p-2 rounded-lg bg-ivory dark:bg-dark-navy hover:bg-primary/10 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            ) : (
              <span className="p-2 rounded-lg bg-ivory dark:bg-dark-navy opacity-40 cursor-not-allowed" title="Repository not available">
                <Github className="h-5 w-5" />
              </span>
            )}
            {hasLiveLink ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View live site"
                className="p-2 rounded-lg bg-ivory dark:bg-dark-navy hover:bg-primary/10 transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            ) : (
              <span className="p-2 rounded-lg bg-ivory dark:bg-dark-navy opacity-40 cursor-not-allowed" title="Live demo not available">
                <ExternalLink className="h-5 w-5" />
              </span>
            )}
          </div>

          <Link
            to={`/projects/${id}`}
            className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform"
          >
            <span>View Details</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
