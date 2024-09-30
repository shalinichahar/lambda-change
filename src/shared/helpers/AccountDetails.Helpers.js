import React from 'react';
import { jsonData } from '../hashmap';
import { capitalizeFirstLetter, getStatusStyles, toTitleCase } from '../utils/General';
import checkCircle from '../assets/base64/check-circle';
import exclamationCircle from '../assets/base64/exclamation-circle';
import exclamationCircleOrange from '../assets/base64/exclamation-circle-orange';
import exclamationCircleLightRed from '../assets/base64/exclamation-circle-lightred';
import exclamationCircleRed from '../assets/base64/exclamation-circle-red';
import exclamationCircleDarkRed from '../assets/base64/exclamation-circle-darkred';
import questionmarkCircle from '../assets/base64/questionmark-circle';
import { formatDateToDMY } from '../utils/Date';

export const maskAccountNumber = (accountNumber) => {
  if (!accountNumber) return '-';

  const visibleSection = accountNumber.slice(-4); 
  const maskedSection = 'XXXX'; 

  return maskedSection + visibleSection;
};

export const transformAccountHistory = (CAIS_Account_History) => {
  if (!CAIS_Account_History) return [];
  
  const paymentHistory = {};

  CAIS_Account_History.forEach((entry) => {
    const { Year, Month, Days_Past_Due } = entry;
    const year = parseInt(Year, 10);
    const month = parseInt(Month, 10);
    const daysPastDue = parseInt(Days_Past_Due, 10);
   
    if (!paymentHistory[year]) {
      paymentHistory[year] = { year, months: Array(12).fill('?') };
    }

    const monthIndex = month - 1;
    let status;
    if (daysPastDue === 0 || isNaN(daysPastDue)) {
      status = 'on-time';   
    } else if (daysPastDue <= 29 ) {      
      status = '1-29';
    } else if (daysPastDue <= 59) {
      status = '30-59';
    } else if (daysPastDue <= 89) {
      status = '60-89';
    } else if (daysPastDue <= 179) {
      status = '90-179';
    } else {
      status = '180+';
    }

    paymentHistory[year].months[monthIndex] = status;
  });

  return Object.values(paymentHistory).sort((a, b) => b.year - a.year);
};

// Header
export const StatusIndicator = ({ status }) => {
  const statusStyles = getStatusStyles(status);
  return (
    <div className={`inline-flex text-xs items-center px-3 py-1 rounded-full ${statusStyles.background} ${statusStyles.text}`}>
      <span className={`inline-block w-2 h-2 mr-2 rounded-full ${statusStyles.dot}`}></span>
      {status}
    </div>
  );
};

export const AccountHeader = ({ account }) => (
  <div className="flex justify-between items-center space-x-3 p-8 pb-4">
    <div className="text-lg font-medium  text-fb-primary bg-primary-light px-4 py-[1.5] rounded-lg">
      <div id={`account-${account.Account_Number}`} key={account.Account_Number} >
        {maskAccountNumber(account.Account_Number)}
      </div>
    </div>
    <StatusIndicator status={capitalizeFirstLetter(jsonData?.Account_Status[account?.Account_Status])} />
  </div>
);

export const DetailItem = ({ label, value, isLast=false }) => (
  <div className={` ${isLast ? 'pr-0' : ' border-r border-gray-400 pr-4'} `}>
    <div className='pr-0 pl-2 text-xs'>
    <p >{label} <span className="pl-1">:</span>
    <span className=" pl-1">{value}</span></p>
    </div>
  </div>
);

export const AccountDetailsSection = ({ account }) => (
  <div className="flex pt-2 mt-0 mb-8">
    <div className="flex w-full justify-center text-center text-[11.5px] font-semibold">
      <DetailItem label="Account Number" value={maskAccountNumber(account.Account_Number)} />
      <DetailItem label="Account Type" value={toTitleCase(jsonData?.Account_Type[account?.Account_Type === 0 ? "00" : account?.Account_Type])} />
      <DetailItem label="Account Status" value={capitalizeFirstLetter(jsonData?.Account_Status[account?.Account_Status])} />
      <DetailItem label="Ownership" value={jsonData?.AccountHoldertypeCode[account?.AccountHoldertypeCode]} isLast='true' />
    </div>
  </div>
);

