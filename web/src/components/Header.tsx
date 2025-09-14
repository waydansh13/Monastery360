'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mountain, Menu, X, MapPin, Camera, BookOpen, Globe } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Monasteries', href: '#monasteries', icon: Mountain },
    { name: 'Virtual Tours', href: '#tours', icon: Camera },
    { name: '3D Models', href: '#models', icon: Globe },
    { name: 'Documentation', href: '#documentation', icon: BookOpen },
    { name: 'Maps', href: '#maps', icon: MapPin },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Mountain className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Sikkim Heritage</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </motion.a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden py-4 border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}