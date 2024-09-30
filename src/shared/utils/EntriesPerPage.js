import React from 'react';
const calculateEntriesPerPage = (containerHeight, rowHeight, headerHeight = 0) => {
    // Calculate the number of rows that fit within the given container height
    return Math.floor((containerHeight - headerHeight) / rowHeight);
  };
  
  const getEntriesPerPage = (pageIndex, isPdf = false) => {
    const pageHeight = isPdf ? 1123 : 1123; // Same height for both app and PDF in this case
    const rowHeight = 24; // Estimate of row height in pixels
    const firstPageBuffer = pageIndex === 0 ? 150 : 0; // Space for headers and title on the first page
  
    return calculateEntriesPerPage(pageHeight, rowHeight, firstPageBuffer);
  };
  
  export default getEntriesPerPage;
  