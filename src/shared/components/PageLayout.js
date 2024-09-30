import React from 'react';
import Header from './Header';
import Footer from './Footer';

const PageLayout = ({children, pageIndex, title, subtitle, para, id, isFirstPage, data }) => (
  <div className="bg-white flex flex-col items-center h-[1123px] w-[794px] m-2 font-dm-sans" id={id}>
    <div className="flex flex-col flex-grow max-w-3xl w-full overflow-hidden ">
      <Header data={data} />
      <section className="mt-2">
        <div className="text-left m-auto">
          {pageIndex === 0 && (
            <>
              <h1 className="text-xl font-bold text-fb-primary">{title} <span className='text-black'>{subtitle}</span></h1>
              {para && <p className={`text-[15.5px] font-normal pt-1 ${isFirstPage ? 'mb-5' : ''}`}>{para}</p>}
            </>
          )}
        </div>
        {children}
      </section>
      <Footer />
    </div>
  </div>
);

export default PageLayout;
