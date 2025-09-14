import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// GET /api/v1/documentation/artifacts - Get all artifacts
router.get('/artifacts', async (req, res) => {
  try {
    const { page = 1, limit = 10, monasteryId, category, search } = req.query
    
    const skip = (Number(page) - 1) * Number(limit)
    const take = Number(limit)

    const where: any = {
      isPublished: true
    }

    if (monasteryId) {
      where.monasteryId = monasteryId
    }

    if (category) {
      where.category = { contains: category as string, mode: 'insensitive' }
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { significance: { contains: search as string, mode: 'insensitive' } }
      ]
    }

    const [artifacts, total] = await Promise.all([
      prisma.artifact.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          monastery: {
            select: {
              id: true,
              name: true,
              location: true
            }
          }
        }
      }),
      prisma.artifact.count({ where })
    ])

    res.json({
      success: true,
      data: artifacts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error) {
    console.error('Error fetching artifacts:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch artifacts',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }
})

// GET /api/v1/documentation/artifacts/:id - Get artifact by ID
router.get('/artifacts/:id', async (req, res) => {
  try {
    const { id } = req.params

    const artifact = await prisma.artifact.findUnique({
      where: { id },
      include: {
        monastery: {
          select: {
            id: true,
            name: true,
            location: true,
            slug: true
          }
        }
      }
    })

    if (!artifact) {
      return res.status(404).json({
        success: false,
        message: 'Artifact not found'
      })
    }

    res.json({
      success: true,
      data: artifact
    })
  } catch (error) {
    console.error('Error fetching artifact:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch artifact',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }
})

// GET /api/v1/documentation/rituals - Get all rituals
router.get('/rituals', async (req, res) => {
  try {
    const { page = 1, limit = 10, monasteryId, type, search } = req.query
    
    const skip = (Number(page) - 1) * Number(limit)
    const take = Number(limit)

    const where: any = {
      isPublished: true
    }

    if (monasteryId) {
      where.monasteryId = monasteryId
    }

    if (type) {
      where.type = { contains: type as string, mode: 'insensitive' }
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { significance: { contains: search as string, mode: 'insensitive' } }
      ]
    }

    const [rituals, total] = await Promise.all([
      prisma.ritual.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          monastery: {
            select: {
              id: true,
              name: true,
              location: true
            }
          }
        }
      }),
      prisma.ritual.count({ where })
    ])

    res.json({
      success: true,
      data: rituals,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error) {
    console.error('Error fetching rituals:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rituals',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }
})

// GET /api/v1/documentation/rituals/:id - Get ritual by ID
router.get('/rituals/:id', async (req, res) => {
  try {
    const { id } = req.params

    const ritual = await prisma.ritual.findUnique({
      where: { id },
      include: {
        monastery: {
          select: {
            id: true,
            name: true,
            location: true,
            slug: true
          }
        }
      }
    })

    if (!ritual) {
      return res.status(404).json({
        success: false,
        message: 'Ritual not found'
      })
    }

    res.json({
      success: true,
      data: ritual
    })
  } catch (error) {
    console.error('Error fetching ritual:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch ritual',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }
})

// GET /api/v1/documentation/historical-records - Get all historical records
router.get('/historical-records', async (req, res) => {
  try {
    const { page = 1, limit = 10, monasteryId, type, language, search } = req.query
    
    const skip = (Number(page) - 1) * Number(limit)
    const take = Number(limit)

    const where: any = {
      isPublished: true
    }

    if (monasteryId) {
      where.monasteryId = monasteryId
    }

    if (type) {
      where.type = { contains: type as string, mode: 'insensitive' }
    }

    if (language) {
      where.language = { contains: language as string, mode: 'insensitive' }
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { content: { contains: search as string, mode: 'insensitive' } }
      ]
    }

    const [records, total] = await Promise.all([
      prisma.historicalRecord.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          monastery: {
            select: {
              id: true,
              name: true,
              location: true
            }
          }
        }
      }),
      prisma.historicalRecord.count({ where })
    ])

    res.json({
      success: true,
      data: records,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error) {
    console.error('Error fetching historical records:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch historical records',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }
})

// GET /api/v1/documentation/historical-records/:id - Get historical record by ID
router.get('/historical-records/:id', async (req, res) => {
  try {
    const { id } = req.params

    const record = await prisma.historicalRecord.findUnique({
      where: { id },
      include: {
        monastery: {
          select: {
            id: true,
            name: true,
            location: true,
            slug: true
          }
        }
      }
    })

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Historical record not found'
      })
    }

    res.json({
      success: true,
      data: record
    })
  } catch (error) {
    console.error('Error fetching historical record:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch historical record',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }
})

// GET /api/v1/documentation/categories - Get all categories
router.get('/categories', async (req, res) => {
  try {
    const [artifactCategories, ritualTypes, recordTypes] = await Promise.all([
      prisma.artifact.findMany({
        select: { category: true },
        where: { isPublished: true },
        distinct: ['category']
      }),
      prisma.ritual.findMany({
        select: { type: true },
        where: { isPublished: true },
        distinct: ['type']
      }),
      prisma.historicalRecord.findMany({
        select: { type: true },
        where: { isPublished: true },
        distinct: ['type']
      })
    ])

    res.json({
      success: true,
      data: {
        artifactCategories: artifactCategories.map(a => a.category).filter(Boolean),
        ritualTypes: ritualTypes.map(r => r.type).filter(Boolean),
        recordTypes: recordTypes.map(r => r.type).filter(Boolean)
      }
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }
})

export default router