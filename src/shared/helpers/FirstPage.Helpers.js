import React from 'react';
import { useMemo } from 'react';
import { differenceInYears, differenceInMonths, parse } from 'date-fns';
import { formatAmountToINR} from '../utils/General';
import ACCOUNT_TYPES from '../constants/accountTypes';

export const calculateTotal = (accounts, key) => {
  return accounts.reduce((acc, account) => acc + Number(account[key] || 0), 0);
};

export const findOldestActiveAccount = (accounts) => {
  return accounts.reduce((oldest, account) => {
    const oldestDate = parse(String(oldest.Open_Date), "yyyyMMdd", new Date());
    const currentDate = parse(String(account.Open_Date), "yyyyMMdd", new Date());
    return oldestDate < currentDate ? oldest : account;
  }, accounts[0]);
};

export const calculateAccountAge = (openDate) => {
  const dateOpened = parse(String(openDate), "yyyyMMdd", new Date());
  const now = new Date();
  const years = differenceInYears(now, dateOpened);
  const months = differenceInMonths(now, dateOpened) % 12;
  return `${years} years ${months} months`;
};

export const overduePayments = (accounts) => {
  return accounts.reduce((totalOverdueCount, account) => {
    if (account.Amount_Past_Due > 0) {
      const accountOverdueCount = account.CAIS_Account_History.reduce((count, history) => {
        return count + (history.Days_Past_Due > 0 ? 1 : 0);
      }, 0);
      return  totalOverdueCount + accountOverdueCount;
    }
    return totalOverdueCount;
  }, 0); 
};

// Custom hook
export const useCreditReportData = (activeAccounts = []) => {
  const activeLoanAccounts = useMemo(() => activeAccounts.filter(account => ACCOUNT_TYPES[account.Account_Type] !=="Credit Card" ), [activeAccounts]);
  const activeCreditCardAccounts = useMemo(() => activeAccounts.filter(account => ACCOUNT_TYPES[account.Account_Type] === "Credit Card" ), [activeAccounts]);

  const totalLoanAmount = formatAmountToINR(calculateTotal(activeLoanAccounts, 'Highest_Credit_or_Original_Loan_Amount'));
  const loanOutstanding = formatAmountToINR(calculateTotal(activeLoanAccounts, 'Current_Balance'));
  const totalCreditLimit = formatAmountToINR(calculateTotal(activeCreditCardAccounts, 'Credit_Limit_Amount'));
  const totalCurrentBalance = formatAmountToINR(calculateTotal(activeCreditCardAccounts, 'Current_Balance'));
  const overduePaymentsCount = overduePayments(activeAccounts);
  const oldestActiveAccount = findOldestActiveAccount(activeAccounts);
  const oldestActiveAge = calculateAccountAge(oldestActiveAccount?.Open_Date);

  return {
    totalLoanAmount,
    loanOutstanding,
    activeLoanAccounts,
    activeCreditCardAccounts,
    totalCreditLimit,
    totalCurrentBalance,
    activeLoanAccountsNumber: activeLoanAccounts.length,
    activeCreditCardAccountsNumber: activeCreditCardAccounts.length,
    overduePaymentsCount,
    oldestActiveAccount,
    oldestActiveAge
  };
};
