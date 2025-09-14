'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  BookOpen, 
  Camera, 
  FileText, 
  Users, 
  Calendar,
  MapPin,
  Eye,
  Download,
  Share2,
  Heart
} from 'lucide-react'

interface Artifact {
  id: string
  name: string
  category: string
  material: string
  dimensions: string
  significance: string
  images: string[]
  monastery: {
    name: string
    location: string
  }
}

interface Ritual {
  id: string
  name: string
  type: string
  schedule: string
  significance: string
  videoUrl?: string
  images: string[]
  monastery: {
    name: string
    location: string
  }
}

interface HistoricalRecord {
  id: string
  title: string
  type: string
  language: string
  date: string
  content: string
  fileUrl?: string
  monastery: {
    name: string
    location: string
  }
}

interface DocumentationSystemProps {
  artifacts: Artifact[]
  rituals: Ritual[]
  historicalRecords: HistoricalRecord[]
}

export default function DocumentationSystem({ 
  artifacts, 
  rituals, 
  historicalRecords 
}: DocumentationSystemProps) {
  const [activeTab, setActiveTab] = useState<'artifacts' | 'rituals' | 'records'>('artifacts')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedMonastery, setSelectedMonastery] = useState('All')

  const tabs = [
    { id: 'artifacts', label: 'Artifacts', icon: Camera, count: artifacts.length },
    { id: 'rituals', label: 'Rituals', icon: Users, count: rituals.length },
    { id: 'records', label: 'Historical Records', icon: FileText, count: historicalRecords.length }
  ]

  const categories = {
    artifacts: ['All', 'Statue', 'Thangka', 'Manuscript', 'Ritual Object', 'Jewelry', 'Textile'],
    rituals: ['All', 'Daily', 'Festival', 'Ceremony', 'Prayer', 'Meditation'],
    records: ['All', 'Manuscript', 'Document', 'Photograph', 'Audio', 'Video']
  }

  const getFilteredData = () => {
    let data: any[] = []
    
    switch (activeTab) {
      case 'artifacts':
        data = artifacts
        break
      case 'rituals':
        data = rituals
        break
      case 'records':
        data = historicalRecords
        break
    }

    return data.filter(item => {
      const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === 'All' || 
                             item.category === selectedCategory ||
                             item.type === selectedCategory
      
      const matchesMonastery = selectedMonastery === 'All' || 
                              item.monastery.name === selectedMonastery

      return matchesSearch && matchesCategory && matchesMonastery
    })
  }

  const filteredData = getFilteredData()

  const renderArtifactCard = (artifact: Artifact) => (
    <motion.div
      key={artifact.id}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Camera className="w-12 h-12 text-white" />
        </div>
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
          <Heart className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{artifact.name}</h3>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            {artifact.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{artifact.significance}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{artifact.monastery.name}</span>
          </div>
          {artifact.material && (
            <div className="flex items-center text-sm text-gray-500">
              <BookOpen className="w-4 h-4 mr-2" />
              <span>{artifact.material}</span>
            </div>
          )}
          {artifact.dimensions && (
            <div className="flex items-center text-sm text-gray-500">
              <Eye className="w-4 h-4 mr-2" />
              <span>{artifact.dimensions}</span>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2">
          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </button>
          <button className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )

  const renderRitualCard = (ritual: Ritual) => (
    <motion.div
      key={ritual.id}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 relative">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Users className="w-12 h-12 text-white" />
        </div>
        {ritual.videoUrl && (
          <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-l-[6px] border-l-blue-600 border-y-[4px] border-y-transparent ml-1" />
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{ritual.name}</h3>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            {ritual.type}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{ritual.significance}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{ritual.monastery.name}</span>
          </div>
          {ritual.schedule && (
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{ritual.schedule}</span>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2">
          <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </button>
          {ritual.videoUrl && (
            <button className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )

  const renderRecordCard = (record: HistoricalRecord) => (
    <motion.div
      key={record.id}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 relative">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <FileText className="w-12 h-12 text-white" />
        </div>
        {record.fileUrl && (
          <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
            <Download className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{record.title}</h3>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
            {record.type}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{record.content}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{record.monastery.name}</span>
          </div>
          {record.language && (
            <div className="flex items-center text-sm text-gray-500">
              <BookOpen className="w-4 h-4 mr-2" />
              <span>{record.language}</span>
            </div>
          )}
          {record.date && (
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{record.date}</span>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2">
          <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </button>
          {record.fileUrl && (
            <button className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Digital Documentation</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive cataloging of Sikkim's cultural heritage including artifacts, 
          rituals, and historical records in partnership with NMMA and the National Mission for Manuscripts.
        </p>
      </motion.div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <select
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories[activeTab].map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Monastery Filter */}
          <select
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedMonastery}
            onChange={(e) => setSelectedMonastery(e.target.value)}
          >
            <option value="All">All Monasteries</option>
            <option value="Rumtek Monastery">Rumtek Monastery</option>
            <option value="Pemayangtse Monastery">Pemayangtse Monastery</option>
            <option value="Tashiding Monastery">Tashiding Monastery</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            <tab.icon className="w-5 h-5" />
            <span className="font-medium">{tab.label}</span>
            <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredData.length} {activeTab} 
          {filteredData.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item) => {
          switch (activeTab) {
            case 'artifacts':
              return renderArtifactCard(item as Artifact)
            case 'rituals':
              return renderRitualCard(item as Ritual)
            case 'records':
              return renderRecordCard(item as HistoricalRecord)
            default:
              return null
          }
        })}
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or filters to find what you're looking for.
          </p>
        </motion.div>
      )}
    </div>
  )
}