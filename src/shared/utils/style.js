// utils/styleHelpers.js
import React from 'react';
export const getRowStyles = (index) => {
    const bgColorClass = index % 2 === 0 ? 'bg-white' : 'bg-fb-subtle';
    const textColorClass = bgColorClass === 'bg-white' ? 'text-black' : 'text-fb-primary';
    return { bgColorClass, textColorClass };
  };
  