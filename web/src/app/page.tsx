'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mountain, MapPin, Camera, BookOpen, Users, Globe } from 'lucide-react'
import Header from '@/components/Header'
import MonasteryCard from '@/components/MonasteryCard'
import VirtualTourSection from '@/components/VirtualTourSection'
import FeaturesSection from '@/components/FeaturesSection'
import Footer from '@/components/Footer'

// Sample monastery data - in production, this would come from an API
const sampleMonasteries = [
  {
    id: 1,
    name: 'Rumtek Monastery',
    location: 'Gangtok, East Sikkim',
    description: 'The largest monastery in Sikkim and seat of the Karmapa lineage',
    image: '/images/rumtek-monastery.jpg',
    established: '1966',
    significance: 'One of the most important centers of Tibetan Buddhism',
    features: ['Virtual Tour', '3D Model', 'AR Experience'],
    coordinates: { lat: 27.3389, lng: 88.6065 }
  },
  {
    id: 2,
    name: 'Pemayangtse Monastery',
    location: 'Pelling, West Sikkim',
    description: 'One of the oldest and most important monasteries of the Nyingma sect',
    image: '/images/pemayangtse-monastery.jpg',
    established: '1705',
    significance: 'Second oldest monastery in Sikkim with rich cultural heritage',
    features: ['Virtual Tour', '3D Model'],
    coordinates: { lat: 27.3167, lng: 88.2333 }
  },
  {
    id: 3,
    name: 'Tashiding Monastery',
    location: 'Tashiding, West Sikkim',
    description: 'Sacred monastery known for its annual Bumchu festival',
    image: '/images/tashiding-monastery.jpg',
    established: '1641',
    significance: 'Holds the sacred Bumchu vessel with miraculous water',
    features: ['Virtual Tour', 'Cultural Events'],
    coordinates: { lat: 27.2833, lng: 88.1833 }
  }
]

export default function Home() {
  const [selectedMonastery, setSelectedMonastery] = useState<number | null>(null)

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 z-10" />
        <div className="absolute inset-0 bg-[url('/images/sikkim-landscape.jpg')] bg-cover bg-center" />
        
        <motion.div 
          className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Mountain className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Sikkim Monasteries
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover the spiritual heritage of the Himalayas through immersive digital experiences
          </p>
          <motion.button 
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-full text-lg font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Virtual Tours
          </motion.button>
        </motion.div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Monasteries Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Explore Sacred Spaces
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Journey through Sikkim's most revered monasteries, each with its own unique history, 
              architecture, and spiritual significance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleMonasteries.map((monastery, index) => (
              <motion.div
                key={monastery.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <MonasteryCard 
                  monastery={monastery}
                  isSelected={selectedMonastery === monastery.id}
                  onSelect={() => setSelectedMonastery(
                    selectedMonastery === monastery.id ? null : monastery.id
                  )}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <VirtualTourSection />

      {/* Digital Documentation Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-blue-600" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Digital Documentation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Preserving Sikkim's cultural heritage through comprehensive digital documentation 
              in partnership with NMMA and the National Mission for Manuscripts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Camera className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Artifact Cataloging</h3>
              <p className="text-gray-600">
                High-resolution documentation of sacred artifacts, statues, and religious objects 
                with detailed metadata for preservation and study.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Users className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Ritual Documentation</h3>
              <p className="text-gray-600">
                Video recordings and cultural context of traditional ceremonies, 
                festivals, and religious practices for future generations.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Globe className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Historical Records</h3>
              <p className="text-gray-600">
                Digitization of ancient manuscripts, historical documents, and 
                cultural records for academic research and heritage preservation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}