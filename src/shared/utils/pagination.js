// utils/paginationHelper.js
import React from 'react';
export const paginateData = (data, getEntriesPerPage) => {
    let currentIndex = 0;
    const pages = [];
  
    while (currentIndex < data.length) {
      const pageIndex = pages.length;
      const entriesPerPage = getEntriesPerPage(pageIndex);
      const pageData = data.slice(currentIndex, currentIndex + entriesPerPage);
      currentIndex += entriesPerPage;
      pages.push(pageData);
    }
  
    return pages;
  };
  
  