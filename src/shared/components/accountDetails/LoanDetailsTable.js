import React from 'react';
import currencyFormatToINR from '../../utils/CurrencyFormatter';
import {formatDateToDMY} from '../../utils/Date'

const LoanDetailsTable = ({ account }) => {
  return (
    <div className="flex gap-9 justify-center m-2">
      <div className="rounded-xl border border-solid border-tableBorder bg-[#f2f8ff] shadow-lg overflow-hidden">
        <table className="w-full border-collapse text-[11.5px]">
          <tbody>
            <tr className="bg-white">
              <td className="px-4 py-3 text-fb-primary">Opened Date</td>
              <td className="px-4 py-3 font-bold">{formatDateToDMY(String(account.Open_Date)) || '--'}</td>
            </tr>
            <tr className="bg-subtle">
              <td className="px-4 py-3 text-fb-primary">Closed Date</td>
              <td className="px-4 py-3 font-bold">{formatDateToDMY(String(account.Date_Closed)) || '--'}</td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3 text-fb-primary">Last Bank Update</td>
              <td className="px-4 py-3 font-bold">{formatDateToDMY(String(account.Date_Reported)) || '--'}</td>
            </tr>
            <tr className="bg-subtle">
              <td className="px-4 py-3 text-fb-primary">Last Payment Date</td>
              <td className="px-4 py-3 font-bold">{formatDateToDMY(String(account.Date_of_Last_Payment)) || '--'}</td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3 text-fb-primary">Repayment Tenure</td>
              <td className="px-4 py-3 font-bold">{account.Repayment_Tenure || '--'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-solid border-tableBorder bg-[#f2f8ff] shadow-lg overflow-hidden">
        <table className="w-full border-collapse text-[11.5px]">
          <tbody>
            <tr className="bg-white">
              <td className="px-4 py-3 text-fb-primary">Loan Amount</td>
              <td className="px-4 py-3 font-bold">{currencyFormatToINR(account?.Highest_Credit_or_Original_Loan_Amount) || '-'}</td>
              <td className="px-4 py-3 text-fb-primary">Settlement Amt.</td>
              <td className="px-4 py-3 font-bold">{currencyFormatToINR(account?.Settlement_Amount) || '-'}</td>
            </tr>
            <tr className="bg-FB-primary">
              <td className="px-4 py-3 text-fb-primary">Overdue Amt.</td>
              <td className="px-4 py-3 font-bold">{currencyFormatToINR(account?.Amount_Past_Due) || '-'}</td>
              <td className="px-4 py-3 text-fb-primary">EMI Amt.</td>
              <td className="px-4 py-3 font-bold">{currencyFormatToINR(account?.Scheduled_Monthly_Payment_Amount) || '-'}</td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3 text-fb-primary">Principal W/O Amt.</td>
              <td className="px-4 py-3 font-bold">{currencyFormatToINR(account?.Written_Off_Amt_Principal) || '-'}</td>
              <td className="px-4 py-3 text-fb-primary">Outstanding Balance</td>
              <td className="px-4 py-3 font-bold">{currencyFormatToINR(account?.Current_Balance) || '-'}</td>
            </tr>
            <tr className="bg-FB-primary">
              <td className="px-4 py-3 text-fb-primary">Total W/O Amt.</td>
              <td className="px-4 py-3 font-bold">{currencyFormatToINR(account?.Written_Off_Amt_Total) || '-'}</td>
              <td className="px-4 py-3 text-fb-primary">Last Payment</td>
              <td className="px-4 py-3 font-bold">{currencyFormatToINR(account?.Last_Payment) || '-'}</td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3 text-fb-primary">Interest Rate</td>
              <td className="px-4 py-3 font-bold">{account?.Rate_of_Interest ? `${account.Rate_of_Interest}%` : '-'}</td>
              <td className="px-4 py-3 text-fb-primary">Collateral Value</td>
              <td className="px-4 py-3 font-bold">{currencyFormatToINR(account?.Value_of_Collateral) || '-'}</td>
            </tr>
            <tr className="bg-FB-primary">
              <td className="px-4 py-3 text-fb-primary">Collateral Type</td>
              <td className="px-4 py-3 font-bold">{account?.Type_of_Collateral || 'No Collateral'}</td>
              <td className="px-4 py-3 text-fb-primary">Suit Filed Status</td>
              <td className="px-4 py-3 font-bold">{account?.SuitFiledWillfulDefaultWrittenOffStatus || 'NA'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanDetailsTable;
