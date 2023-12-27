import express from 'express'
import multer from 'multer'
import { processeStatment } from './controllers.js'

const router = express.Router()

const storage = multer.memoryStorage()

// File filter for type check
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['application/xml', 'text/xml', 'text/csv']
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    const error = new Error('Unsupported file type')
    error.statusCode = 400
    cb(error)
  }
}

const upload = multer({ storage, fileFilter })

router.post('/upload', upload.array('files',  5), processeStatment)

export default router
