import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import CTASection from '../components/CTASection'
import SectionHeading from '../components/SectionHeading'

const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Cybersecurity Practices Every Business Should Follow in 2026',
    excerpt: 'Cyber threats are evolving rapidly. Here are the essential security practices your organization should implement to stay protected this year.',
    category: 'Cybersecurity',
    date: 'September 1, 2026',
    readTime: '6 min read',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 2,
    title: 'Why Sri Lankan Businesses Need a Strong Digital Presence',
    excerpt: 'As digital adoption accelerates across South Asia, having a professional online presence is no longer optional — it\'s a competitive necessity.',
    category: 'Digital Strategy',
    date: 'August 20, 2026',
    readTime: '4 min read',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 3,
    title: 'How AI & Machine Learning Can Transform Your Business Operations',
    excerpt: 'From automating repetitive tasks to predicting customer behavior, AI is reshaping how businesses work. Here\'s what you need to know.',
    category: 'AI & Technology',
    date: 'August 10, 2026',
    readTime: '7 min read',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 4,
    title: 'Choosing the Right Technology Stack for Your Next Web Project',
    excerpt: 'React, Next.js, Node.js, Python — the options are overwhelming. We break down how to choose the right technology stack for your needs.',
    category: 'Web Development',
    date: 'July 28, 2026',
    readTime: '5 min read',
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 5,
    title: 'What is OWASP and Why Should Your Business Care?',
    excerpt: 'The OWASP Top 10 is the gold standard for web application security. Understanding it is the first step to building secure digital products.',
    category: 'Cybersecurity',
    date: 'July 15, 2026',
    readTime: '5 min read',
    color: 'from-yellow-500 to-red-500',
  },
  {
    id: 6,
    title: 'The ROI of Custom Software vs Off-the-Shelf Solutions',
    excerpt: 'Many businesses default to off-the-shelf software to save time. But in the long run, custom software built for your workflow often wins.',
    category: 'Software Development',
    date: 'July 5, 2026',
    readTime: '6 min read',
    color: 'from-cyan-500 to-blue-500',
  },
]

const categories = ['All', 'Cybersecurity', 'Web Development', 'AI & Technology', 'Digital Strategy', 'Software Development']

export default function Blog() {
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
            Insights &amp; Resources
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Technology guides, security updates and industry insights from the HAFTriX team.
          </motion.p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 bg-ivory dark:bg-dark-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="LATEST POSTS"
            title="From the Blog"
            description="Practical articles on technology, security and digital strategy."
          />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`px-5 py-2 rounded-full text-sm font-medium cursor-default transition-all ${
                  cat === 'All'
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white dark:bg-navy text-text dark:text-gray-300 hover:bg-primary/10'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group bg-white dark:bg-navy rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Colored header */}
                <div className={`h-40 bg-gradient-to-br ${post.color} flex items-center justify-center relative`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <Tag className="h-12 w-12 text-white/40 relative z-10" />
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-lg px-3 py-1 rounded-full text-xs text-white font-medium">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-4 text-xs text-muted-text dark:text-gray-400 mb-3">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{post.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-text dark:text-white mb-3 group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-sm text-muted-text dark:text-gray-400 mb-5 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter signup */}
      <section className="py-16 bg-white dark:bg-navy">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-text dark:text-white mb-4">Stay Updated</h2>
            <p className="text-muted-text dark:text-gray-400 mb-8">
              Get the latest articles on technology, cybersecurity and digital strategy delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-navy focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
              />
              <button className="px-7 py-3 bg-gradient-to-r from-primary to-deep-blue text-white rounded-full font-semibold hover:shadow-xl transition-all">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-muted-text dark:text-gray-500 mt-3">No spam. Unsubscribe at any time.</p>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
