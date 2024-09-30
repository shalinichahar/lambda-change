import React from 'react';
import Table from './Table';
import PageLayout from './PageLayout';
import { paginateData } from '../utils/pagination';
import { jsonData } from '../hashmap';
import { getEnquiryAccounts } from '../constants/constant';
import currencyFormatToINR from '../utils/CurrencyFormatter';

const CreditEnquiriesPage = ({data}) => {
  const accounts = getEnquiryAccounts(data);

  const combinedData = (accounts || [])
    .sort((a, b) => new Date(b.Date_of_Request) - new Date(a.Date_of_Request));

  const formatDate = (dateStr) => `${dateStr?.substring(6, 8)}-${dateStr?.substring(4, 6)}-${dateStr?.substring(0, 4)}`;

  const getEntriesPerPage = (pageIndex) => {
    return pageIndex === 0 ? 16 : 17;  //works for pdf
    // return pageIndex === 0 ? 15 : 16; 
  };

  const renderPages = () => {
    const pages = paginateData(combinedData, getEntriesPerPage);

    return pages.map((pageData, pageIndex) => (
      <PageLayout
        key={pageIndex}
        pageIndex={pageIndex}
        title="Credit"
        subtitle="Enquiries"
        para="This section shows the names of the loan type that have processed a credit/loan application for you."
        id="credit-enquiries"
        data={data}
      >
        <div className="flex-grow mt-7">
          <Table
            headers={[
              { name: 'Sr. No.', width: 'w-auto' },
              { name: 'Enquiry Type', width: 'w-auto' },
              { name: 'Application Date', width: 'w-auto' },
              { name: 'Amount (in Rs.)', width: 'w-auto' }
            ]}
            rows={pageData}
            rowRenderer={(item, index, bgColorClass, textColorClass) => {
              const globalIndex = pages
                .slice(0, pageIndex)
                .reduce((total, page, idx) => total + getEntriesPerPage(idx), 0) + index + 1;
              return (
                <tr key={index} className={`${bgColorClass}`}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${textColorClass}`}>{globalIndex}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${textColorClass}`}>{jsonData?.Enquiry_Reason[item?.Enquiry_Reason] || '-'}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${textColorClass}`}>{formatDate((item?.Date_of_Request)?.toString())}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${textColorClass}`}>{currencyFormatToINR((item?.Amount_Financed))?.toLocaleString() || '-'}</td>
                </tr>
              );
            }}
          />
        </div>
      </PageLayout>
    ));
  };

  return <div>{renderPages()}</div>;
};

export default CreditEnquiriesPage;
