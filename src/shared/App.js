import React, {useEffect, useState} from 'react';
import FirstPage from './components/FirstPage';
import TOCSecondPage from './components/TOCSecondPage';
import ContactInfoPage from './components/ContactInfoPage';
import CreditEnquiriesPage from './components/CreditEnquiriesPage';
import LoanSummaryPage from './components/LoanSummaryPage';
import AccountDetailsPage from './components/AccountDetailsPage';
import LegendPage from './components/LegendPage';
import '../shared/index.css'

const App = ({ data }) => {

  return (
    <div>
      <FirstPage data={data}/>
      <div className="page-break"></div>
      <TOCSecondPage data={data} />
      <div className="page-break"></div>
      <ContactInfoPage data={data} />
      <div className="page-break"></div>
      <CreditEnquiriesPage data={data} />
      <div className="page-break"></div>
      <LoanSummaryPage data={data} />
      <div className="page-break"></div>
      <AccountDetailsPage data={data} />
      <div className="page-break"></div>
      <LegendPage data={data} />
    </div>
  );
};

export default App;