export const PaymentStatusIcons = () => {
  const iconStyles = {
    width: '16px',
    height: '16px',
    marginRight: '1px'
  };

  return (
    <div className="overflow-x-auto font-bold mb-5 text-center" style={{ fontSize: '11px' }}>
      <div className="flex mb-4 justify-center p-1 space-x-3" style={{ fontSize: '11px' }}>
        <div className="flex items-center">
          <img src={checkCircle} alt="Paid on time" style={iconStyles} />
          <span>Paid on time</span>
        </div>
        <div className="flex items-center">
          <img src={exclamationCircle} alt="1 - 29 days late" style={iconStyles} />
          <span>1 - 29 days late</span>
        </div>
        <div className="flex items-center">
          <img src={exclamationCircleOrange} alt="30 - 59 days late" style={iconStyles} />
          <span>30 - 59 days late</span>
        </div>
        <div className="flex items-center">
          <img src={exclamationCircleLightRed} alt="60 - 89 days late" style={iconStyles} />
          <span>60 - 89 days late</span>
        </div>
        <br/>
        <div className="flex items-center">
          <img src={exclamationCircleRed} alt="70 - 179 days late" style={iconStyles} />
          <span>70 - 179 days late</span>
        </div>
        <div className="flex items-center">
          <img src={exclamationCircleDarkRed} alt="179+ days late" style={iconStyles} />
          <span>179+ days late</span>
        </div>
        <div className="flex items-center col-span-3 justify-center">
          <img src={questionmarkCircle} alt="unknown" className='w-3 h-3 mr-1' />
          <span className=''>Data Not Found</span>
        </div>
      </div>

    </div>
  );
};

const getFirstPaymentYearMonth = (CAIS_Account_History) => {
  if (!CAIS_Account_History || CAIS_Account_History.length === 0) {
    return { year: null, month: null };
  }

  let firstPaymentYear = null;
  let firstPaymentMonth = 13; // Setting to 13, higher than any possible month.

  CAIS_Account_History.forEach((entry) => {
    const Year = parseInt(entry.Year, 10);   // Ensure Year is an integer
    const Month = parseInt(entry.Month, 10); // Ensure Month is an integer

    // console.log('Processing Year:', Year, 'Month:', Month);

    if (
      firstPaymentYear === null ||
      Year < firstPaymentYear ||
      (Year === firstPaymentYear && Month < firstPaymentMonth)
    ) {
      firstPaymentYear = Year;
      firstPaymentMonth = Month ; // 1 based indexing
    }
  });

  // console.log('First Payment Year:', firstPaymentYear, 'Month:', firstPaymentMonth);
  return { year: firstPaymentYear, month: firstPaymentMonth };
};

const getAccountClosureDate = (account) => {
  if (!account || !account.Date_Closed) {
    return { date: null, year: null, month: null };
  }

  const accountClosedDate = formatDateToDMY(String(account.Date_Closed));
  const parts = accountClosedDate.split('-'); // Split date string by '-'

  if (parts.length !== 3) {
    // Handle invalid date format if needed
    return { date: null, year: null, month: null };
  }

  const day = parseInt(parts[0], 10); // Extract day as integer
  const accountClosedMonth = parseInt(parts[1], 10) - 1; // Extract month as zero-based index
  const accountClosedYear = parseInt(parts[2], 10); // Extract year as integer

  return { date: accountClosedDate, year: accountClosedYear, month:accountClosedMonth };
};

const getLastPaymentYearMonth = (CAIS_Account_History, accountStatus) => {
  // If the account is active, return current month and year
  if (accountStatus === 'ACTIVE') {
    const currentDate = new Date();
    return { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1 }; // Adding 1 to month to match your 1-based month indexing
  }

  // For closed accounts or if no status is provided, find the last payment from history
  if (!CAIS_Account_History || CAIS_Account_History.length === 0) {
    return { year: null, month: null };
  }

  let lastPaymentYear = null;
  let lastPaymentMonth = null;

  CAIS_Account_History.forEach((entry) => {
    const Year = parseInt(entry.Year, 10);   // Ensure Year is an integer
    const Month = parseInt(entry.Month, 10); // Ensure Month is an integer
    
    // console.log('Processing Year:', Year, 'Month:', Month); // Log each Year and Month
    
    if (
      lastPaymentYear === null ||
      Year > lastPaymentYear ||
      (Year === lastPaymentYear && Month > lastPaymentMonth)
    ) {
      lastPaymentYear = Year;
      lastPaymentMonth = Month;
    }
  });

  // console.log('Last Payment Year:', lastPaymentYear, 'Month:', lastPaymentMonth);
  return { year: lastPaymentYear, month: lastPaymentMonth };
};

