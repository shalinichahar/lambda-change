import React, { useMemo } from 'react';
import { AddressRow, PhoneRow, getUniqueAddresses, getUniquePhones } from '../helpers/ContactInfo.Helpers';
import { getAccounts } from '../constants/constant';
import PageLayout from './PageLayout';
import Table from './Table';
import { paginateData } from '../utils/pagination';

const ContactInfoPage = ({ data }) => {
  const accounts = getAccounts(data);

  const uniqueAddresses = useMemo(() => getUniqueAddresses(accounts), [accounts]);
  const uniquePhones = useMemo(() => getUniquePhones(accounts), [accounts]);

  const getEntriesPerPage = (pageIndex) => {
    return pageIndex === 0 ? 11 : 14; // Adjusted for PDF layout
  };

  const addressPages = paginateData(uniqueAddresses, getEntriesPerPage);

  const renderPages = () => {
    const pages = [];

    addressPages.forEach((pageData, pageIndex) => {
      const isLastAddressPage = pageIndex === addressPages.length - 1;

      let phoneRows = [];
      if (isLastAddressPage && uniquePhones.length > 0) {
        const availableSpace = getEntriesPerPage(pageIndex) - pageData.length;
        if (availableSpace > 0) {
          phoneRows = uniquePhones.slice(0, availableSpace);
          uniquePhones.splice(0, availableSpace);
        }
      }

      pages.push(
        <PageLayout
          key={pageIndex}
          pageIndex={pageIndex}
          title="Contact"
          subtitle="Information"
          para="This section shows addresses and phone numbers reported to Credit Bureau."
          id="contact-information"
          data={data}
        >
          <div className="mt-8">
            {pageIndex === 0 && (
              <h2 className="text-[19px] font-bold mb-4">Address Detail</h2>
            )}
            <Table
              headers={[
                { name: 'Address', width: 'w-9/12' },
                { name: 'Category', width: 'w-3/12' }
              ]}
              rows={pageData}
              rowRenderer={(address, index) => (
                <AddressRow address={address} index={index} key={index} />
              )}
            />
            {phoneRows.length > 0 && (
              <>
                <h2 className="text-[19px] font-bold mb-4 mt-10">Phone Number</h2>
                <Table
                  headers={[
                    // { name: 'Type', width: 'w-1/4' },
                    { name: 'Number', width: 'w-3/4' }
                  ]}
                  rows={phoneRows}
                  rowRenderer={(phone, index) => (
                    <PhoneRow phone={phone} index={index} key={index} />
                  )}
                  isPhoneTable={true}
                />
              </>
            )}
          </div>
        </PageLayout>
      );
    });

    // Add additional pages for remaining phone numbers, if any
    if (uniquePhones.length > 0) {
      const phonePages = paginateData(uniquePhones, getEntriesPerPage);

      phonePages.forEach((pageData, pageIndex) => {
        pages.push(
          <PageLayout
            key={addressPages.length + pageIndex}
            pageIndex={addressPages.length + pageIndex}
            title="Contact"
            subtitle="Information"
            id="contact-information"
            data={data}
          >
            <h2 className="text-[19px] font-bold mb-4">Phone Number</h2>
            <Table
              headers={[
                // { name: 'Type', width: 'w-1/4' },
                { name: 'Number', width: 'w-3/4' }
              ]}
              rows={pageData}
              rowRenderer={(phone, index) => (
                <PhoneRow phone={phone} index={index} key={index} />
              )}
              isPhoneTable={true}
            />
          </PageLayout>
        );
      });
    }

    return pages;
  };

  return (
    <div>
      {renderPages()}
    </div>
  );
};

export default ContactInfoPage;
