'use client'

import { motion } from 'framer-motion'
import { Eye, Box, Smartphone, Map, BookOpen, Users } from 'lucide-react'

const features = [
  {
    icon: Eye,
    title: 'Virtual Tours',
    description: 'Immersive 360° panoramic experiences of monastery interiors and exteriors',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Box,
    title: '3D Models',
    description: 'Interactive architectural models with detailed annotations and history',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Smartphone,
    title: 'AR Experiences',
    description: 'Augmented reality features for mobile devices with historical overlays',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Map,
    title: 'Interactive Maps',
    description: 'GPS-enabled navigation and location-based monastery discovery',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: BookOpen,
    title: 'Digital Documentation',
    description: 'Comprehensive cataloging of artifacts, rituals, and historical records',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: Users,
    title: 'Cultural Education',
    description: 'Educational content about Buddhist culture, traditions, and significance',
    color: 'from-indigo-500 to-indigo-600'
  }
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Digital Heritage Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience Sikkim's monasteries through cutting-edge technology that preserves 
            and shares their cultural significance with the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-transparent">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Digital Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}