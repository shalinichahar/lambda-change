import React from 'react';
import { generateRowData, TableRow} from '../../helpers/LoanSummaryPage.Helpers';
import { isActive } from '../../utils/General';
import PageLayout from '../PageLayout';
import Table from '../Table';

const CreditCardSummary = ({data, accounts}) => {
  const getEntriesPerPage = (pageIndex) => {
    return pageIndex === 0 ? 15 : 17;
  };

  const creditCardAccounts = accounts.sort((a, b) => isActive(b) - isActive(a));

  const renderPages = () => {
    let currentIndex = 0;
    const pages = [];

    while (currentIndex < creditCardAccounts.length) {
        const pageIndex = pages.length;
        const entriesPerPage = getEntriesPerPage(pageIndex);
        const pageData = creditCardAccounts.slice(currentIndex, currentIndex + entriesPerPage);
        currentIndex += entriesPerPage;

        pages.push(
            <PageLayout
                key={pageIndex}
                pageIndex={pageIndex}
                title="Summary:"
                subtitle="Credit Card Accounts"
                para="This section displays summary of all your reported credit cards found in the Credit Bureau database."
                id="summary-credit-accounts"
                data={data}
            >
              <div className="mb-20 mt-8">
                  <Table
                      headers={[
                          { name: 'Account Type', width: 'w-auto' },
                          { name: 'Account No', width: 'w-auto' },
                          { name: 'Ownership', width: 'w-auto' },
                          { name: 'Opened Date', width: 'w-auto' },
                          { name: 'Account Status', width: 'w-auto' },
                          { name: 'Last Bank Update', width: 'w-auto' },
                          { name: 'Maximum Utilisation', width: 'w-auto' },
                          { name: 'Outstanding Balance', width: 'w-auto' }
                        ]}
                        rows={generateRowData(pageData)}
                        rowRenderer={(data, index) => {
                          const bgColorClass = index % 2 === 0 ? 'bg-white' : 'bg-fb-subtle';
                          const textColorClass = bgColorClass === 'bg-white' ? 'text-black' : 'text-fb-primary';
                          return(
                              <TableRow
                              key={index}
                              data={data}
                              bgColorClass={bgColorClass}
                              textColorClass={textColorClass}
                            />
                          )                                  
                        }}
                      headerTextSize="text-[13px]"  // text size for header
                      bodyTextSize="text-[12px]"
                  />
              </div>
            </PageLayout>
        );
    }
    return pages;
};

return (
    <div> {renderPages()} </div>
);

};

export default CreditCardSummary;
