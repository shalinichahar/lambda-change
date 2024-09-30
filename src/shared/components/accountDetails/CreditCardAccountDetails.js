import React from 'react';
import {
  transformAccountHistory,
  AccountHeader,
  AccountDetailsSection,
  PaymentStatusIcons,
  PaymentHistoryTable,
} from '../../helpers/AccountDetails.Helpers';
import CreditCardDetailsTable from './CreditCardDetailsTable';

const CreditCardAccountDetails = ({ account }) => {
  const paymentHistory = transformAccountHistory(account?.CAIS_Account_History);
  
  return (
    <div className="rounded-xl border border-solid border-tableBorder shadow-lg overflow-hidden font-dm-sans text-center pb-4">
      <div className="w-full text-left border-collapse">
        <AccountHeader account={account} />
        <AccountDetailsSection account={account} />
        <div className="text-lg text-center h-10 font-medium text-fb-info-2 bg-primary-light pt-2 pb-2 mb-10">
          Account Details
        </div>
        <CreditCardDetailsTable account={account} />
        <div className="mt-10">
          <div className="text-lg h-10 text-center pt-2 pb-2 mb-8 font-medium text-fb-info-2 bg-primary-light">
            Payment Details
          </div>
          <PaymentStatusIcons />
          <PaymentHistoryTable paymentHistory={paymentHistory} account={account}/>
        </div>
      </div>
      <span className='text-xs text-fb-info-2'>Up to last 36 months</span>
    </div>      
  );
};

export default CreditCardAccountDetails;
