'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Star, Eye, Box, Smartphone } from 'lucide-react'

interface Monastery {
  id: number
  name: string
  location: string
  description: string
  image: string
  established: string
  significance: string
  features: string[]
  coordinates: { lat: number; lng: number }
}

interface MonasteryCardProps {
  monastery: Monastery
  isSelected: boolean
  onSelect: () => void
}

export default function MonasteryCard({ monastery, isSelected, onSelect }: MonasteryCardProps) {
  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'Virtual Tour':
        return <Eye className="w-4 h-4" />
      case '3D Model':
        return <Box className="w-4 h-4" />
      case 'AR Experience':
        return <Smartphone className="w-4 h-4" />
      default:
        return <Star className="w-4 h-4" />
    }
  }

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-4 ring-blue-500 shadow-2xl' : 'hover:shadow-xl'
      }`}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-white text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <MapPin className="w-8 h-8" />
            </div>
            <p className="text-sm opacity-90">Monastery Image</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{monastery.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{monastery.location}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <Calendar className="w-4 h-4 mr-1" />
          <span className="text-sm">Est. {monastery.established}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {monastery.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {monastery.features.map((feature, index) => (
            <motion.span
              key={feature}
              className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {getFeatureIcon(feature)}
              <span>{feature}</span>
            </motion.span>
          ))}
        </div>

        {/* Action Button */}
        <motion.button
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            isSelected
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSelected ? 'Selected' : 'Explore'}
        </motion.button>
      </div>
    </motion.div>
  )
}