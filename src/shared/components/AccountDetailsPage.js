import React from 'react';
import { getAccounts } from '../constants/constant';
import ACCOUNT_TYPES from '../constants/accountTypes';
import PageLayout from './PageLayout';
import LoanAccountDetails from './accountDetails/LoanAccountDetails';
import CreditCardLoanAccountDetails from './accountDetails/CreditCardAccountDetails';
import { isActive } from '../utils/General';

const AccountsDetails = ({ data }) => {
  const accounts = getAccounts(data);

  const categorizedAccounts = {
    loans: [],
    creditCards: [],
  };

  const activeFirstAccounts = accounts.sort((a, b) => isActive(b) - isActive(a));

  activeFirstAccounts.forEach(account => {
    const accountType = ACCOUNT_TYPES[account.Account_Type];
    if (accountType === 'Credit Card') {
      categorizedAccounts.creditCards.push(account);
    } else {
      categorizedAccounts.loans.push(account);
    }
  });

  let isFirstPage = true;

  const renderLoanAccounts = () => (
    categorizedAccounts.loans.map((account, index) => {
      const currentPage = <LoanAccountDetails account={account} />;
      const uniqueKey = `loan-${account.Account_Number || index}`;

      const pageLayout = (
        <PageLayout
          key={uniqueKey} // Use unique key here
          pageIndex={index}
          title={isFirstPage ? "Account " : ""}
          subtitle={isFirstPage ? "Details" : ""}
          para={isFirstPage ? "This section has information provided to our Bureau Partner by banks, credit/ financial institutions and other credit grantors with whom you have a credit/loan account." : ""}
          id='account-details'
          isFirstPage={isFirstPage}
          data={data}
        >
          {currentPage}
        </PageLayout>
      );

      isFirstPage = false;
      return pageLayout;
    })
  );

  const renderCreditCardAccounts = () => (
    categorizedAccounts.creditCards.map((account, index) => {
      const currentPageIndex = index + categorizedAccounts.loans.length;
      const currentPage = <CreditCardLoanAccountDetails account={account} />;
      const uniqueKey = `credit-${account.Account_Number || currentPageIndex}`;

      const pageLayout = (
        <PageLayout
          key={uniqueKey} // Use unique key here
          pageIndex={currentPageIndex}
          title={isFirstPage ? "Account" : ""}
          subtitle={isFirstPage ? "Details" : ""}
          para={isFirstPage ? "This section has information provided to our Bureau Partner by banks, credit/ financial institutions and other credit grantors with whom you have a credit/loan account." : ""}
          id='account-details'
          isFirstPage={isFirstPage}
          data={data}
        >
          {currentPage}
        </PageLayout>
      );

      isFirstPage = false;
      return pageLayout;
    })
  );

  return (
    <div id="account-details">
      {categorizedAccounts.loans.length > 0 && renderLoanAccounts()}
      {categorizedAccounts.creditCards.length > 0 && renderCreditCardAccounts()}
    </div>
  );
};

export default AccountsDetails;
