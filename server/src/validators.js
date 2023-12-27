/**
 * Validates the references to be unique and ensures correct endBalance calculation.
 * Returns the data with all objects and an `invalid` property containing fields that failed validation.
 *
 * @param {Array} data - An array of objects to be validated.
 * @returns {Object} - The validated data with an `invalid` property.
 */
export const validateData = (data) => {
  const references = []
  data.map((record) => {
    let { reference, startBalance, mutation, endBalance } = record
    const invalid = []
    // Check for duplicated references by saving all the ones we have mapped over in an array that isn't
    // present in the initial array. Otherwise, add the reference to the invalid field array.
    if (references.includes(reference)) invalid.push('reference')
    else references.push(reference)

    // This could've easily been sovled with eval, but it has a security risk
    if (endBalance * 1 != (startBalance * 1 + mutation * 1).toFixed(2))
      invalid.push('balance')

    if (invalid.length) record.invalid = invalid

    return record
  })
  return data
}
