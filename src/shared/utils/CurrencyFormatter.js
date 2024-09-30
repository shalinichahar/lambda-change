import React from 'react';
const currencyFormatToINR = (number) => {
  if (number === null || number === undefined || number === '') {
    return '-';
  }

  const isNegative = number < 0;
  const absNumber = Math.abs(number).toString();

  const lastThree = absNumber.substring(absNumber.length - 3);
  const otherNumbers = absNumber.substring(0, absNumber.length - 3);

  let formattedNumber;
  if (otherNumbers !== '') {
    formattedNumber = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
  } else {
    formattedNumber = lastThree;
  }

  return isNegative ? `-${formattedNumber}` : formattedNumber;
};

export default currencyFormatToINR;
 