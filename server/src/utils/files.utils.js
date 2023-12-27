import { Parser } from 'xml2js'
import Papa from 'papaparse'

/**
 * Parses file content based on its format (XML or CSV), or shows an error if the format is not supported.
 * @param {string} fileName - The name of the file.
 * @param {Buffer} content - The content of the file as a Buffer.
 * @param {function} callback - Callback function to handle the parsed data.
 */
export const parseFileContent = async (fileName, content) => {
  if (fileName.endsWith('.xml')) {
    return await parseXmlToJson(content.toString())
  } else if (fileName.endsWith('.csv')) {
    return await parseCsvToJson(content.toString())
  } else {
    throw new Error('Unsupported file type')
  }
}

/**
 * Parses an XML file and formats the data into a flattened structure.
 * @param {string} xmlContent - The content of the XML file.
 * @param {function} callback - Callback function to handle the parsed data.
 */
const parseXmlToJson = async (xmlContent) => {
  const parser = new Parser({ explicitArray: false })
  const result = await parser.parseStringPromise(xmlContent)

  const formattedData = result.records.record.map((record) => {
    const { reference } = record.$
    delete record.$
    return { ...record, reference }
  })

  return formattedData
}

/**
 * Parses a CSV file and formats the data, converting record object property names to camelCase.
 * @param {string} csvContent - The content of the CSV file.
 * @param {function} callback - Callback function to handle the parsed data.
 */
const parseCsvToJson = async (csvContent) => {
  const result = Papa.parse(csvContent, {
    header: true,
    dynamicTyping: true,
  })

  const formattedData = result.data.map((record) => {
    const {
      Reference: reference,
      'Account Number': accountNumber,
      Description: description,
      'Start Balance': startBalance,
      Mutation: mutation,
      'End Balance': endBalance,
    } = record
    return {
      reference,
      accountNumber,
      description,
      startBalance,
      mutation,
      endBalance,
    }
  })

  return formattedData
}
