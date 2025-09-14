'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { X, Play, Pause, Volume2, VolumeX, RotateCcw, Info, MapPin } from 'lucide-react'

interface VirtualTourViewerProps {
  panoramaUrl: string
  title: string
  description?: string
  hotspots?: Array<{
    id: string
    position: { yaw: number; pitch: number }
    title: string
    description: string
    type: 'info' | 'navigation' | 'media'
  }>
  onClose: () => void
}

export default function VirtualTourViewer({ 
  panoramaUrl, 
  title, 
  description, 
  hotspots = [], 
  onClose 
}: VirtualTourViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showHotspots, setShowHotspots] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  const [currentHotspot, setCurrentHotspot] = useState<string | null>(null)

  useEffect(() => {
    // Initialize Pannellum viewer
    if (containerRef.current && typeof window !== 'undefined') {
      // For demo purposes, we'll create a placeholder
      // In production, you would initialize Pannellum here
      const viewer = document.createElement('div')
      viewer.className = 'w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg'
      viewer.innerHTML = `
        <div class="flex items-center justify-center h-full text-white text-center">
          <div>
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">360° Panoramic View</h3>
            <p class="text-sm opacity-90">Virtual tour will be implemented with Pannellum.js</p>
          </div>
        </div>
      `
      containerRef.current.appendChild(viewer)
    }
  }, [])

  const handleHotspotClick = (hotspotId: string) => {
    setCurrentHotspot(currentHotspot === hotspotId ? null : hotspotId)
  }

  const resetView = () => {
    // Reset panorama view to initial position
    console.log('Resetting view...')
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-black/50">
          <div>
            <h2 className="text-white text-xl font-bold">{title}</h2>
            {description && (
              <p className="text-white/80 text-sm">{description}</p>
            )}
          </div>
          <motion.button
            className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Main Content */}
        <div className="flex-1 relative">
          {/* Panorama Container */}
          <div ref={containerRef} className="w-full h-full" />

          {/* Hotspots */}
          {showHotspots && hotspots.map((hotspot) => (
            <motion.div
              key={hotspot.id}
              className="absolute"
              style={{
                left: `${50 + hotspot.position.yaw * 0.1}%`,
                top: `${50 + hotspot.position.pitch * 0.1}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleHotspotClick(hotspot.id)}
              >
                <MapPin className="w-4 h-4" />
              </motion.button>
              
              {currentHotspot === hotspot.id && (
                <motion.div
                  className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-3 shadow-lg min-w-64"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h4 className="font-semibold text-gray-900 mb-1">{hotspot.title}</h4>
                  <p className="text-sm text-gray-600">{hotspot.description}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-4 bg-black/50">
          <div className="flex items-center space-x-2">
            <motion.button
              className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </motion.button>
            
            <motion.button
              className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </motion.button>
            
            <motion.button
              className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetView}
            >
              <RotateCcw className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="flex items-center space-x-2">
            <motion.button
              className={`p-2 rounded-lg transition-colors ${
                showHotspots 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowHotspots(!showHotspots)}
            >
              <MapPin className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowInfo(!showInfo)}
            >
              <Info className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      {showInfo && (
        <motion.div
          className="absolute top-20 right-4 bg-white/20 backdrop-blur-sm rounded-lg p-4 max-w-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          <h4 className="text-white font-semibold mb-2">Virtual Tour Controls</h4>
          <ul className="text-white/90 text-sm space-y-1">
            <li>• Click and drag: Look around</li>
            <li>• Scroll: Zoom in/out</li>
            <li>• Click hotspots: Learn more</li>
            <li>• Use controls: Play/pause audio</li>
          </ul>
        </motion.div>
      )}

      {/* Hotspot List */}
      {hotspots.length > 0 && (
        <motion.div
          className="absolute bottom-20 left-4 bg-white/20 backdrop-blur-sm rounded-lg p-4 max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4 className="text-white font-semibold mb-2">Points of Interest</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {hotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                className="block w-full text-left p-2 rounded bg-white/10 hover:bg-white/20 transition-colors"
                onClick={() => handleHotspotClick(hotspot.id)}
              >
                <h5 className="text-white text-sm font-medium">{hotspot.title}</h5>
                <p className="text-white/80 text-xs">{hotspot.description}</p>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}