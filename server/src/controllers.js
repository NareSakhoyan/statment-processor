import { parseFileContent } from './utils/files.utils.js'
import { validateData } from './validators.js'

export const processeStatment = async (req, res) => {
  const files = req.files

  // Check if files were provided
  if (!files || files.length === 0) {
    const error = new Error('No files provided')
    error.statusCode = 400
    return res.status(400).json({ error: error.message })
  }

  const result = await Promise.all(
    files.map(async (file) => {
      const parsedData = await parseFileContent(file.originalname, file.buffer)
      // Validate the parsed data
      return validateData(parsedData)
    })
  )

  res.json(result)
}
