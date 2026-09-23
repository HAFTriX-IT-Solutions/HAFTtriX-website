import { Link } from 'react-router-dom'
import { Shield, Facebook, Instagram, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'

export default function Footer() {
  return (
    <footer className="bg-dark-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <div className="text-xl font-bold">HAFTriX</div>
                <div className="text-xs text-gray-400">IT SOLUTION</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Modern technology solutions for businesses, organizations and individuals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/projects" className="text-gray-400 hover:text-primary transition-colors">Projects</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Web Development</li>
              <li className="text-gray-400">Software Development</li>
              <li className="text-gray-400">Cybersecurity</li>
              <li className="text-gray-400">AI & Machine Learning</li>
              <li className="text-gray-400">IT Consulting</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-5 w-5" />
                <span>{siteConfig.phone}</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-5 w-5" />
                <span>{siteConfig.email}</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-5 w-5" />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2026 HAFTriX IT Solution. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}