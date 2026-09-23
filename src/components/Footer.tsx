import { Link } from 'react-router-dom'
import { Shield, Facebook, Instagram, Linkedin, Github, Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'

export default function Footer() {
  return (
    <footer className="bg-dark-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <div className="text-xl font-bold">HAFTriX</div>
                <div className="text-xs text-slate-300">IT SOLUTION</div>
              </div>
            </div>
            <p className="text-slate-300 mb-6">
              Modern technology solutions for businesses, organizations and individuals.
            </p>
            <div className="flex space-x-4">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-slate-300 hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/services" className="text-slate-300 hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/solutions" className="text-slate-300 hover:text-primary transition-colors">Solutions</Link></li>
              <li><Link to="/projects" className="text-slate-300 hover:text-primary transition-colors">Projects</Link></li>
              <li><Link to="/cybersecurity" className="text-slate-300 hover:text-primary transition-colors">Cybersecurity</Link></li>
              <li><Link to="/blog" className="text-slate-300 hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-slate-300 hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link to="/services" className="text-slate-300 hover:text-primary transition-colors">Software Development</Link></li>
              <li><Link to="/cybersecurity" className="text-slate-300 hover:text-primary transition-colors">Cybersecurity</Link></li>
              <li><Link to="/services" className="text-slate-300 hover:text-primary transition-colors">AI &amp; Machine Learning</Link></li>
              <li><Link to="/services" className="text-slate-300 hover:text-primary transition-colors">IT Consulting</Link></li>
              <li><Link to="/services" className="text-slate-300 hover:text-primary transition-colors">Digital Solutions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-2 text-slate-300">
                <Phone className="h-5 w-5 shrink-0" />
                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center space-x-2 text-slate-300">
                <Mail className="h-5 w-5 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-primary transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start space-x-2 text-slate-300">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-300">
                <MessageCircle className="h-5 w-5 shrink-0" />
                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-300 text-sm">
            © {new Date().getFullYear()} HAFTriX IT Solution. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy-policy" className="text-slate-300 hover:text-primary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-slate-300 hover:text-primary text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
