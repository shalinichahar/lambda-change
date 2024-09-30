import React from 'react';
import CreditCardSummary from './summaryDetails/CreditCardSummary';
import PersonalLoanSummary from './summaryDetails/PersonalLoanSummary';
import OtherLoanSummary from './summaryDetails/OtherLoanSummary';
import { getOrganizedAccounts } from '../utils/SummaryAccounts';
import { getAccounts } from '../constants/constant';

const LoanSummary = ({data}) => {
  const accounts = getAccounts(data)
  const { personalLoanAccounts, creditCardAccounts, otherLoanAccounts } = getOrganizedAccounts(accounts);

  return (
    <div>
        {personalLoanAccounts.length > 0 && (
            <PersonalLoanSummary data={data} accounts = {personalLoanAccounts}/>
        )}     
        {creditCardAccounts.length > 0 && (
            <CreditCardSummary data={data} accounts={creditCardAccounts} />
        )}      
        {otherLoanAccounts.length > 0 && (
          <div>
            <OtherLoanSummary data={data} accounts={otherLoanAccounts} />
          </div>
        )} 
    </div>
  );
};

export default LoanSummary;