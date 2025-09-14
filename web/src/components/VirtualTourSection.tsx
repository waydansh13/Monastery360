'use client'

import { motion } from 'framer-motion'
import { Play, ArrowRight, Eye, MapPin, Clock } from 'lucide-react'

export default function VirtualTourSection() {
  const tourHighlights = [
    {
      title: 'Rumtek Monastery Interior',
      duration: '15 min',
      views: '360° Panoramic',
      description: 'Explore the main prayer hall, meditation chambers, and sacred artifacts'
    },
    {
      title: 'Pemayangtse Architecture',
      duration: '12 min',
      views: '3D Walkthrough',
      description: 'Discover the intricate woodwork and traditional Tibetan architecture'
    },
    {
      title: 'Tashiding Sacred Grounds',
      duration: '20 min',
      views: 'Interactive Map',
      description: 'Navigate through the monastery complex and surrounding sacred sites'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Virtual Tours
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Step inside Sikkim's most sacred spaces through immersive virtual experiences. 
            Explore every corner, learn about the history, and feel the spiritual atmosphere.
          </p>
        </motion.div>

        {/* Main Tour Preview */}
        <motion.div 
          className="relative mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative h-96 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                className="bg-white/20 backdrop-blur-sm text-white p-6 rounded-full hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Play className="w-12 h-12 ml-1" />
              </motion.button>
            </div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Rumtek Monastery Virtual Tour</h3>
              <p className="text-blue-100">Experience the grandeur of Sikkim's largest monastery</p>
            </div>
          </div>
        </motion.div>

        {/* Tour Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tourHighlights.map((tour, index) => (
            <motion.div
              key={tour.title}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <Eye className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Virtual Tour Preview</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{tour.title}</h3>
              
              <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{tour.views}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-4 text-sm">{tour.description}</p>

              <motion.button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Start Tour</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Features List */}
        <motion.div 
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Virtual Tour Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              '360° Panoramic Views',
              'Interactive Hotspots',
              'Audio Narration',
              'Historical Context',
              'Cultural Insights',
              'Mobile Optimized',
              'Offline Access',
              'Multi-language Support'
            ].map((feature, index) => (
              <motion.div
                key={feature}
                className="flex items-center space-x-2 text-gray-700"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}