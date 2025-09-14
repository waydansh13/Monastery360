'use client'

import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, Html, useProgress } from '@react-three/drei'
import { motion } from 'framer-motion'
import { X, RotateCcw, ZoomIn, ZoomOut, Info } from 'lucide-react'
import * as THREE from 'three'

interface Model3DViewerProps {
  modelUrl: string
  title: string
  description?: string
  annotations?: any[]
  onClose: () => void
}

function LoadingSpinner() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-white text-sm">Loading 3D model... {Math.round(progress)}%</p>
      </div>
    </Html>
  )
}

function Model({ url }: { url: string }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1
    }
  })

  // For demo purposes, we'll create a placeholder geometry
  // In production, you would load the actual 3D model using useLoader
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#8B5CF6" />
    </mesh>
  )
}

function Annotation({ position, content, title }: { position: [number, number, number], content: string, title: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <group position={position}>
      <mesh
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={isHovered ? "#EF4444" : "#3B82F6"} />
      </mesh>
      
      {isHovered && (
        <Html distanceFactor={10}>
          <div className="bg-white p-3 rounded-lg shadow-lg max-w-xs">
            <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
            <p className="text-sm text-gray-600">{content}</p>
          </div>
        </Html>
      )}
    </group>
  )
}

export default function Model3DViewer({ modelUrl, title, description, annotations = [], onClose }: Model3DViewerProps) {
  const [showInfo, setShowInfo] = useState(false)
  const [resetView, setResetView] = useState(0)

  const handleResetView = () => {
    setResetView(prev => prev + 1)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={<LoadingSpinner />}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Environment preset="sunset" />
            
            <Model url={modelUrl} />
            
            {annotations.map((annotation, index) => (
              <Annotation
                key={index}
                position={annotation.position}
                content={annotation.content}
                title={annotation.title}
              />
            ))}
            
            <OrbitControls
              key={resetView}
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={10}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Controls */}
      <div className="absolute top-4 left-4 flex flex-col space-y-2">
        <motion.button
          className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-lg hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleResetView}
        >
          <RotateCcw className="w-5 h-5" />
        </motion.button>
        
        <motion.button
          className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-lg hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowInfo(!showInfo)}
        >
          <Info className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Close Button */}
      <motion.button
        className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-3 rounded-lg hover:bg-white/30 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
      >
        <X className="w-5 h-5" />
      </motion.button>

      {/* Title */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
          {description && (
            <p className="text-white/90 text-sm">{description}</p>
          )}
        </div>
      </div>

      {/* Info Panel */}
      {showInfo && (
        <motion.div
          className="absolute top-20 left-4 bg-white/20 backdrop-blur-sm rounded-lg p-4 max-w-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h4 className="text-white font-semibold mb-2">Controls</h4>
          <ul className="text-white/90 text-sm space-y-1">
            <li>• Left click + drag: Rotate</li>
            <li>• Right click + drag: Pan</li>
            <li>• Scroll: Zoom in/out</li>
            <li>• Hover over dots: View annotations</li>
          </ul>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="absolute top-20 right-4 bg-white/20 backdrop-blur-sm rounded-lg p-4 max-w-xs">
        <h4 className="text-white font-semibold mb-2">3D Model Viewer</h4>
        <p className="text-white/90 text-sm">
          This interactive 3D model showcases the architectural details and 
          historical significance of the monastery. Use your mouse to explore 
          different angles and discover annotated points of interest.
        </p>
      </div>
    </motion.div>
  )
}