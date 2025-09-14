import { Request, Response, NextFunction } from 'express'

export interface AppError extends Error {
  statusCode?: number
  isOperational?: boolean
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err }
  error.message = err.message

  // Log error
  console.error('Error:', err)

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found'
    error = { ...error, message, statusCode: 404 }
  }

  // Mongoose duplicate key
  if (err.name === 'MongoError' && (err as any).code === 11000) {
    const message = 'Duplicate field value entered'
    error = { ...error, message, statusCode: 400 }
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values((err as any).errors).map((val: any) => val.message).join(', ')
    error = { ...error, message, statusCode: 400 }
  }

  // Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    const prismaError = err as any
    switch (prismaError.code) {
      case 'P2002':
        error = { ...error, message: 'Duplicate field value entered', statusCode: 400 }
        break
      case 'P2025':
        error = { ...error, message: 'Record not found', statusCode: 404 }
        break
      default:
        error = { ...error, message: 'Database error', statusCode: 500 }
    }
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`) as AppError
  error.statusCode = 404
  next(error)
}

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next)