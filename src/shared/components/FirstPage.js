import React from 'react';
import CreditScoreGauge from './CreditScoreGauge';
import { useCreditReportData } from '../helpers/FirstPage.Helpers';
import { formatDateToMY } from '../utils/Date';
import {  getUserName, getAccounts, getBureauScore, getEnquiriesNumber  } from '../constants/constant';
import { isActive } from '../utils/General';
import background from '../assets/base64/background';
import headerLogoBase64 from '../assets/base64/header-logo';
import experianLogo from '../assets/base64/experian';

const FirstPage = ({data}) => {
  const userName = getUserName(data);
  const accounts = getAccounts(data);
  const bureauScore = getBureauScore(data);
  const enquiriesNumber = getEnquiriesNumber(data);
  
  const activeAccounts = accounts.filter(account => isActive(account));
  const {
    totalLoanAmount,
    loanOutstanding,
    activeLoanAccountsNumber,
    activeCreditCardAccountsNumber,
    totalCreditLimit,
    totalCurrentBalance,
    overduePaymentsCount,
    oldestActiveAge
  } = useCreditReportData(activeAccounts);
  
 
  // Call the utility function with the data
  const formatDate = formatDateToMY(data);

 const cleanNumber = (value) => Number(value.replace(/,/g, ''));

  const creditCardUtilizationPercentage = activeCreditCardAccountsNumber > 0 ? 
    (cleanNumber(totalCreditLimit) > 0 ? `${((cleanNumber(totalCurrentBalance) / cleanNumber(totalCreditLimit)) * 100).toFixed(2)}%` : '0%') : '0%';
  return (
    <div className="relative bg-white flex flex-col items-center font-dm-sans p-0 m-0 overflow-hidden h-[1123px] w-[794px]" id="credit-score-summary">
      <div className="w-full p-14 pb-0 flex flex-col items-center z-10">
        <div className="flex items-center mb-10">
          <img src={headerLogoBase64} alt="Finance Buddha Logo" className="w-8 h-8 object-contain"/>
          <span className="text-4xl ml-3 font-arista text-custom-finance">
            Finance <span className="text-custom-buddha">Buddha</span>
          </span>
        </div>
        <div className="text-center">
          <h1 className="text-lg font-bold mb-0 pb-0"> Hey <span className="text-fb-primary">{userName || 'User'}</span>,</h1>
          <p className="text-[13px] pt-0 mt-0 font-normal">Here is your Credit Report for {formatDate}</p>
        </div>

        <div className="flex items-center justify-center pt-0 mt-0">
          <p className="text-[12px] font-normal">Powered by</p>
          <img src={experianLogo} alt="Experian Logo" className="inline-block h-10 w-auto" style={{ width: '100px', height: 'auto' }}/>
        </div>

        <div className='p-8'>
          <CreditScoreGauge value={bureauScore} />
        </div>

        <p className="text-center text-[13px] font-normal p-5 mb-16">
          Your free credit report provides a detailed overview of your credit score, <br /> accounts, balances, and payment history.
        </p>

        <h2 className="text-base font-bold mb-4 text-center">Report Summary</h2>

        <div className="flex justify-center">
          <div className="rounded-xl border border-solid border-[#a1a1a1] shadow-lg bg-white overflow-hidden w-[425px]">
            <table className="w-full text-left table-auto border-separate" style={{ borderSpacing: 0 }}>
              <tbody className="text-[12.5px]">
                <tr className="bg-white">
                  <td className="py-6 px-6">
                    <div className="font-semibold pb-2">{activeLoanAccountsNumber} Active loans</div>
                    <div>
                      {totalLoanAmount !== '--' ? `Total loan ₹${totalLoanAmount}` : 'Total loan  -'}
                    </div>
                  </td>
                  <td className="py-6 px-6 text-right">
                    <div className="font-bold pb-2">
                      {loanOutstanding !== '--' ? `₹${loanOutstanding}` : '-'}
                    </div>
                    <div>Current Outstanding</div>
                  </td>
                </tr>
                <tr className="bg-fb-subtle text-fb-primary">
                  <td className="py-6 px-6">
                    <div className="font-bold pb-2">{activeCreditCardAccountsNumber} Active Credit Cards</div>
                    <div>
                      {totalCreditLimit !== '--' ? `Total Limit: ₹${totalCreditLimit}` : 'Total Limit: -'}
                    </div>
                  </td>
                  <td className="py-6 px-6 text-right">
                    <div className="font-bold pb-2">
                      {totalCurrentBalance !== '--' ? `₹${totalCurrentBalance}` : '-'}
                    </div>
                    <div>Current Outstanding</div>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="py-6 px-6 ">
                    <div className="font-semibold pb-2 ">Overdue payments</div>
                    <div>Outstanding payment per due date</div>
                  </td>
                  <td className="py-6 px-6 text-right font-medium">{overduePaymentsCount}</td>
                </tr>
                <tr className="bg-fb-subtle text-fb-primary">
                  <td className="py-6 px-6 font-bold">Credit Card utilization</td>
                  <td className="py-6 px-6 text-right font-bold">{creditCardUtilizationPercentage}</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-6 px-6 font-semibold">Age of accounts</td>
                  <td className="py-6 px-6 text-right">{oldestActiveAge}</td>
                </tr>
                <tr className="bg-fb-subtle text-fb-primary">
                  <td className="py-5 px-6">
                    <div className="font-bold pb-2">Recent Enquiries</div>
                    <div>In last 30 days</div>
                  </td>
                  <td className="py-5 px-6 text-right font-bold">{enquiriesNumber || '-'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[250px] m-0 p-0">
        <img src={background} alt="Background" className="w-full h-full" />
      </div> 
    </div>
  );
};

export default FirstPage;