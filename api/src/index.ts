import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Import routes
import monasteryRoutes from './routes/monasteries'
import authRoutes from './routes/auth'
import documentationRoutes from './routes/documentation'
import mediaRoutes from './routes/media'

// Import middleware
import { errorHandler } from './middleware/errorHandler'
import { notFound } from './middleware/notFound'

// Load environment variables
dotenv.config()

const app = express()
const prisma = new PrismaClient()

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://sikkimheritage.org', 'https://www.sikkimheritage.org']
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}))
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Static files
app.use('/uploads', express.static('uploads'))

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: '1.0.0'
  })
})

// API Routes
app.use('/api/v1/monasteries', monasteryRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/documentation', documentationRoutes)
app.use('/api/v1/media', mediaRoutes)

// Error handling
app.use(notFound)
app.use(errorHandler)

// Database connection and server start
const PORT = process.env.PORT || 8000

async function startServer() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
      console.log(`📱 Environment: ${process.env.NODE_ENV}`)
      console.log(`🔗 Health check: http://localhost:${PORT}/health`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down server...')
  await prisma.$disconnect()
  process.exit(0)
})

startServer()