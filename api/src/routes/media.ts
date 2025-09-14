import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = process.env.UPLOAD_DIR || './uploads'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760') // 10MB default
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|webm|ogg|pdf|doc|docx/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Invalid file type'))
    }
  }
})

// GET /api/v1/media/files/:filename - Serve uploaded files
router.get('/files/:filename', (req, res) => {
  try {
    const { filename } = req.params
    const filePath = path.join(process.env.UPLOAD_DIR || './uploads', filename)
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      })
    }

    res.sendFile(path.resolve(filePath))
  } catch (error) {
    console.error('Error serving file:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to serve file'
    })
  }
})

// POST /api/v1/media/upload - Upload files
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      })
    }

    const fileUrl = `/api/v1/media/files/${req.file.filename}`

    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        url: fileUrl
      }
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }
})

// POST /api/v1/media/upload-multiple - Upload multiple files
router.post('/upload-multiple', upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      })
    }

    const files = (req.files as Express.Multer.File[]).map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      url: `/api/v1/media/files/${file.filename}`
    }))

    res.json({
      success: true,
      message: 'Files uploaded successfully',
      data: files
    })
  } catch (error) {
    console.error('Multiple upload error:', error)
    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }
})

// DELETE /api/v1/media/files/:filename - Delete file
router.delete('/files/:filename', async (req, res) => {
  try {
    const { filename } = req.params
    const filePath = path.join(process.env.UPLOAD_DIR || './uploads', filename)
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      })
    }

    fs.unlinkSync(filePath)

    res.json({
      success: true,
      message: 'File deleted successfully'
    })
  } catch (error) {
    console.error('Delete file error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete file',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }
})

// GET /api/v1/media/virtual-tours/:id - Get virtual tour media
router.get('/virtual-tours/:id', async (req, res) => {
  try {
    const { id } = req.params

    const virtualTour = await prisma.virtualTour.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        panoramaUrl: true,
        hotspots: true
      }
    })

    if (!virtualTour) {
      return res.status(404).json({
        success: false,
        message: 'Virtual tour not found'
      })
    }

    res.json({
      success: true,
      data: virtualTour
    })
  } catch (error) {
    console.error('Error fetching virtual tour media:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch virtual tour media',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }
})

// GET /api/v1/media/models3d/:id - Get 3D model media
router.get('/models3d/:id', async (req, res) => {
  try {
    const { id } = req.params

    const model3D = await prisma.model3D.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        modelUrl: true,
        thumbnail: true,
        annotations: true
      }
    })

    if (!model3D) {
      return res.status(404).json({
        success: false,
        message: '3D model not found'
      })
    }

    res.json({
      success: true,
      data: model3D
    })
  } catch (error) {
    console.error('Error fetching 3D model media:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch 3D model media',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }
})

export default router