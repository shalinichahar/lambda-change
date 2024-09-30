import React from 'react';
const Table = ({ headers, rows, rowRenderer, isPhoneTable = false, headerTextSize='text-base', bodyTextSize = 'text-[15px]' }) => (
  <div className={`${isPhoneTable ? 'w-[365px]' : 'w-full'} rounded-xl border border-solid border-tableBorder shadow-lg overflow-hidden  `}>
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className={`bg-neutral-100 ${headerTextSize} text-table-header font-medium`}>
          {headers.map((header, index) => (
            <th key={index} className={`px-4 py-3 ${header.width}`}>{header.name}</th>
          ))}
        </tr>
      </thead>
      <tbody className={`font-normal ${bodyTextSize}`}>
        {rows.map((row, index) => {
          const bgColorClass = index % 2 === 0 ? 'bg-white' : 'bg-fb-subtle';
          const textColorClass = bgColorClass === 'bg-white' ? 'text-black' : 'text-fb-primary';
          return rowRenderer(row, index, bgColorClass, textColorClass);
        })}
      </tbody>    
    </table>
  </div>
);

export default Table;
