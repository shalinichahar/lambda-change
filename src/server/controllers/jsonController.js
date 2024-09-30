/**
 * This function extracts the report number directly from the provided data.
 * 
 * @param {Object} data - The JSON data sent in the request body
 * @returns {string|null} - The report number found in the data, or null if not found
 */
const getReportNumber = (data) => {
    // Assuming the report number is always located in the `CreditProfileHeader` object
    if (data && data.CreditProfileHeader && data.CreditProfileHeader.ReportNumber) {
      return data.CreditProfileHeader.ReportNumber;
    }
    return null;
  };
  
  module.exports = { getReportNumber };
  