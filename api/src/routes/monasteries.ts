import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// GET /api/v1/monasteries - Get all monasteries
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, district, featured } = req.query
    
    const skip = (Number(page) - 1) * Number(limit)
    const take = Number(limit)

    const where: any = {
      isPublished: true
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { location: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ]
    }

    if (district) {
      where.district = { contains: district as string, mode: 'insensitive' }
    }

    if (featured === 'true') {
      where.isFeatured = true
    }

    const [monasteries, total] = await Promise.all([
      prisma.monastery.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          virtualTours: {
            where: { isPublished: true },
            select: { id: true, title: true, duration: true }
          },
          models3D: {
            where: { isPublished: true },
            select: { id: true, title: true }
          },
          _count: {
            select: {
              artifacts: { where: { isPublished: true } },
              rituals: { where: { isPublished: true } },
              historicalRecords: { where: { isPublished: true } }
            }
          }
        }
      }),
      prisma.monastery.count({ where })
    ])

    res.json({
      success: true,
      data: monasteries,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error) {
    console.error('Error fetching monasteries:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch monasteries',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }
})

// GET /api/v1/monasteries/:id - Get monastery by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const monastery = await prisma.monastery.findUnique({
      where: { id },
      include: {
        virtualTours: {
          where: { isPublished: true },
          orderBy: { createdAt: 'desc' }
        },
        models3D: {
          where: { isPublished: true },
          orderBy: { createdAt: 'desc' }
        },
        artifacts: {
          where: { isPublished: true },
          orderBy: { createdAt: 'desc' }
        },
        rituals: {
          where: { isPublished: true },
          orderBy: { createdAt: 'desc' }
        },
        historicalRecords: {
          where: { isPublished: true },
          orderBy: { createdAt: 'desc' }
        },
        reviews: {
          where: { isPublic: true },
          include: {
            user: {
              select: { username: true, firstName: true, lastName: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!monastery) {
      return res.status(404).json({
        success: false,
        message: 'Monastery not found'
      })
    }

    res.json({
      success: true,
      data: monastery
    })
  } catch (error) {
    console.error('Error fetching monastery:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch monastery',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }
})

// GET /api/v1/monasteries/slug/:slug - Get monastery by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params

    const monastery = await prisma.monastery.findUnique({
      where: { slug },
      include: {
        virtualTours: {
          where: { isPublished: true },
          orderBy: { createdAt: 'desc' }
        },
        models3D: {
          where: { isPublished: true },
          orderBy: { createdAt: 'desc' }
        },
        artifacts: {
          where: { isPublished: true },
          orderBy: { createdAt: 'desc' }
        },
        rituals: {
          where: { isPublished: true },
          orderBy: { createdAt: 'desc' }
        },
        historicalRecords: {
          where: { isPublished: true },
          orderBy: { createdAt: 'desc' }
        },
        reviews: {
          where: { isPublic: true },
          include: {
            user: {
              select: { username: true, firstName: true, lastName: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!monastery) {
      return res.status(404).json({
        success: false,
        message: 'Monastery not found'
      })
    }

    res.json({
      success: true,
      data: monastery
    })
  } catch (error) {
    console.error('Error fetching monastery by slug:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch monastery',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }
})

// GET /api/v1/monasteries/featured - Get featured monasteries
router.get('/featured/list', async (req, res) => {
  try {
    const monasteries = await prisma.monastery.findMany({
      where: {
        isPublished: true,
        isFeatured: true
      },
      orderBy: { createdAt: 'desc' },
      take: 6,
      include: {
        virtualTours: {
          where: { isPublished: true },
          select: { id: true, title: true }
        },
        models3D: {
          where: { isPublished: true },
          select: { id: true, title: true }
        }
      }
    })

    res.json({
      success: true,
      data: monasteries
    })
  } catch (error) {
    console.error('Error fetching featured monasteries:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured monasteries',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }
})

// GET /api/v1/monasteries/search - Search monasteries
router.get('/search/query', async (req, res) => {
  try {
    const { q, limit = 10 } = req.query

    if (!q || (q as string).length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters long'
      })
    }

    const monasteries = await prisma.monastery.findMany({
      where: {
        isPublished: true,
        OR: [
          { name: { contains: q as string, mode: 'insensitive' } },
          { location: { contains: q as string, mode: 'insensitive' } },
          { description: { contains: q as string, mode: 'insensitive' } },
          { district: { contains: q as string, mode: 'insensitive' } }
        ]
      },
      take: Number(limit),
      select: {
        id: true,
        name: true,
        slug: true,
        location: true,
        district: true,
        coverImage: true,
        features: true
      }
    })

    res.json({
      success: true,
      data: monasteries
    })
  } catch (error) {
    console.error('Error searching monasteries:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to search monasteries',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }
})

export default router