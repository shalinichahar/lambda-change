import React from 'react';
import { jsonData } from "../hashmap";
import { formatDateToDMY } from "../utils/Date";
import currencyFormatToINR from "../utils/CurrencyFormatter";
import { maskAccountNumber , getStatusStyles, capitalizeFirstLetter} from "../utils/General";


// Determines row class based on index for styling purposes
export const getRowClass = (index) => {
    return index % 2 === 0 ? 'bg-white' : 'bg-FB-primary';
};
      
// Categorizes account type based on type code
export const categorizeAccountType = (typeCode) => {
    if (typeCode === undefined || typeCode === null || typeCode === "") {
      return 'Unknown';
    }
    const accountType = capitalizeFirstLetter(jsonData.Account_Type[typeCode]) || 'Other';
    return accountType;
  };

// Map through the accounts to categorize the account types
export const accountTypes = (subAccounts) => subAccounts.map(account => {
    const typeCode = account?.Account_Type;
    return categorizeAccountType(typeCode);
});

export const openDateString = (subAccounts) => subAccounts.map(account => account?.Open_Date ? String(account?.Open_Date) : '');

export const accountStatuses = (subAccounts) => subAccounts.map(account => account?.Date_Closed ? 'Closed' : 'Active');

export const ownership = (subAccounts) => subAccounts.map(account => {
    const typeCode = account?.AccountHoldertypeCode;
    return jsonData?.AccountHoldertypeCode[typeCode] || 'Unknown';
  });
  
export const TableRow = ({ data, bgColorClass, textColorClass }) => {
  const statusStyles = getStatusStyles(data.accountStatus);
  return (
    <tr className={` font-medium ${bgColorClass}`}>
      <td className={`px-3 py-3 ${textColorClass}`}>{data.accountType}</td>
      <td className={`px-3 py-3 ${textColorClass}`}>
        <a href={`#account-${data.accountNumber}`} className="text-blue-500 hover:underline">{data.maskedAccountNo}</a>
      </td>
      <td className={`px-3 py-3 ${textColorClass}`}>{data.ownershipType}</td>
      <td className={`px-3 py-3 ${textColorClass}`}>{data.openDate}</td>
      <td className="px-3 py-3">
        <div className={`inline-flex items-center px-3 py-1 rounded-full ${statusStyles.background} ${statusStyles.text}`}>
          <span className={`inline-block w-2 h-2 mr-2 rounded-full ${statusStyles.dot}`}></span>
          {data.accountStatus}
        </div>
      </td>
      <td className={`px-3 py-3 ${textColorClass}`}>{data.lastBankUpdate}</td>
      <td className={`px-3 py-3 ${textColorClass}`}>{data.loanAmount}</td>
      <td className={`px-3 py-3 ${textColorClass}`}>{data.outstandingBalance}</td>
    </tr>
  );
}

export const generateRowData = (subAccounts) => {
    return subAccounts?.map((loan, index) => ({
      accountType: accountTypes(subAccounts)[index] || '-',
      accountNumber: loan.Account_Number,
      maskedAccountNo: maskAccountNumber(loan.Account_Number),
      ownershipType: ownership(subAccounts)[index],
      openDate: formatDateToDMY(openDateString(subAccounts)[index]) || '-',
      accountStatus: accountStatuses(subAccounts)[index] || '-',
      lastBankUpdate: formatDateToDMY(String(loan.Date_Reported)) || '-',
      loanAmount: currencyFormatToINR(loan.Highest_Credit_or_Original_Loan_Amount) || '-',
      outstandingBalance: currencyFormatToINR(loan.Current_Balance) || '-',
      rowClass: getRowClass(index)
    }));
  };
  