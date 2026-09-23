import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Github, ExternalLink, Tag, Calendar } from 'lucide-react'
import { projects } from '../data/projects'
import CTASection from '../components/CTASection'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((p) => p.id === Number(id))

  const currentIndex = projects.findIndex((p) => p.id === Number(id))
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-ivory dark:bg-dark-navy pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-bold text-text dark:text-white mb-4">Project Not Found</h2>
          <p className="text-muted-text dark:text-gray-400 mb-8">
            This project doesn't exist or may have been removed.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-deep-blue text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Projects</span>
          </Link>
        </motion.div>
      </div>
    )
  }

  const hasLiveLink = project.link && project.link !== '#'
  const hasGithubLink = project.github && project.github !== '#'

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark-navy via-navy to-deep-blue py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <Link
              to="/projects"
              className="inline-flex items-center space-x-2 text-white/70 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>All Projects</span>
            </Link>

            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-white/20 backdrop-blur-lg px-3 py-1 rounded-full text-sm text-white">
                {project.category}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {project.title}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              {hasLiveLink && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-deep-blue text-white px-6 py-3 rounded-full font-medium hover:shadow-xl transition-all"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Live Demo</span>
                </a>
              )}
              {hasGithubLink && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-white/10 border border-white/30 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all"
                >
                  <Github className="h-4 w-4" />
                  <span>View Code</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-ivory dark:bg-dark-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Project preview */}
              <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-dark-navy to-deep-blue flex items-center justify-center shadow-2xl">
                <span className="text-8xl font-bold text-white/10">H{project.id}</span>
                <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-xl text-white text-sm font-medium">
                  {project.category}
                </div>
              </div>

              <div className="bg-white dark:bg-navy rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-text dark:text-white mb-4">About This Project</h2>
                <p className="text-muted-text dark:text-gray-400 leading-relaxed">
                  {project.description} This project was developed by the HAFTriX team using modern
                  technologies and best practices to deliver a robust, scalable and user-friendly solution.
                </p>
                <p className="text-muted-text dark:text-gray-400 leading-relaxed mt-4">
                  The solution focuses on performance, security and an excellent user experience,
                  while being built to scale as the client's needs grow.
                </p>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Technologies */}
              <div className="bg-white dark:bg-navy rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <Tag className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold text-text dark:text-white">Technologies</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-ivory dark:bg-dark-navy text-sm font-medium text-muted-text dark:text-gray-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="bg-white dark:bg-navy rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold text-text dark:text-white">Category</h3>
                </div>
                <p className="text-muted-text dark:text-gray-400">{project.category}</p>
              </div>

              {/* Links */}
              {(hasLiveLink || hasGithubLink) && (
                <div className="bg-white dark:bg-navy rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-text dark:text-white mb-4">Project Links</h3>
                  <div className="space-y-3">
                    {hasLiveLink && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-primary hover:underline"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {hasGithubLink && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-primary hover:underline"
                      >
                        <Github className="h-4 w-4" />
                        <span>GitHub Repository</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Interested? */}
              <div className="bg-gradient-to-br from-primary to-deep-blue rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Interested in a similar project?</h3>
                <p className="text-white/80 text-sm mb-4">Get in touch and let's discuss your requirements.</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-1 bg-white text-primary font-semibold px-5 py-2.5 rounded-full text-sm hover:shadow-xl transition-all"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prev / Next navigation */}
      {(prevProject || nextProject) && (
        <section className="py-12 bg-white dark:bg-navy border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between gap-4">
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.id}`}
                className="group flex items-center space-x-3 text-muted-text dark:text-gray-400 hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <div className="text-xs uppercase tracking-wider mb-1">Previous</div>
                  <div className="font-semibold text-text dark:text-white">{prevProject.title}</div>
                </div>
              </Link>
            ) : <div />}

            {nextProject && (
              <Link
                to={`/projects/${nextProject.id}`}
                className="group flex items-center space-x-3 text-muted-text dark:text-gray-400 hover:text-primary transition-colors text-right"
              >
                <div>
                  <div className="text-xs uppercase tracking-wider mb-1">Next</div>
                  <div className="font-semibold text-text dark:text-white">{nextProject.title}</div>
                </div>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </section>
      )}

      <CTASection />
    </div>
  )
}
