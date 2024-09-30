import React from 'react';
 export const formatDateToDMY = (dateStr) => {
    if (!dateStr) return '';
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${day}-${month}-${year}`;
  };

  export const formatDateToDayMonthYear = (dateStr) => {
    if (!dateStr) return '';
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
  
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = parseInt(month, 10) - 1;
  
    return `${parseInt(day)} ${monthNames[monthIndex]} ${year}`;
  };

  // Page 1 Constant Data
  export const getReportDateStr = (data) => {
    return String(data?.CreditProfileHeader?.ReportDate);
  };

  // Function to convert the report date string (YYYYMMDD) to a Date object
  export const getReportDate = (data) => {
    const reportDateStr = getReportDateStr(data);
    if (!reportDateStr) return null;
    return new Date(
      reportDateStr.substring(0, 4),
      reportDateStr.substring(4, 6) - 1,
      reportDateStr.substring(6, 8)
    );
  };

  // Function to format the Date object to "MMM'yy" and return the formatted date
  export const formatDateToMY = (data) => {
    const reportDate = getReportDate(data);
    if (!reportDate) return '';
    return reportDate.toLocaleString('default', {
      month: 'short',
    }) + `'` + reportDate.getFullYear().toString().substring(2, 4);
  };

  // Page 1 const data ends


  