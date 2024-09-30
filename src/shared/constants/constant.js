  import React from 'react';
  export const getUserName = (data) => {
    const firstName = data?.Current_Application?.Current_Application_Details?.Current_Applicant_Details?.First_Name || '';
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
  };

  export const getAccounts = (data) => {
    return data?.CAIS_Account?.CAIS_Account_DETAILS || [];
  };

  export const getEnquiryAccounts = (data) => {
    return data?.CAPS?.CAPS_Application_Details || [];
  }
  
  export const getBureauScore = (data) => {
    return data?.SCORE?.BureauScore || 0;
  };
  
  export const getEnquiriesNumber = (data) => {
    return data?.CAPS?.CAPS_Summary?.CAPSLast30Days || 0;
  };
  