export const PaymentHistoryTable = ({ paymentHistory, account }) => {
 
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const iconStyles = {
    width: '22px',
    height: '22px',
  };

  const { year: firstPaymentYear, month: firstPaymentMonth } = getFirstPaymentYearMonth(account?.CAIS_Account_History);
  const { year: lastPaymentYear, month: lastPaymentMonth } = getLastPaymentYearMonth(account?.CAIS_Account_History, jsonData?.Account_Status[account?.Account_Status]);
  const { date: accountClosedDate, year: accountClosedYear, month: accountClosedMonth } = getAccountClosureDate(account);
 
  const calculateTotalMonths = () => {
    if (lastPaymentYear === firstPaymentYear) {
      return lastPaymentMonth - firstPaymentMonth + 1; // Adding 1 to include both first and last months
    } else {
      return (lastPaymentYear - firstPaymentYear) * 12 + (lastPaymentMonth - firstPaymentMonth) + 1;
    }
  };

  const totalMonths = calculateTotalMonths();
 
   // Determine the number of months to show
   const monthsToShow = Math.min(totalMonths, 36);

  // Generate array of months to display
   const displayMonths = [];
   let currentYear = lastPaymentYear;
   let currentMonth = lastPaymentMonth;
   for (let i = 0; i < monthsToShow; i++) {
    displayMonths.unshift({ year: currentYear, month: currentMonth });
    
    currentMonth--;
    if (currentMonth < 1) {
      currentMonth = 12;
      currentYear--;
    }
  }

  const groupedMonths = displayMonths.reduce((acc, { year, month }) => {
    const yearStr = year.toString();
    if (!acc[yearStr]) acc[yearStr] = Array(12).fill(null);
    
    const paymentData = paymentHistory.find(data => data.year.toString() === yearStr);
    const monthIndex = month - 1;
    if (paymentData) {
      
      acc[yearStr][monthIndex] = paymentData.months[monthIndex];
    }else if (!accountClosedDate ) {
      // For active accounts, fill with '?' for months up to the current month
      acc[yearStr][monthIndex] = '?';
    }

    return acc;
  }, {});

  // Sort years in descending order
  const sortedYears = Object.keys(groupedMonths).sort((a, b) => b - a);

  return (
    <div className="rounded-xl border border-solid border-[#a1a1a1] overflow-hidden m-2">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className='bg-[#F5F5F5]'>
            <th></th>
            {months.map((month) => (
              <th key={month} className="px-3 py-2 font-medium">{month}</th>
            ))}
          </tr>
        </thead>
        <tbody className='bg-white'>
          {sortedYears.length > 0 ? (
            sortedYears.map((year) => (
              <tr key={year}>
                <td className="px-4 py-2 font-medium text-fb-primary">{year}</td>
                {groupedMonths[year] && groupedMonths[year].map((status, idx) => {
                  const currentDate = new Date();
                  const monthDate = new Date(year, idx);
                  const isFutureMonth = monthDate > currentDate;
                  const isBeforePaymentStarted = (year === firstPaymentYear && idx < firstPaymentMonth - 1);
                  const isAfterAccountClosed = accountClosedDate &&
                    (year > accountClosedYear || (year === accountClosedYear && idx + 1 > accountClosedMonth));

                  return (
                    <td key={idx} className={`px-4 py-2 text-center`}>
                      {status === 'on-time' && <img src={checkCircle} alt="On time" style={iconStyles} />}
                      {status === '1-29' && <img src={exclamationCircle} alt="1-29 days late" style={iconStyles} />}
                      {status === '30-59' && <img src={exclamationCircleOrange} alt="30-59 days late" style={iconStyles} />}
                      {status === '60-89' && <img src={exclamationCircleLightRed} alt="60-89 days late" style={iconStyles} />}
                      {status === '90-179' && <img src={exclamationCircleRed} alt="90-179 days late" style={iconStyles} />}
                      {status === '180+' && <img src={exclamationCircleDarkRed} alt="180+ days late" style={iconStyles} />}
                      {status === '?' && !isFutureMonth && !isBeforePaymentStarted && !isAfterAccountClosed && (
                        <img src={questionmarkCircle} alt="Unknown status" className='w-4 h-4' />
                      )}
                      {!status && ''}
                      {isFutureMonth && ''}
                      {isBeforePaymentStarted && ''}
                      {isAfterAccountClosed && ''}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={13} style={{ padding: '1rem', textAlign: 'center', fontSize: '14px' }}>
                No payment history data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};