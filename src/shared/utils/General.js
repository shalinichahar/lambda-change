import React from 'react';
import { jsonData } from "../hashmap";

// Masks the last four digits of the account number
export const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return '--';
    const visibleLength = 4;
    const maskedPart = 'XXX';
    const visiblePart = accountNumber.slice(-visibleLength);
    return `${maskedPart}${visiblePart}`;
};

export const formatAmountToINR   = (amount) => {
    if (!amount) return '--';
    return Number(amount).toLocaleString('en-IN', { maximumFractionDigits: 2 });
};

export const isActive = (account) => {
  const status = jsonData?.Account_Status[account?.Account_Status];
  return toTitleCase(status) === 'Active';
};

// Capitalize the first letter of a string
export const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const toTitleCase = (str) => {
  if (!str) return '';
  return str
  .toLowerCase()                // Convert the string to lowercase
  .replace(/\b\w/g, c => c.toUpperCase()); // Capitalize the first letter of each word
};

export const getStatusStyles = (status) => {
  if (status === 'Active') {
    return {
      background: 'bg-activeBg',
      text: 'text-activeText',
      dot: 'bg-activeText',
    };
  } else if (status === 'Closed') {
    return {
      background: 'bg-closedBg',
      text: 'text-closedText',
      dot: 'bg-closedText',
    };
  }
  return {
    background: '',
    text: '',
    dot: '',
  };
};