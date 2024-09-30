import React from 'react';
import { getReportDateStr , formatDateToDayMonthYear} from '../utils/Date';
import headerLogoBase64 from '../assets/base64/header-logo';


const Header = ({data}) => {

  const reportDateStr = getReportDateStr(data);
  const formattedReportDate = formatDateToDayMonthYear(reportDateStr);

  const ecn = data?.CreditProfileHeader?.ReportNumber;
  return (
    <div className='w-full pt-custom-pt mb-4 font-dm-sans'>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img src={headerLogoBase64} alt="Finance Buddha Logo" className="w-6 h-5 object-contain"/>
          <span className="text-[19px] ml-1 font-arista text-custom-finance">
            Finance <span className="text-custom-buddha">Buddha</span>
          </span>
        </div>
        <div className="text-right text-[11px] font-medium">         
          <p className='mt-0 pt-0'>
            <span className=" text-fb-info-1 ">Report Date:</span> <span>{formattedReportDate}</span>
          </p>
          <p className='mb-0 pb-0'>
            <span className=" text-fb-info-1 ">Enquiry Control Number (ECN):</span> <span>{ecn}</span>
          </p>
        </div>
      </div>
      <hr className="border border-blue-100"/>
    </div>
  );
};

export default Header;