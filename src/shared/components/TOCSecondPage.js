import React from 'react';
import { getAccounts, getUserName } from '../constants/constant';
import { getOrganizedAccounts } from '../utils/SummaryAccounts';
import PageLayout from './PageLayout';
import Table from './Table';

const TOCSecondPage = ({ data }) => {
 
  const userName = getUserName(data);
  const accounts = getAccounts(data)
  const { personalLoanAccounts, creditCardAccounts, otherLoanAccounts } = getOrganizedAccounts(accounts);

  const sections = [
    { id: 'credit-score-summary', title: 'Credit Score & Report Summary' },
    { id: 'contact-information', title: 'Contact Information' },
    { id: 'credit-enquiries', title: 'Credit Enquiries' },
    personalLoanAccounts.length > 0 && { id: 'summary-personal-loans', title: 'Summary: Loans' },
    creditCardAccounts.length > 0 &&  { id: 'summary-credit-accounts', title: 'Summary: Credit Card Accounts' },
    otherLoanAccounts.length> 0 && { id: 'summary-other-loans', title: 'Summary: Other Loans' },
    { id: 'account-details', title: 'Account Details' },
    { id: 'legend', title: 'Legend' },
  ].filter(Boolean);

  return (
    <PageLayout
      pageIndex={0}
      title={`${userName}'s`}
      subtitle="Credit Report"
      para=""
      id="table-of-contents"
      data={data}
    >
      <h2 className="text-[19px] font-bold mb-4 mt-8 ">Table Of Contents</h2>
      <div className="mb-20 mt-8">
        <Table
        headers={[
          { name: 'Sr. No', width: 'w-2/12' },
          { name: 'Section', width: 'w-10/12' }
        ]}
        rows={sections}
        rowRenderer={(section, index, bgColorClass, textColorClass) => (
          <tr key={index} className={`${bgColorClass}`}>
            <td className={`px-4 py-4 ${textColorClass}`}>{index + 1}</td>
            <td className={`px-4 py-4`}>
              <a href={`#${section.id}`} className={`hover:underline ${textColorClass}`}>{section.title}</a>
            </td>
          </tr>
        )}
      />
      </div>
    </PageLayout>
  )
};

export default TOCSecondPage;
