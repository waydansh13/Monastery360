'use client'

import { motion } from 'framer-motion'
import { Mountain, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Platform': [
      { name: 'Virtual Tours', href: '#tours' },
      { name: '3D Models', href: '#models' },
      { name: 'AR Experiences', href: '#ar' },
      { name: 'Mobile App', href: '#mobile' }
    ],
    'Monasteries': [
      { name: 'Rumtek Monastery', href: '#rumtek' },
      { name: 'Pemayangtse', href: '#pemayangtse' },
      { name: 'Tashiding', href: '#tashiding' },
      { name: 'All Monasteries', href: '#all' }
    ],
    'Documentation': [
      { name: 'Artifacts', href: '#artifacts' },
      { name: 'Rituals', href: '#rituals' },
      { name: 'Historical Records', href: '#records' },
      { name: 'NMMA Integration', href: '#nmma' }
    ],
    'Support': [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Mountain className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">Sikkim Heritage</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Preserving and sharing the rich cultural heritage of Sikkim's monasteries 
              through innovative digital experiences and comprehensive documentation.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>info@sikkimheritage.org</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+91 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Gangtok, Sikkim, India</span>
              </div>
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <motion.div 
          className="border-t border-gray-800 pt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            
            <div className="text-gray-400 text-sm">
              © {currentYear} Sikkim Digital Heritage Project. All rights reserved.
            </div>
          </div>
        </motion.div>

        {/* Partnership Notice */}
        <motion.div 
          className="mt-8 pt-8 border-t border-gray-800 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm">
            In partnership with the National Mission on Monuments and Antiquities (NMMA) 
            and the National Mission for Manuscripts
          </p>
        </motion.div>
      </div>
    </footer>
  )
}