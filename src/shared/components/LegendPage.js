import React from 'react';
import PageLayout from './PageLayout';

const LegendPage = ({data}) => {
  const legendItems = [
    { boldText: "SF/WD/WO/SETTLED", normalText: "Credit Accounts that are Suit Filed / Wilful Default / Written Off / Settled" },
    { boldText: "ACTIVE*", normalText: "Credit accounts which are less than 90 days past due." },
    { boldText: "ACTIVE**", normalText: "1111Credit accounts which are over 90 days past due." },
    { boldText: "Closed", normalText: "Credit accounts that have 'Date Closed' populated." },
    { boldText: "DPD", normalText: "Days Past Due. Number of days that have passed from the agreed payment due date of EMI." },
    { boldText: "DPD '0'", normalText: "The number '0' in the circle indicates that the Payment is made as agreed and the credit account is up to date." },
    { boldText: "DPD >0", normalText: "The number in the circle indicates the 'Days Past Due' reported by the respective lender." },
    { boldText: "When the below alphabets are shown in the DPD table", normalText: "it means the lender is reporting Asset Classification and indicates the following:" },
  ];

  const subItems = [
    { boldText: "S : Standard:", normalText: "An account which is overdue for less than 90 days is considered as a Standard asset as per RBI guidelines." },
    { boldText: "M : Special Mention:", normalText: "These accounts are 'Standard' assets but for some discrepancy the lending organization would like to monitor this account closely." },
    { boldText: "B : Substandard:", normalText: "An account which is overdue by 90 days for a period of less than or equal to 12 months is classified as Substandard asset as per RBI guidelines." },
    { boldText: "D : Doubtful:", normalText: "An account which is overdue by 90 days for more than 12 months is classified as doubtful asset as per RBI guidelines." },
    { boldText: "L : Loss:", normalText: "An account where loss has been identified but the amount has not been written off, wholly or partially is classified as Loss asset as per RBI guidelines." }
  ];

  return (
    <PageLayout
      key={0}
      pageIndex={0}
      title="Legend"
      subtitle=""
      para=""
      id="legend"
      data={data}
    >
      <div className='pt-3'>
        <ol className="list-decimal list-outside text-[14px] leading-relaxed space-y-4 font-dm-sans">
          {legendItems.map((item, index) => (
            <li key={index} className="ml-4 mr-1">
              <div className="w-full">
                <span className="font-bold">{item.boldText} :</span> {item.normalText}
              </div>
              {index === 7 && (
                <ul className="list-disc list-inside mt-2 space-y-2">
                  {subItems.map((subItem, subIndex) => (
                    <li key={subIndex} className="ml-4">
                      <span className="font-bold">{subItem.boldText}</span >{subItem.normalText}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </PageLayout>
  );
}

export default LegendPage;
