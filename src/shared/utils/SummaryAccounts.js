import React from 'react';
import ACCOUNT_TYPES from "../constants/accountTypes";

export const getOrganizedAccounts = (accounts) => {
  const personalLoanAccounts = accounts?.filter(account => ACCOUNT_TYPES[account.Account_Type] === 'Personal Loan');
  const creditCardAccounts = accounts?.filter(account => ACCOUNT_TYPES[account.Account_Type] === 'Credit Card');
  const otherLoanAccounts = accounts?.filter(account => ACCOUNT_TYPES[account.Account_Type] !== 'Personal Loan' && ACCOUNT_TYPES[account.Account_Type] !== 'Credit Card');

  return {
    personalLoanAccounts,
    creditCardAccounts,
    otherLoanAccounts,
  };
};
